const MonogoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MonogoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('error connecting to mongo:', err);
  }
  console.log('connected!');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5bdad576a9ad447ce4d520f2')
  // }).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('error:', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos: ${count}`);
  // }, (err) => {
  //   console.log('error:', err);
  // });

  db.collection('Users').find({
    name: 'Jan Mendoza'
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('error:', err);
  });


  db.close();

});
