var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");

var uName = document.querySelector("#uName");

var incorrect = document.querySelector("#incorrect");
var Sucssec = document.querySelector("#Sucssec");

var signinBtn = document.querySelector("#signinBtn");
var loginBtn = document.querySelector("#loginBtn");
var logoutBtn = document.querySelector("#logoutBtn");

var toSignup = document.querySelector("#toSignup");
var toLogin = document.querySelector("#toLogin");

var homePage = document.querySelector("#homePage");
var log = document.querySelector(".log");
var sign = document.querySelector(".sign");

var regx = {
  signupName: /^[a-z]{3,10}$/,
  signupEmail: /^\w+@gmail.com$/,
  signupPassword: /^\w+$/,
};

var UserList = [];

signupName.addEventListener("input", function (e) {
  vaildation(e.target);
});
signupEmail.addEventListener("input", function (e) {
  vaildation(e.target);
});
signupPassword.addEventListener("input", function (e) {
  vaildation(e.target);
});

if (localStorage.getItem("USERS") != null) {
  UserList = JSON.parse(localStorage.getItem("USERS"));
}

signinBtn.addEventListener("click", function () {
  addUser();
});

loginBtn.addEventListener("click", function () {
  login();
});

toSignup.addEventListener("click", function () {
  sign.classList.replace("d-none", "d-block");
  log.classList.add("d-none");
  clear();
});

toLogin.addEventListener("click", function () {
  log.classList.replace("d-none", "d-block");
  sign.classList.replace("d-block", "d-none");
  clear();
});

logoutBtn.addEventListener("click", function () {
  homePage.classList.replace("d-block", "d-none");
  log.classList.replace("d-none", "d-block");
  clear();
});

function addUser() {
  var found = false;
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    Sucssec.innerHTML = "All inputs is required";
  } else {
    if (
      signupName.classList.contains("is-valid") &&
      signupEmail.classList.contains("is-valid") &&
      signupPassword.classList.contains("is-valid")
    ) {
      for (var i = 0; i < UserList.length; i++) {
        if (signupEmail.value == UserList[i].userEmail) {
          Sucssec.innerHTML = "This Email is alrady used";
          found = true;
        }
      }
      if (!found) {
        var Userinfo = {
          userName: signupName.value,
          userEmail: signupEmail.value,
          userBassword: signupPassword.value,
        };
        UserList.push(Userinfo);
        localStorage.setItem("USERS", JSON.stringify(UserList));
        log.classList.replace("d-none", "d-block");
        sign.classList.replace("d-block", "d-none");
        clear();
      }
    } else {
      Sucssec.innerHTML = "Not valid data";
    }
  }
}

function login() {
  var email = signinEmail.value;
  var Password = signinPassword.value;
  var found = false;

  if (email == "" || Password == "") {
    incorrect.innerHTML = "All inputs is required";
  } else {
    for (var i = 0; i < UserList.length; i++) {
      if (
        email == UserList[i].userEmail &&
        Password == UserList[i].userBassword
      ) {
        uName.innerHTML = UserList[i].userName;
        homePage.classList.replace("d-none", "d-block");
        log.classList.add("d-none");
        found = true;
        clear();
      }
    }

    if (found == false) {
      incorrect.innerHTML = "incorrect  Email  or  Password";
    }
  }
}

function vaildation(element) {
  if (regx[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function clear() {
  signupName.value = null;
  signupEmail.value = null;
  signupPassword.value = null;
  signinEmail.value = null;
  signinPassword.value = null;

  incorrect.innerHTML = null;
  Sucssec.innerHTML = null;
}
