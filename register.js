// Selection of the form element
const registerForm = document.getElementById('registerForm');

// Add event listener to form submission
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Extract form field values
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  // Create an object with the form data
  const userData = { name, email, password };

  // Send the data to your server endpoint using fetch or any other method
  try {
    const response = await fetch('/register-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    // Handle the response from the server
    if (response.ok) {
      // Registration successful
      console.log('User registered successfully');
    } else {
      // Registration failed
      console.error('Failed to register user');
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
});
