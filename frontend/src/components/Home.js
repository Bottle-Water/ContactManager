document.getElementById('login-form').addEventListener('submit', handleLogin);

let errMsg = "";

// Function to handle login form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const Login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const errorMsgElement = document.getElementById('error-msg');

    const url = 'http://gerberknights3.xyz/LAMPAPI/AccountLogin.php';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ Login, Password: password })
        });

        const data = await response.json();
        console.log("response", data);

        if (data.id > 0) {
            localStorage.setItem('userID', data.id); // Store userID in localStorage for later use
            window.location.href = '/contact_list.html'; // Redirect to contact list page
        } else {
            errMsg = data.error || 'Invalid Username or Password';
            errorMsgElement.textContent = errMsg;
        }
    } catch (error) {
        console.error('Error during login:', error);
        errMsg = 'Invalid Username or Password.';
        errorMsgElement.textContent = errMsg;
    }
}

// Reset error message when the user starts typing
document.getElementById('login').addEventListener('input', () => {
    document.getElementById('error-msg').textContent = '';
});
document.getElementById('password').addEventListener('input', () => {
    document.getElementById('error-msg').textContent = '';
});
