document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('login-form');
    const errorMsgElement = document.getElementById('error-msg');

    if(loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        // Reset error message when the user starts typing
        document.getElementById('Username-id').addEventListener('input', () => {
            errorMsgElement.textContent = '';
        });
        document.getElementById('Password-id').addEventListener('input', () => {
            errorMsgElement.textContent = '';
        });
    }

    // Function to handle login form submission
    async function handleLogin(e) {
        e.preventDefault(); // Prevent form from refreshing the page

        const Login = document.getElementById('Username-id').value;
        const password = document.getElementById('Password-id').value;

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
                console.log(localStorage.getItem('userID'));
                window.location.href = '/components/Contact_List.html'; // Redirect to contact list page
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


    // register form submission
    const registerForm = document.getElementById('register-form');
    const regErr = document.getElementById('regerror');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    async function handleRegister(e) {
        e.preventDefault();
        
        const FirstName = document.getElementById('FirstName-id').value;
        const LastName = document.getElementById('LastName-id').value;
        const Login = document.getElementById('Login-id').value;
        const password = document.getElementById('Password-id').value;

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
                window.location.href = '/components/index.html';
            }
            else {
                console.error('Error during registration:', data.error);
                regErr.textContent = error;
            }
        } catch (error) {
            console.error('Error during registration:', error);
            regErr.textContent = error;
        }
    }
});
