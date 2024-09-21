document.getElementById('register-form').addEventListener('submit', handleRegister);

// Function to handle the form submission
function handleRegister(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const FirstName = document.getElementById('FirstName').value;
    const LastName = document.getElementById('LastName').value;
    const Login = document.getElementById('Login').value;
    const password = document.getElementById('password').value;

    registerUser(FirstName, LastName, Login, password);
}

// Function to send registration data to the server
async function registerUser(FirstName, LastName, Login, password) {
    const url = 'http://gerberknights3.xyz/LAMPAPI/AccountCreation.php';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ FirstName, LastName, Login, Password: password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);

        if (data) {
            // Redirect to login page upon successful registration
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}