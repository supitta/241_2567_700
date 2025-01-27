function submitData(){
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
