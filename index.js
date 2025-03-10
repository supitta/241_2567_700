const { response } = require("express")

const BASE_URL = 'http://localhost:8000'
let mode ='CREATE'//default mode
let selectedId=''

window.onload = async()=> {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id',id)
    if(id){
        mode = 'EDIT'
        selectedId = id
        //1. เราจะดึงข้อมูลของ user ที่ต้องการแก้ไข
        try{
            const response = await axios.get(`${BASE_URL}/users/${id}`)
            console.log('data',response.data)

            //2.เราจะนำข้อมูลของuser ที่ดึงมา ใส่ใน input ที่เรามี
            let firstNameDOM = document.querySelector('input[name="firstname"]');
            let lastNameDOM = document.querySelector('input[name="lastname"]');
            let ageDOM = document.querySelector('input[name="age"]');
            //let genderDOM = document.querySelector('input[name="gender"]:checked') || {}
            //let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}
            let descriptionDOM = document.querySelector('textarea[name="description"]');

            firstNameDOM.value = user.firstName
            lastNameDOM.value = user.lastName
            ageDOM.value = user.age
            descriptionDOM.value = user.description
            
            let genderDOM = document.querySelectorAll('input[name=gander]')
            let interestDOMs = document.querySelectorAll('input[name=interest]')

            for (let i= 0; i< ganderDOMs.length;i++){
                if (ganderDOMs[i].value == user.gender){
                    ganderDOMs[i].checked = true
                }
            }
        for  (let i=0;i<interestDOMs.length;i++){
            if (user.interest.includes(interestDOMs[i].value)){
                interestDOMs[i].checked = true
            }
        }

        }catch(error){
            console.log('error',error)
        }
    }
}


const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจ');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    return errors;
}


const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name="firstname"]');
    let lastNameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');
    let genderDOM = document.querySelector('input[name="gender"]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}
    let descriptionDOM = document.querySelector('textarea[name="description"]');

    let messageDOM = document.getElementById('message');
    try {
        let interest = '';
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
                interest += ','
            }
        }

        let userData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }
        console.log('submitData', userData);
/*        
        console.log('submitData', userData);

        const errors = validateData(userData);
        if(errors.length > 0){
         //มี error เกิดขึ้น
         throw{
            message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            errors: errors
         }
        }
 */
        let message = 'บันทึกข้อมูลเรียบร้อย'
        if (mode=='CREATE'){
        const response = await axios.post(`${BASE_URL}/users`, userData)
        console.log('response', response.data);
        }else{
            const response = await axios.post(`${BASE_URL}/users/${selectedId}`,userData)
            massage = 'แก้ไขข้อมูลเรียบร้อย'
            console.log('response',response.data);
        }


        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย';
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message:', error.message);
        console.log('error:', error.errors);
        
        if (error.response) {
            console.log('error.response', error.response.data.message);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }
        




        let htmlData = '<div>';
        htmlData += `<div> ${error.message} </div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li> ${error.errors[i]} </li>`
        }
        htmlData += '</div>'
        htmlData += '</ul>'

        messageDOM.innerHTML= htmlData;
        messageDOM.className = 'message danger';
    }
}




/*function submitData(){
    let firstnameDOM = document.querySelector('input[name="firstname"]');
    let lastnameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="gender"]');
    let genderDOM = document.querySelector('input[name="gender"]:checked');
    let intersetDOM = document.querySelector('input[name="interest"]checked');
    let desciptionDOM = document.querySelector('textarea[name="description"]');

    let interest = ''
    for (let i=0; i < intersetDOM.length; i++){
        interest += intersetDOM[i].value 
        if (i < intersetDOMs.length - 1){
            interest += ','
        }
    }


    let userData ={
        firstName:firstnameDOM.value,
        lastName: lastnameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        desciption: desciptionDOM.value,
        interest: interest
    }
    console.log('submitData',userData);
}
*/