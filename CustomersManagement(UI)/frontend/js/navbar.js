import { BASE_URL } from './config.js'; // Import the base URL

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const navbar = document.getElementById('navbar');
    if (!navbar) {
        console.error('Navbar element not found');
        return;
    }

    // Check if user is logged in and update the navbar accordingly
    const token = getCookie('token');
    if (token) {
        fetch(`${BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(user => {
            navbar.innerHTML = `
                <a id="company-logo" href="index.html">
                    <img src="./images/sunbase-logo.webp" alt="Company Logo" class="company-logo">
                </a>
                <a id="profile-btn" href="#">
                    <img src="./images/profile-icon.png" alt="Profile Icon" class="profile-icon">
                    ${user.name}
                </a>
            `;

            const profileBtn = document.getElementById('profile-btn');
            if (!profileBtn) {
                console.error('Profile button not found');
                return;
            }

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
                console.log('Logout button clicked');
                eraseCookie('token');
                console.log('Token erased');
                window.location.href = 'login.html';
            });

            window.addEventListener('click', function(event) {
                if (event.target === profileModal) {
                    profileModal.style.display = 'none';
                }
            });
        })
        .catch(err => console.error('Error fetching profile:', err));
    } else {
        navbar.innerHTML = `
            <a id="company-logo" href="index.html">
                <img src="./images/sunbase-logo.webp" alt="Company Logo" class="company-logo">
            </a>
            <a id="login-link" href="login.html">Login</a>
        `;
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

    function eraseCookie(name) {   
        document.cookie = name + '=; Max-Age=-99999999; path=/';  
    }
});
