const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

Todo.findOneAndRemove({ 
  _id: new ObjectID('5bddd0e4fa962782268306ab')
 }).then((todo) => {
  console.log(todo);
});

// Todo.findByIdAndRemove('5bddd0ddfa962782268306aa').then((todo) => {
//   console.log(todo);
// });