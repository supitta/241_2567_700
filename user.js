const BASE_URL = 'http://localhost:8000'
window.onload = async() =>{
    await loadData()
}
    console.log('user page loaded');
    // 1.load ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data)

    const userDOM = document.getElementById('user')
    //2.นำ user ทั้งหมดโหลดกลับเข้าไปใน html

    let htmlData = '<div>'
    for (let i=0; i<response.data.lenght; i++){
        let users = response.data[i]
        htmlData+= `<div>
        ${user.id}${user.firstname} ${user.lastname}
        <a herf ='index.html?id=${userid}'><botton>Edit</botton></a>
        <botton class = 'delete' data-id='${user.id}'>Deleate<botton>
        </div>`
}
htmlData+= '</div>'
userDOM.innerHTML = htmlData

//3.ลบ user
const deleteDOMs = document.getElementsByClassName('delete')
for (let i= 0; i < deleteDOMs.lenght;i++){
    deleteDOMs[i].addEventListener('click',async (event) => {
        // ดึง id ของ user ที่ต้องการลบ
        const id = event.target.dataset.id
        try{
            await axios.delete(`${BASE_URL}/user/${id}`)
            loadData() // recursive function = เรียกใช้ฟังก์ชัน ตัวเอง
        }catch(error){
            console.log('error',error)
        }
    })

}

