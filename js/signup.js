var btnSignup = document.querySelector(".signup button").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let birthday = document.querySelector('#birthday').value;

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "birthday": birthday
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Sign up complete";
            feedback.classList.remove('hidden');

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        }
    })
});