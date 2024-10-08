import { BASE_URL } from './config.js'; 

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    const token = getCookie('token');
    if (token) {
        validateToken(token).then(isValid => {
            if (isValid) {
                window.location.href = 'index.html';
            }
        });
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                const token = response.headers.get('Authorization') 
                    ? response.headers.get('Authorization').split(' ')[1] 
                    : null;

                if (token) {
                    setCookie('token', token, 7); 
                    window.location.href = 'index.html'; 
                } else {
                    throw new Error('Token not found in response');
                }
            } else {
                return response.text(); 
            }
        })
        .then(message => {
            if (message) {
                alert(message);
            }
        })
        .catch(err => {
            console.error('Login error:', err);
            alert('An error occurred while trying to log in.');
        });
    });

    function validateToken(token) {
        return fetch(`${BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.ok) 
        .catch(() => false);
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
