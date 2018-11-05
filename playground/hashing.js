const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

let token = jwt.sign(data,'123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded:',decoded);


//const { SHA256 } = require('crypto-js');

// var message = 'i am user number 1';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hashed Message: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secret_salt').toString()
// }

// // the middle
// token.data.id = 5;
// token.hash.token = SHA256(JSON.stringify(data)).toString();
// //////////////

// var resHash = SHA256(JSON.stringify(token.data) + 'secret_salt').toString();

// if(resHash === token.hash) {
//   console.log('Data was not changed');
// }
// else {
//   console.log('Data was changed!!!');
// }