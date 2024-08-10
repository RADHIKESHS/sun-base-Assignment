import { BASE_URL } from './config.js'; // Import the base URL

document.addEventListener('DOMContentLoaded', function() {
    const editCustomerForm = document.getElementById('edit-customer-form');
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('uuid');

    fetch(`${BASE_URL}/customers/${uuid}`, {
        headers: {
            'Authorization': `Bearer ${getCookie('token')}`
        }
    })
    .then(response => response.json())
    .then(customer => {
        document.getElementById('uuid').value = customer.uuid;
        document.getElementById('first_name').value = customer.first_name;
        document.getElementById('last_name').value = customer.last_name;
        document.getElementById('street').value = customer.street;
        document.getElementById('address').value = customer.address;
        document.getElementById('city').value = customer.city;
        document.getElementById('state').value = customer.state;
        document.getElementById('email').value = customer.email;
        document.getElementById('phone').value = customer.phone;
    });

    editCustomerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const uuid = document.getElementById('uuid').value;
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const street = document.getElementById('street').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        fetch(`${BASE_URL}/customers/${uuid}`, {
            method: 'PUT',
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
                alert('Customer updated successfully!');
                window.location.href = 'customer-list.html';
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
