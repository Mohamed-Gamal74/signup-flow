const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const homeContent = document.getElementById("home__content");



// adding event listener to form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
    checkInputs();
  });
  
  // function to check inputs
  function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
  
    if (usernameValue === "") {
      setErrorFor(username, "username is required");
    } else if (!isValidUsername(usernameValue)) {
      setErrorFor(username, "username is not valid");
    } else {
      setSuccessFor(username);
    }
  
    if (emailValue === "") {
      setErrorFor(email, "email is required");
    } else if (!isValidEmail(emailValue)) {
      setErrorFor(email, "email is not valid");
    } else {
      setSuccessFor(email);
    }
  
    if (passwordValue === "") {
      setErrorFor(password, "password is required");
    } else if (passwordValue.length < 8) {
      setErrorFor(password, "password is not valid");
    } else {
      setSuccessFor(password);
    }
  
    if (confirmPasswordValue === "") {
      setErrorFor(confirmPassword, "confirm password is required");
    } else if (!isValidConfirmPassword(passwordValue, confirmPasswordValue)) {
      setErrorFor(confirmPassword, "password does not match");
    } else {
      setSuccessFor(confirmPassword);
    }
  
    if (usernameValue && emailValue && passwordValue && confirmPasswordValue) {
      sendData();
      window.localStorage.setItem("email", emailValue);
      window.location.href = "/home.html";
    }
  }
  
  //function to set error for input field
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const error = formControl.querySelector(".error");
    formControl.classList.add("error");
    formControl.classList.remove("success");
    error.innerText = message;
  }
  
  // function to set success for input field
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    const error = formControl.querySelector(".error");
    error.innerText = "";
    formControl.classList.add("success");
    formControl.classList.remove("error");
  }
  
  // function to valid username
  function isValidUsername(username) {
    const regex = /^[a-zA-Z\-]+$/;
    return regex.test(username);
  }
  
  // function to valid email
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
  
  // function to valid confirm password
  function isValidConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }
  
  // function to send data to server
  function sendData() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert("Data sent successfully");
      })
      .catch((error) => alert("oops! data not sent"));
  }
  