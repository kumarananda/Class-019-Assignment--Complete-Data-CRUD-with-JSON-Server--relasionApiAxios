// get element
const skill = document.querySelector('#skill_load');

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
            `
        });
        skill.insertAdjacentHTML('beforeend', skillload) //afterbegin,afterend,beforebegin
       
    })

}
loadSkills();