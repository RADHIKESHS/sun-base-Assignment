import { BASE_URL } from './config.js'; // Import the base URL

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const navbar = document.getElementById('navbar');
    if (!navbar) {
        console.error('Navbar element not found');
        return;
    }

    // Function to set the navbar for logged-out users
    function setLoggedOutNavbar() {
        navbar.innerHTML = `
            <a id="company-logo" href="index.html">
                <img src="./images/sunbase-logo.webp" alt="Company Logo" class="company-logo">
            </a>
            <a id="login-link" href="login.html">Login</a>
        `;
    }

    // Check if user is logged in and update the navbar accordingly
    const token = getCookie('token');
    
    if (token) {
        fetch(`${BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                // If response is not ok, meaning unauthorized or token invalid, set logged-out navbar
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(user => {
            // Update the navbar to show the user's profile if authenticated
            navbar.innerHTML = `
                <a id="company-logo" href="index.html">
                    <img src="./images/sunbase-logo.webp" alt="Company Logo" class="company-logo">
                </a>
                <a id="profile-btn" href="#">
                    <img src="./images/profile-icon.png" alt="Profile Icon" class="profile-icon">
                    ${user.name}
                </a>
            `;

            // Profile modal and logout functionality
            const profileBtn = document.getElementById('profile-btn');
            const profileModal = document.createElement('div');
            profileModal.id = 'profile-modal';
            profileModal.innerHTML = `
                <span class="close-btn">&times;</span>
                <h2>Profile</h2>
                <p id="profile-name">Name: ${user.name}</p>
                <p id="profile-email">Email: ${user.email}</p>
                <p id="profile-phone">Phone: ${user.phone}</p>
                <button id="logout-btn">Logout</button>
            `;
            document.body.appendChild(profileModal);

            profileBtn.addEventListener('click', function() {
                profileModal.style.display = 'block';
            });

            profileModal.querySelector('.close-btn').addEventListener('click', function() {
                profileModal.style.display = 'none';
            });

            document.getElementById('logout-btn').addEventListener('click', function() {
                eraseCookie('token');
                window.location.href = 'login.html';
            });

            window.addEventListener('click', function(event) {
                if (event.target === profileModal) {
                    profileModal.style.display = 'none';
                }
            });
        })
        .catch(err => {
            console.error('Error fetching profile:', err);
            setLoggedOutNavbar(); // Show login link in case of error or invalid token
        });
    } else {
        setLoggedOutNavbar(); // Show login link if token is not present
    }

    // Function to get a cookie value
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

    // Function to erase a cookie
    function eraseCookie(name) {   
        document.cookie = name + '=; Max-Age=-99999999; path=/';  
    }
});
