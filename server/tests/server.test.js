const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  { _id: new ObjectID(), text: 'first todo', completed: true, completedAt: 333 },
  { _id: new ObjectID(), text: 'second todo', completed: false, completedAt: null }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos', () => {
  
  it('should create a new todo', (done) => {

    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err)     {
          return done(err);
        }
        
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));

      });
  });

  it('should not created a todo with invalid body data', (done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(404)
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => done(err));

    });
  });

});

describe('GET /todos', () => {

  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });

});

describe('GET /todos/:id', () => {

  it('should return a todo doc', (done) => {

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .get('/todos/6bdd8e8dfa99a475e90c0b3a')
      .expect(404)
      .end(done);
  });

  it('should return a 404 if invalid id', (done) => {
    request(app)
      .get('/todos/6bdd8e8dfa99a475e90c0b3a111')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err)
          return done(err);

          Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
          }).catch((err) => done(err));

      });

  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete('/todos/6bdd8e8dfa99a475e90c0b3a')
      .expect(404)
      .end(done);
  });
  
  it('should return 404 if id is invalid', (done) => {
    request(app)
    .delete('/todos/6bdd8e8dfa99a475e90c0b3axx')
    .expect(404)
    .end(done);
  });    

});

describe('PATCH /todos/:id', () => {

  it('should update todo', (done) => {

    let hexId = todos[0]._id.toHexString();
    let text = 'new text from test';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

  });

  it('should clear completedAt when todo is not completed', (done) => {
    
    let hexId = todos[0]._id.toHexString();

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);

  });

});