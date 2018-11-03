const MonogoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MonogoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('error connecting to mongo:', err);
  }
  console.log('connected!');
  
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bdc252dd54f12d8af1b2875')
  // },{
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });
  
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5bdc26efd54f12d8af1b290f')
  },{
    $set: {
      name: 'Marcos'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
