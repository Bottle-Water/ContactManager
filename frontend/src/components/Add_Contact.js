function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const userID = localStorage.getItem('userID'); // assuming userID is stored in localStorage

    const url = 'http://gerberknights3.xyz/LAMPAPI/addContact.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ name, email, phone, userID })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response data:", data);
        // Redirect to contact list after successful submission
        window.location.href = "/contact_list.html";
    })
    .catch(error => {
        console.error('Error adding contact:', error);
    });
}