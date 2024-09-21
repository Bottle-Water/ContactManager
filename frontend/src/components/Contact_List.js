let results = [];
let searchValue = "";

// Function to fetch search results
function fetchData(value) {
    const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';

    if (value === "") {
        results = [];
        renderContactList(); // Clear results if search input is empty
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
            renderContactList(); // Render updated list
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }
}

// Function to delete a contact
function deleteContact(id) {
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
            fetchData(searchValue); // Refetch data after deleting contact
        }
    })
    .catch(error => {
        console.error('Error deleting contact:', error);
    });
}

// Function to render the contact list
function renderContactList() {
    const resultsList = document.getElementById('results-list');
    const contactList = document.getElementById('contact-list');
    resultsList.innerHTML = ''; // Clear previous search results
    contactList.innerHTML = ''; // Clear contact list

    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            resultItem.innerHTML = `
                <p>Name: ${result.Name}</p>
                <p>Email: ${result.Email}</p>
                <p>Phone: ${result.Phone}</p>
                <p>Date Created: ${result.DateCreated}</p>
                <div class="icon-group">
                    <a href="/edit.html?id=${result.ID}">
                        <i class="edit icon" style="color: blue; cursor: pointer;"></i>
                    </a>
                    <i class="trash icon" style="color: red; cursor: pointer;" onclick="deleteContact(${result.ID})"></i>
                </div>
            `;
            resultsList.appendChild(resultItem);
        });
    } else {
        resultsList.innerHTML = "<p>No contacts found</p>";
    }
}

// Event listener for the search bar
document.getElementById('search-bar').addEventListener('input', (event) => {
    searchValue = event.target.value;
    fetchData(searchValue);
});

// Initial fetch to load all contacts on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchData(""); // Fetch all contacts initially
});
