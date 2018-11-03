const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  let newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

});

app.listen(3000, () => {
  console.log('Server is runnning');
});

// let newTodo = new Todo({
//   text: 'vacuum'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo!:', doc);
// }, (err) => {
//   console.log('error:',err);
// });

// let newUser = new User({
//   email: 'marc_mendoza@hotmail.com.com'
// });

// newUser.save().then((doc) => {
//   console.log('Saved User!:', doc);
// }, (err) => {
//   console.log('error:',err);
// });