const MonogoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MonogoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('error connecting to mongo:', err);
  }
  console.log('connected!');
  
  //delete many
  // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result) => {
  //   console.log(result);
  // });

  //delete one
  // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text: 'Something to do'}).then((result) => {
  //   console.log(result);
  // });

  //delete many
  // db.collection('Users').deleteMany({name: 'Marc Mendoza'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5bdb98837dd0649b415f5238')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });  

  db.close();
});
