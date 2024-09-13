
import { BASE_URL } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    const addCustomerBtn = document.getElementById('add-customer-btn');
    const searchBy = document.getElementById('search-by');
    const searchBar = document.getElementById('search-bar');
    const sortBy = document.getElementById('sort-by');
    const customerTable = document.getElementById('customer-table').getElementsByTagName('tbody')[0];
    const sizeInput = document.getElementById('size-input');
    const logoutBtn = document.getElementById('logout-btn');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');
    const syncBtn = document.getElementById('sync-btn');

    let currentPage = 1;
    let totalPages = 1;

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

    function fetchProfile() {
        const token = getCookie('token');
        fetch(`${BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(profile => {
            // Sync button should be visible for all users
            syncBtn.style.display = 'inline-block';
        })
        .catch(error => console.error('Error fetching profile:', error));
    }

    function fetchCustomers() {
        const searchValue = encodeURIComponent(searchBar.value); 
        const searchByValue = searchBy.value ? searchBy.value : "first_name"; 
        const sortDirection = sortBy.value || "asc";  
        const page = currentPage - 1;  
        const size = sizeInput ? sizeInput.value : 6;  
        const token = getCookie('token');

        const apiUrl = `${BASE_URL}/get-all-customers?search=${searchValue}&searchBy=${searchByValue}&page=${page}&size=${size}&sortDirection=${sortDirection}`;
    
        fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.content.length === 0 && currentPage > 1) {
                currentPage--;
                fetchCustomers();
                return;
            }
    
            populateTable(data.content);  
            totalPages = data.totalPages; 
            currentPage = data.number + 1;  
            updatePagination();  
            prevPageBtn.disabled = data.first;  
            nextPageBtn.disabled = data.last;  
        })
        .catch(error => console.error('Error fetching customers:', error));
    }
    

    function updatePagination() {
        pageInfo.innerHTML = ''; 

        const pageLinks = [];
        const maxPagesToShow = 5; 
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (startPage > 1) {
            pageLinks.push(createPageLink(1, '1'));
            if (startPage > 2) {
                pageLinks.push(createEllipsis());
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageLinks.push(createPageLink(i, i));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageLinks.push(createEllipsis());
            }
            pageLinks.push(createPageLink(totalPages, totalPages));
        }

        pageLinks.forEach(link => pageInfo.appendChild(link));
    }

    function createPageLink(page, text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'page-btn';
        button.disabled = (page === currentPage);
        button.addEventListener('click', () => {
            currentPage = page;
            fetchCustomers();
        });
        return button;
    }

    function createEllipsis() {
        const span = document.createElement('span');
        span.textContent = '...';
        return span;
    }

    function populateTable(customers) {
        customerTable.innerHTML = '';
        customers.forEach(customer => {
            const row = customerTable.insertRow();
            row.insertCell().textContent = customer.uuid;
            row.insertCell().textContent = `${customer.first_name} ${customer.last_name}`;
            row.insertCell().textContent = customer.email;
            row.insertCell().textContent = customer.phone;
            row.insertCell().textContent = customer.state;
            row.insertCell().textContent = customer.city;
            row.insertCell().textContent = customer.address;
            row.insertCell().textContent = customer.street;
            const actionsCell = row.insertCell();
            actionsCell.classList.add('actions-cell');
            actionsCell.innerHTML = `
                <button class="edit-btn" data-uuid="${customer.uuid}"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-uuid="${customer.uuid}"><i class="fas fa-trash-alt"></i></button>
            `;
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent cell click event
                window.location.href = `edit-customer.html?uuid=${this.dataset.uuid}`;
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent cell click event
                const customerName = this.closest('tr').querySelector('td:nth-child(2)').textContent; // Assumes name is in the second column
                fetch(`${BASE_URL}/delete-customer/${this.dataset.uuid}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${getCookie('token')}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        fetchCustomers(); 
                        alert(`${customerName} deleted successfully`);
                    }
                })
                .catch(error => console.error('Error deleting customer:', error));
            });
        });

        document.querySelectorAll('#customer-table td').forEach(cell => {
            cell.addEventListener('click', function() {
                // Only copy if the cell is not within the actions column
                if (!this.closest('tr').querySelector('.actions-cell').contains(this)) {
                    const text = this.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        alert(`Copied: ${text}`);
                    });
                }
            });
        });
    }

    addCustomerBtn.addEventListener('click', function() {
        window.location.href = 'add-customer.html';
    });

    searchBar.addEventListener('input', fetchCustomers);
    searchBy.addEventListener('change', fetchCustomers);
    sortBy.addEventListener('change', fetchCustomers);

    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchCustomers();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            fetchCustomers();
        }
    });

    syncBtn.addEventListener('click', function() {
        fetch(`${BASE_URL}/remoteApi-getCustomers/sync`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Sync successful');
                fetchCustomers(); // Refresh data after sync
            } else {
                alert('Sync failed');
            }
        })
        .catch(error => console.error('Error syncing customers:', error));
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // Clear the cookie
            window.location.href = 'login.html';
        });
    }

    fetchProfile();
    fetchCustomers();
});
