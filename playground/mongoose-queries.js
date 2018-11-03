const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// todos
//let id = '5bdd8e8dfa99a475e90c0b3a';

// users
let id = '5bdd7eb141350085bd149ada';

if(!ObjectID.isValid(id))
  return console.log('Invalid Object Id');

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.find({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', JSON.stringify(todo, undefined, 2));
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) 
//     return console.log('Id not found!');
//   console.log('Todo by id:', JSON.stringify(todo, undefined, 2));
// }).catch((err) => console.log(err));

User.findById(id).then((user) => {
  if(!user) 
    return console.log('Id not found!');
  console.log('User by id:', JSON.stringify(user, undefined, 2));
}).catch((err) => console.log(err));