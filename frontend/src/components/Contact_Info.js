let results = [];

// Fetch contact data when the page loads
document.addEventListener('DOMContentLoaded', searchData);

// Function to fetch contact data
function searchData() {
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
            results = [];
        } else if (json.results && json.results.length > 0) {
            results = json.results;
        } else {
            console.log("No valid data found");
            results = [];
        }
        renderContactList(); // Render the list of contacts after fetching data
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

// Function to handle contact deletion
function deleteContact(id) {
    const url = 'http://gerberknights3.xyz/LAMPAPI/DeleteContact.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ ID: id })
    })
    .then(response => response.json())
    .then(data => {
        console.log("response: ", data);
        if (data.results === "contact deleted") {
            searchData(); // Refresh the contact list after deletion
        }
    })
    .catch(error => {
        console.error('Error deleting contact:', error);
    });
}

// Function to render the contact list in the DOM
function renderContactList() {
    const contactListElement = document.getElementById('contact-list');
    contactListElement.innerHTML = ''; // Clear the previous list

    if (results.length > 0) {
        results.forEach((result, index) => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-list');

            contactItem.innerHTML = `
                <div class="info">
                    <div>Name: ${result.Name}</div>
                    <div>Email: ${result.Email}</div>
                    <div>Phone: ${result.Phone}</div>
                </div>
                <i 
                    class="trash icon right floated" 
                    style="color: red; margin-top: 10px; cursor: pointer;"
                    onclick="deleteContact(${result.ID})"
                ></i>
                <a href="/edit.html?id=${result.ID}">
                    <i 
                        class="edit alternate icon right floated" 
                        style="color: blue; margin-top: 10px; margin-right: 10px; cursor: pointer;"
                    ></i>
                </a>
            `;

            contactListElement.appendChild(contactItem);
        });
    } else {
        contactListElement.innerHTML = '<p>No contacts found</p>';
    }
}
