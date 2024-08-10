import { BASE_URL } from './config.js'; 

document.addEventListener('DOMContentLoaded', () => {
    const syncButton = document.getElementById('sync-btn');

    async function fetchUserEmail() {
        const token = getCookie('token'); 
        if (!token) {
            console.error('No token found');
            return;
        }
        
        try {
            const response = await fetch(`${BASE_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const user = await response.json();
            return user.email;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

    async function checkUserEmail() {
        const userEmail = await fetchUserEmail();
        if (userEmail === 'test@sunbasedata.com') {
            syncButton.style.display = 'inline-block'; 
        } else {
            syncButton.style.display = 'none'; 
        }
    }

    checkUserEmail();

    syncButton.addEventListener('click', async () => {
        try {
            const token = await authenticateUser();
            const customerData = await fetchCustomerList(token);
            console.log(customerData);
            await syncData(customerData);
            alert('Customer data synced successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error syncing data:', error);
            alert('Failed to sync data. Please try again.');
        }
    });
});

async function authenticateUser() {
    const response = await fetch('https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login_id: 'test@sunbasedata.com',
            password: 'Test@123'
        })
    });

    if (!response.ok) {
        throw new Error('Authentication failed');
    }

    const data = await response.json();
    // console.log(data.access_token);
    return data.access_token; 
}

async function fetchCustomerList(token) {
    const response = await fetch('https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch customer list');
    }

    return await response.json();
}

async function syncData(customers) {
    const response = await fetch(`${BASE_URL}/customers/bulk-upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}` 
        },
        body: JSON.stringify(customers)
    });

    if (!response.ok) {
        throw new Error('Failed to sync data with the backend');
    }

    return await response.json();
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
