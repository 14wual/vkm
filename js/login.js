const login_username = document.getElementById("login-username");
const login_password = document.getElementById("login-password");
const randomTime = Math.floor(Math.random() * 4000) + 1000;

function checkArgsv(arg1, arg2) {
    return arg1.value && arg2.value ? true : false;
  }
if (checkArgsv(login_username, login_password) == true) {

  document.getElementById("btnnn-log").innerHTML = 'Processing...';

    const username = login_username.value
    const password = login_password.value
    
    const formLoginData = new FormData();
    formLoginData.append('username', username);
    formLoginData.append('password', password);

    fetch("../php/tr.login.php", {
          method: "POST",
          body: formLoginData
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result.errors);
      if (!result.success) {
        switch (result.errors[0]) {
          case "Username does not exist":
            window.location.replace("login.html?error=Username%20does%20not%20exist.");
            break;
          case "The account status is incorrect":
            window.location.replace("login.html?error=The%20account%20status%20is%20incorrect.");
            break;
          case "The account status is blocked":
            window.location.assign("recovery.html?account=" + username);
            break;
          case "Password is incorrect":
            window.location.replace("login.html?error=Password%20is%20incorrect.");
            break;
          case "Unknown response from server":
            /*window.location.replace("login.html?error=Unknown%20response%20from%20server");*/
            break;
          default:
            console.error("Unknown error:", result.errors);
            break;
        }
      } else {
        alert(username + " Login Successfully");
        window.location.replace("../index.html?account=" + username);
      }
    }, randomTime);    
} else {
    alert("The entries cannot be empty.");
    location.href = "login.html?user=" + username;
}