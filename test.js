var student_obj = {
    name : "Nguyen Van Cuong",
    age : "26"
};
 
var student_string = JSON.stringify(student_obj);
 
// Lưu file
var persist = require('node-persist');
persist.initSync();
persist.setItemSync('student', student_string);
 
// Đọc file
var content_from_file = persist.getItemSync('student');
console.log(content_from_file);