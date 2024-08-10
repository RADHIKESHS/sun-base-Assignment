import { BASE_URL } from './config.js'; // Import the base URL

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;

        fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone })
        })
        .then(response => {
            if (response.ok) {
                alert('Signup successful!');
                window.location.href = 'login.html';
            } else {
                return response.text();
            }
        })
        .then(message => {
            if (message) {
                alert(message);
            }
        });
    });
});
