// Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // check is the username saved in local storage
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }

    // check is the user already logged in
    function checkLoginState() {
        return document.cookie.split(';').some((item) => item.trim().startsWith('loggedIn='));
    }

    if (checkLoginState()) {
        alert("You are already logged in!");
        window.location.href = 'cultural_insights.html';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;
        
        // check credentials against stored users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // login cookie expires in 1 day
            const date = new Date();
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
            document.cookie = `loggedIn=true; expires=${date.toUTCString()}; path=/`;
            
            // save username in local storage if "Remember me" is checked
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
            
            alert('Taa Daa! Login successful! Welcome back :)');
            window.location.href = 'home.html';
        } 
        else {
            alert('Oooppsss, invalid credentials :( Please try again!\nOr Sign Up if you don\'t have an account!');
        }
    });
});


//Sign Up
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // check is the user already signed up
    function checkSignupState() {
        return document.cookie.split(';').some((item) => item.trim().startsWith('userSignedUp='));
    }

    if (checkSignupState()) {
        alert("You already have an account!");
        window.location.href = 'login.html';
    }

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // check if email or username already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(user => user.email === email);
        const usernameExists = users.some(user => user.username === username);

        if (emailExists) {
            alert("This email has been registered :( \nPlease log in or use a different email.");
            return;
        }

        if (usernameExists) {
            alert("This username has been taken :( \nPlease choose a different username.");
            return;
        }

        // add new user
        users.push({ email, username, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        // signup cookie expires in 7 days
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `userSignedUp=true; expires=${date.toUTCString()}; path=/`;
        
        alert('Taa Daa! \nAccount created successfully :)');
        window.location.href = 'login.html';
    });
});
