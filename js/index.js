// FRONTEND

async function startup() {
    const newUser = await getUserFromCookie();
    console.log("user", newUser);
    updateName(newUser.username);
    birthdayUser(newUser.birthday);
    return newUser; 
  }

  function updateName(name) {
    console.log(name);
    const linkEl = document.getElementById("login");
    const usernameEl = document.getElementById("username");

    linkEl.classList.add("hidden");
    usernameEl.innerText = "Logged in as " + name;
  }

  function birthdayUser(birthday){
    const birthdayParse = birthday;
    const date = new Date(birthdayParse);


    const birthdayString = date.toISOString().split('T')[0];
    console.log(birthdayParse);

    const birthdayTitle = document.getElementById("birthdayTitle");

    birthdayTitle.innerText = birthdayString;
    return birthdayParse;
  }

  startup()


  const base_url = "http://localhost:3000";

  const birthday = "1998-11-25";
  console.log(birthday);



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

