// Handle the login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple username and password validation (you can expand this later)
    if (username === 'admin' && password === 'password') {
        // If login is successful, redirect to the home page
        window.location.href = 'home.html'; // Redirects to home.html
    } else {
        // If login fails, show an alert (you can improve this by displaying error messages)
        alert('Invalid username or password');
    }
}
