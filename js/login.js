var btnSignup = document.querySelector(".login__btn").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    fetch('https://birthday-finder-florvk.herokuapp.com/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            let token = json.data.token;
            setCookie('jwt', token, 60);
            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Login failed";
            feedback.classList.remove('hidden');
        }
    })
});