// Sign up function
function signup() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (!email || !username || !password) {
      alert('Ooops, please fill in all fields!');
      return;
    }
  
    // check if user already exists
    if (localStorage.getItem(username)) {
      alert('Ooops, username already exists.\nPlease key in an unique username!');
      return;
    }
  
    // store user information
    const user = { email, username, password };
    localStorage.setItem(username, JSON.stringify(user));

    alert('Taa Daa, Sign Up successful!\nPlease login ;)')
    window.location.href = 'login.html'; 
}
  

// Login function
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  if (!username || !password) {
    alert('Ooops, please fill in all fields!');
    return;
  }
  
  // get user information
  const userJSON = localStorage.getItem(username);
  if (!userJSON) {
    alert('Ooops, user not found! :(');
    return;
  }
  
  const user = JSON.parse(userJSON);
  if (user.password !== password) {
    alert('Ooops, incorrect password! :(');
    return;
  }
  
  sessionStorage.setItem('loggedInUser', username);
  if (rememberMe) {
    localStorage.setItem('loggedInUser', username);
  }
  
  alert('Login successful!');
  window.location.href = 'home.html'; 
}
  

// check if user is logged in
function checkLoginState() {
  const loggedInUser = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    alert('You have already login :)');
    window.location.href = 'home.html';
  }
}
 

// Logout fuction
function logout() {
  sessionStorage.removeItem('loggedInUser');
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}
  

window.onload = checkLoginState;