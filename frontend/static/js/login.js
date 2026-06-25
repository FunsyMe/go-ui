loginButton = document.getElementById("login-button");

usernameInput = document.getElementById("username-input");
passwordInput = document.getElementById("password-input");

loginButton.addEventListener("click", () => {
    loginRequest();
});

async function loginRequest() {
    const url = `${window.location.href}api/login`;
    const loginData = { username: usernameInput.value, password: passwordInput.value};

    console.log(url);
    console.log(loginData);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const status = await response.status;
        const user = await response.json();

        if (status == 200) {
            document.cookie = `username=${user["username"]}`;
            document.cookie = `password=${user["password"]}`;
            
            window.location.href = `${window.location.href}panel`;
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cookies = document.cookie.split('; ').reduce((acc, current) => {
        const [key, value] = current.split('=');
        acc[key] = value;
        return acc;
    }, {});
    

    if (cookies.username && cookies.password) {
        window.location.href = `${window.location.href}panel`;
    }
});