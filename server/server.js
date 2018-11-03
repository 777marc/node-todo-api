const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  let newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(404).send(err);
  });

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(404).send(err);
  });
})

app.get('/todos/:id', (req, res) => {
  
  let id = req.params.id;

  if(!ObjectID.isValid(id))
    return res.status(404).send('Invalid Id');

  Todo.findById(id).then((todo) => {
    
    if(!todo) 
      return res.status(404).send('Id not found!');

    res.send({ todo });

  }).catch((err) => console.log(err));
 
});

app.listen(port, () => {
  console.log(`Server is runnning on port: ${port}`);
});

module.exports = { app };
