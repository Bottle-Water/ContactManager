document.addEventListener('DOMContentLoaded', function () {
    console.log("UserID: ", localStorage.getItem('userID'));

    // Edit Contact
    const editForm = document.getElementById('EditContact-form');
    if(editForm) {
        populateContactDetails();
        const urlParams = new URLSearchParams(window.location.search);
        const contactId = urlParams.get('id');

        editForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            updateContact(contactId);
        });
    }

    function populateContactDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const contactName = urlParams.get('name');
        const contactEmail = urlParams.get('email');
        const contactPhone = urlParams.get('phone');
        // Check if the parameters are present in the URL
        if (contactName && contactEmail && contactPhone) {
            // Set the form field values, no need for decodeURIComponent if values are not encoded
            document.getElementById('Name-id').value = contactName;
            document.getElementById('Email-id').value = contactEmail;
            document.getElementById('Phone-id').value = contactPhone;
        } else {
            console.error('Missing one or more contact details in the URL');
        }
    }

    function updateContact(contactId) {
        const name = document.getElementById('Name-id').value;
        const email = document.getElementById('Email-id').value;
        const phone = document.getElementById('Phone-id').value;

        const url = 'http://gerberknights3.xyz/LAMPAPI/UpdateContact.php';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ ID: contactId, Name: name, Email: email, Phone: phone }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("response:", data);
            window.location.href = 'contact_list.html'; // Redirect to contact list
        })
        .catch(error => {
            console.error('Error updating contact:', error);
        });
    }

    // Delete Contact
    window.deleteContact = function(id) {
        const url = 'http://gerberknights3.xyz/LAMPAPI/DeleteContact.php';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ ID: id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.results === "contact deleted") {
                fetchData(); // Refetch data after deleting contact
                searchData(searchValue)
            }
        })
        .catch(error => {
            console.error('Error deleting contact:', error);
        });
    }
    
    // Add Contact
    const addForm = document.getElementById('AddContact-form');

    if(addForm) {
        addForm.addEventListener('submit', addContact);
    }
    function addContact(e) {
        e.preventDefault();
        
        const name = document.getElementById('Name-id').value;
        const email = document.getElementById('Email-id').value;
        const phone = document.getElementById('Phone-id').value;
        const url = 'http://gerberknights3.xyz/LAMPAPI/addContact.php';
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ name, email, phone, userID: localStorage.getItem('userID') })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response data:", data);
            window.location.href = "/components/Contact_List.html";
        })
        .catch(error => {
            console.error('Error adding contact:', error);
        });
    }

    // render contact list
    const contactList = document.getElementById('contact-list');
    let contacts = [];
    if (contactList) {
        fetchData();
    }
    function fetchData() {
        const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: "", userId: localStorage.getItem('userID') })
        })
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                console.log("Error: ", json.error);
                contacts = [];
            } else if (json.results && json.results.length > 0) {
                contacts = json.results;
            } else {
                console.log("No valid data found");
                contacts = [];
            }
            renderContactList(); // Render the list of contacts after fetching data
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }

    function renderContactList() {
        const contactList = document.getElementById('contact-list');
        contactList.innerHTML = '';
    
        if (contacts.length > 0) {
            contacts.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.classList.add('result-item');
    
                contactItem.innerHTML = `
                    <div class="info">
                        <p>Name: ${contact.Name}</p>
                        <p>Email: ${contact.Email}</p>
                        <p>Phone: ${contact.Phone}</p>
                    </div>
                    <div class="icon-group">
                        <a href="/components/Contact_edit.html?id=${contact.ID}&name=${encodeURIComponent(contact.Name)}&email=${encodeURIComponent(contact.Email)}&phone=${encodeURIComponent(contact.Phone)}">
                            <i class="fas fa-edit edit-icon" style="color: blue; cursor: pointer;"></i>
                        </a>
                        <i class="fas fa-trash trash-icon" style="color: red; cursor: pointer;" onclick="deleteContact(${contact.ID})"></i>
                    </div>
                `;
                contactList.appendChild(contactItem);
            });
        }
    }

    // render search bar
    let results = [];
    let searchValue = "";
    const searchForm = document.getElementById('SearchBar-id');
    if(searchForm) {
        searchForm.addEventListener('input', (event) => {
            searchValue = event.target.value;
            searchData(searchValue);
        });

    }
    function searchData(value) {
        const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';
    
        if (value === "") {
            results = [];
            renderSearchList(results); // Clear results if search input is empty
        } else {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: value, userId: localStorage.getItem('userID') })
            })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    console.log("Error: ", json.error);
                    results = [];
                } else if (json.results && json.results.length > 0) {
                    results = json.results;
                } else {
                    console.log("No valid data found");
                    results = [];
                }
                renderSearchList(results)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
        }
    }

    function renderSearchList(results) {
        const resultsList = document.getElementById('results-list');
        resultsList.innerHTML = '';
        
        if(results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                resultItem.innerHTML = `
                    <div class="info">
                        <p>Name: ${result.Name}</p>
                        <p>Email: ${result.Email}</p>
                        <p>Phone: ${result.Phone}</p>
                    </div>
                    <div class="icon-group">
                        <a href="/components/Contact_edit.html?id=${result.ID}&name=${encodeURIComponent(result.Name)}&email=${encodeURIComponent(result.Email)}&phone=${encodeURIComponent(result.Phone)}">
                            <i class="fas fa-edit edit-icon" style="color: blue; cursor: pointer;"></i>
                        </a>
                        <i class="fas fa-trash trash-icon" style="color: red; cursor: pointer;" onclick="deleteContact(${result.ID})"></i>
                    </div>
                `;
                resultsList.appendChild(resultItem);
            });
        } else {
            console.log("no results");
        }
    }
});