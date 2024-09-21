let results = [];
let searchValue = "";

// Function to fetch data from the API based on search value
function fetchData(value) {
    const url = 'http://gerberknights3.xyz/LAMPAPI/SearchContacts.php';

    if (value === "") {
        results = [];
        renderContactList();
    } else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search: value, userId: localStorage.getItem('userID') })
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.error) {
                console.log("Error: ", json.error);
                results = [];
            } else if (json.results && json.results.length > 0) {
                results = json.results;
            } else {
                console.log("No valid data found");
                results = [];
            }
            renderContactList(); // Re-render the contact list after data fetch
        })
        .catch((error) => {
            console.error("Error Searching Data: ", error);
        });
    }
}

// Function to handle search input and fetch data
function handleSearch(value) {
    searchValue = value;
    fetchData(searchValue);
}

// Function to delete a contact
function deleteContact(id) {
    const url = 'http://gerberknights3.xyz/LAMPAPI/DeleteContact.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ ID: id })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.results === "contact deleted") {
            fetchData(searchValue); // Refetch data after deletion
        }
    })
    .catch((error) => {
        console.error('Error Deleting contact:', error);
    });
}

// Function to render the contact list
function renderContactList() {
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = "";

    if (results.length > 0) {
        results.forEach((result) => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultsList.appendChild(resultItem);
        });
    } else {
        resultsList.innerHTML = "<p>No results found</p>";
    }
}

// Initial fetch to load all contacts on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchData(""); // Fetch all contacts initially
});