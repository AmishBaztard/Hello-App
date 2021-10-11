import { decode } from 'html-entities';

const loginForm = document.querySelector('#loginForm');
const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const messageDisplay = document.querySelector('.login__message');
const FIELD_ERROR_CLASS = 'field--error';
let loggedInUsername;
let loggedInIP;

const toggleDisplay = (elSelector) => {
  const el = document.querySelector(elSelector);
  if (getComputedStyle(el).display === 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
};
const applyInputError = (inputEl) => {
  if (inputEl.classList.contains(FIELD_ERROR_CLASS)) return;
  inputEl.classList.add(FIELD_ERROR_CLASS);
};

const displayMessage = (message) => {
  messageDisplay.textContent = message;
};

const validateLogin = () => {
  const userVal = loginForm.username.value;
  const passVal = loginForm.password.value;
  let result = true;

  if (!userVal) {
    applyInputError(loginForm.username);
    result = false;
  } else {
    loginForm.username.classList.remove(FIELD_ERROR_CLASS);
  }
  if (!passVal) {
    applyInputError(loginForm.password);
    result = false;
  } else {
    loginForm.password.classList.remove(FIELD_ERROR_CLASS);
  }

  return result;
};

const handleLogin = async () => {
  if (!validateLogin()) return;
  const userVal = loginForm.username.value;
  loggedInUsername = userVal;

  loggedInIP = await fetch('http://ip-api.com/json/')
    .then((response) => response.json())
    .then((json) => json.query);

  const helloResponse = await fetch(`https://fourtonfish.com/hellosalut/?ip=${loggedInIP}`)
    .then((response) => response.json())
    .then((json) => json.hello);

  const hello = decode(helloResponse);
  displayMessage(`${hello} ${userVal} you have successfully logged in!`);

  toggleDisplay('#loginButton');
  toggleDisplay('#logoutButton');
};

const handleLogout = () => {
  const [username, password] = loginForm.querySelectorAll('input[name=username], input[name=password');
  displayMessage(`Have a great day, ${loggedInUsername}!`);
  username.value = '';
  password.value = '';
  toggleDisplay('#loginButton');
  toggleDisplay('#logoutButton');
};

loginButton.addEventListener('click', handleLogin);
logoutButton.addEventListener('click', handleLogout);
