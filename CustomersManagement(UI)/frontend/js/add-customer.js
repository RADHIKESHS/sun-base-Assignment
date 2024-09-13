import { BASE_URL } from './config.js'; // Import the base URL

document.addEventListener('DOMContentLoaded', function() {
    const addCustomerForm = document.getElementById('add-customer-form');

    addCustomerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const street = document.getElementById('street').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        fetch(`${BASE_URL}/add-customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                street,
                address,
                city,
                state,
                email,
                phone
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Customer added successfully!');
                window.location.href = 'index.html';
            }
        });
    });

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
