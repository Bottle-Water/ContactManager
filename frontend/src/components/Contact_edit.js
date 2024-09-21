// Get the contact ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const contactId = urlParams.get('id');

// Function to populate the form with existing contact details
function populateContactDetails() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');

    // Assuming the contact data is passed via URL parameters or saved in localStorage
    const contactData = {
        name: localStorage.getItem('contactName'),
        email: localStorage.getItem('contactEmail'),
        phone: localStorage.getItem('contactPhone')
    };

    nameField.value = contactData.name;
    emailField.value = contactData.email;
    phoneField.value = contactData.phone;
}

// Call this function on page load to fill in the form
document.addEventListener('DOMContentLoaded', populateContactDetails);

// Function to handle updating the contact
function updateContact(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

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

// Attach the submit event handler to the form
document.getElementById('edit-contact-form').addEventListener('submit', updateContact);
