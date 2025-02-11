const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []
let conster = 1

//path: /user ใช้สำหรับ user ทั้งหมด
app.get('/users',(req,res)=>{
    res.json(users);
})

//path:/user ใช้สำหรับสร้างข้อมูล user ใหม่
app.post('/user',(req,res)=> {
    let user = req.body;
    user.id = conster
    conster += 1
    users.push(user);
    res.json({
        message:'Creat new user successfully',
        user:user
    });
})

//path: PUT/user/:idใช้สำหรับแก้ไขข้อมูล user โดยใช้ id
app.put('/user/:id',(req,res)=>{
    let id = req.params.id;
    let updateUser = req.body;
    //หา users จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user =>  user.id == id)

    //แก้ไขข้อมูล user
    if (updateUser.firstname){
        users[selectIndex].firstname = updateUser.firstname
    }
    if (updateUser.lastname){
        users[selectIndex].lastname = updateUser.lastname
    }
    users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname
    users[selectIndex].lastname = updateUser.lastnamename || users[selectIndex].lastname
    
    
    res.json({
        massage: 'Update user successfully',
        data:{
            user:updateUser,
            indexUpdate: selectIndex
        }
    })
    
})
// path: DELETE /user/:id ใช้สำหรับลบข้อมูล  user โดยใช้ id เป็นตัวระบุ
app.delete('/user/:id',(req, res)=> {
    let id = req.params.id;
    //หา index ของ user ที่ต้องการลบ
    let selectIndex = users.findIndex(user => user.id == id)
    //ลบ
    users.splice(selectIndex,1)
    res.json({
        message: 'Delete user successfully',
        indexDelete: selectIndex
    })
})

app.listen(port,(req,res) => {
    console.log('Http Server is running on port'+ port)
});



/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
POST/ users สำหรับสร้าง  users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับดึง users รายคนออกมา
PUT/users/:id สำหรับแก้ไข  users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE/users/:id สำหรับลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
app.get('/users',(req, res) => {
    res.json(users);
})