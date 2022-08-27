// FRONTEND

const base_url = "http://localhost:3000";
const birthday = "1998-11-25";


/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

/* fetch all users on load */
fetch(base_url + "/api/v1/bday/" + birthday, {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    json.data.forEach(user => {
        let userData = `<div class="user__username">${user.username}</div>`;
        document.querySelector(".users__body").insertAdjacentHTML('beforeend', userData);
    });


}).catch(err => {
    console.log(err);
    console.log("Something went wrong")
});