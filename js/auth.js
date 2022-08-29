async function getUserFromCookie() {
    const allCookies = getAllCookies();
    const userJWT = allCookies["jwt"];
    const userResponse = await fetch(
      "http://localhost:3000/auth/getUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userJWT,
        },
      }
    ).then((response) => response.json());
    if (userResponse.status === "success") {
      return userResponse.data;
    }
  }
  
  function getAllCookies() {
    let cookie = document.cookie;
    let cookieArray = cookie.split(";");
    let cookieObject = {};
    for (let i = 0; i < cookieArray.length; i++) {
      let keyValue = cookieArray[i].split("=");
      cookieObject[keyValue[0]] = keyValue[1];
    }
    return cookieObject;
  }
  
  function logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }

  