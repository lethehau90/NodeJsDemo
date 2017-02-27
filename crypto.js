var crypto = require("crypto-js");

// // Mã hóa
// var message = crypto.AES.encrypt('Nội dung cần mã hóa', 'itsasecret123').toString();
 
// // Xem chuỗi đã mã hóa
// console.log(message);


// Mã hóa
var message = crypto.AES.encrypt('Noi dung can ma hoa', 'ma bi mat').toString();
 
// Xem chuỗi đã mã hóa
console.log(message);
 
// Lấy danh sách byte đã mã hóa
var bytes = crypto.AES.decrypt(message, 'ma bi mat');
 
// Chuyển sang chuỗi gốc
var message_decode = bytes.toString(crypto.enc.Utf8);
 
console.log(message_decode);