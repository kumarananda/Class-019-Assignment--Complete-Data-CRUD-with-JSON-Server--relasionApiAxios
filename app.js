// get element
const skill = document.querySelector('#skill_load');
const skill2 = document.querySelector('#skill_load2');
const dev_add_form = document.querySelector('#dev_add_form');
const load_alldevs = document.querySelector('.load_alldevs');
const devs_edit_btns = document.querySelector('.devs_edit_btn');
const dev_edit_form = document.querySelector('#dev_edit_form');


// console.log(skill);
// load All skills form api
const loadSkills = () => {
    // fetch('http://localhost:2022/skill').then(data => data.json()).then(data => {
    //     // console.log(data);
    //     let skillload = "";
    //     data.map(skill => {
    //         skillload += `
    //         <option value="${skill.id}">${skill.name}</option>
    //         `
    //     });
    //     skill.insertAdjacentHTML('beforeend', skillload) //afterbegin,afterend,beforebegin
    //     console.log(skillload);
    // });

    axios.get('http://localhost:2022/skill').then(withAxios => {
        // console.log(withAxios.data);
            let skillload = "";
            withAxios.data.map(skill => {
            skillload += `
            <option value="${skill.id}">${skill.name}</option>
            `;
            
        });
        skill.insertAdjacentHTML('beforeend', skillload) //afterbegin,afterend,beforebegin
        skill2.insertAdjacentHTML('beforeend', skillload) //afterbegin,afterend,beforebegin
       
    })

}
loadSkills(); // if we use arow function, than function will call after arow function

/**
 * All devs load
 */ 
const get_developers = () => {
    load_alldevs ;
    axios.get('http://localhost:2022/developers').then(res => {
        dev_data = "";
        res.data.map((dev, index) => {
            dev_data += `
            <tr>
                            <td>${index + 1}</td>
                            <td>${dev.name}</td>
                            <td>${dev.mail}</td>
                            <td>${dev.phone}</td>
                            <td>${dev.skillId}</td>
                            <td><img style="height:50px;width:auto;" src="${dev.photo}" alt=""></td>
                            <td>
                                <a data-bs-toggle="modal" href="#viewModal" class="devs_view_btn btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
                                <a data-bs-toggle="modal" href="#editModal" onclick="edit_devs(${dev.id})"  class="devs_edit_btn btn btn-sm btn-warning"><i class="fa fa-edit"></i></a>
                                <a data-bs-toggle="modal"  onclick="del_devs(${dev.id})"  class="devs_del_btn btn btn-sm btn-danger "><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>
            `
        });
        load_alldevs.innerHTML = dev_data;
        // console.log(dev_data);
        

    })
}
get_developers();

dev_add_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#name');
    let mail = this.querySelector('#mail');
    let phone = this.querySelector('#Phone');
    let skill_load = this.querySelector('#skill_load');
    let photo = this.querySelector('#photo');

    if(name.value == "" || mail.value == "" || phone.value == "" || skill_load.value == "" || photo.value == "" ){
        alert('All fileds are required !');
    }else {
        axios.post('http://localhost:2022/developers', {
            id : "",
            name : name.value,
            mail : mail.value,
            phone : phone.value,
            skillId : skill_load.value,
            photo : photo.value
        }).then(res => {
            name.value = '';
            mail.value = '';
            phone.value = '';
            skill_load.value = '';
            photo.value = '';

            get_developers();
        });

        
    }
    

    // alert(`${name.value}  ${mail.value} ${mobile.value} ${skill_load.value} ${photo.value}`)
});

/**
 * developers data edit
 */
function edit_devs(id){
    // alert(id)

    let name = document.getElementById('ename');
    let mail = document.getElementById('email');
    let phone = document.getElementById('ePhone');
    let photo = document.getElementById('ephoto');
    let skill_load = document.getElementById('eskill_load');
    let ePreview = document.getElementById('ePreview');
    let edit_id = document.getElementById('edit_id');

    axios.get(`http://localhost:2022/developers/${id}`).then(res => {


        // console.log(res.data);
        name.value = res.data.name;
        mail.value = res.data.mail;
        phone.value = res.data.phone;
        photo.value = res.data.photo;
        skill_load.value = res.data.skillId;
        edit_id.value = id
        ePreview.setAttribute('src', res.data.photo)
    });
};

dev_edit_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#ename');
    let mail = this.querySelector('#email');
    let phone = this.querySelector('#ePhone');
    let photo = this.querySelector('#ephoto');
    let skill_load = this.querySelector('#eskill_load');
    let edit_id = this.querySelector('#edit_id');


    // console.log(name.value ,mail.value, phone.value, photo.value, skill_load.value, edit_id.value);

    // axios.put() or
    axios.patch(`http://localhost:2022/developers/${edit_id.value}`,
        {
            id : "",
            name : name.value,
            mail : mail.value,
            phone : phone.value,
            skillId : skill_load.value,
            photo : photo.value
        }
    ).then(res => {

            name.value = '';
            mail.value = '';
            phone.value = '';
            skill_load.value = '';
            photo.value = '';

            get_developers();

    });
});

function del_devs(id) {
    let confir = confirm('Are You went to delete this data');
    if(confir == true){
        axios.delete(`http://localhost:2022/developers/${id}`).then(res => {
        get_developers();
    })
    }
};