const MonogoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let objId = new ObjectID();

console.log(objId);

MonogoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('error connecting to mongo:', err);
  }
  console.log('connected!');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err, result) => {
  //   if(err) {
  //     return console.log('error inserting to mongo:', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Marc Mendoza',
  //   age: 49,
  //   location: 'Orlando, Fl.'
  // },(err, result) => {
  //   if(err) {
  //     return console.log('error inserting to mongo:', err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});
