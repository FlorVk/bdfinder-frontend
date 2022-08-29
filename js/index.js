// FRONTEND

async function startup() {
    const newUser = await getUserFromCookie();
    console.log("user", newUser);
    updateName(newUser.username);
    birthdayUser(newUser.birthday);
    return newUser;
  }

  function updateName(name) {
    const linkEl = document.getElementById("login");
    const usernameEl = document.getElementById("username");

    linkEl.classList.add("hidden");
    usernameEl.innerText = "Logged in as " + name;
  }

  function birthdayUser(birthday){
    const birthdayParse = birthday;
    const date = new Date(birthdayParse);
    const birthdayString = date.toISOString().split('T')[0];
    const birthdayTitle = document.getElementById("birthdayTitle");
    birthdayTitle.innerText = birthdayString;
    console.log(birthdayString);
  }

  const base_url = "http://localhost:3000";


  function birthdayUser(addition) {
    console.log(addition);
    const date = new Date(addition);
    const birthdayString = date.toISOString().split('T')[0];
    fetch(base_url + "/api/v1/bday/" + birthdayString, {
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
  }

  startup()







/* fetch all users on load */


