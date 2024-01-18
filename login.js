// Selection of the form element
const loginForm = document.getElementById('loginForm');

// Add event listener to form submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Extract form field values
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  // Create an object with the form data
  const userData = { email, password };

  // Send the data to server endpoint using fetch 
  try {
    const response = await fetch('/login-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    // Handle the response from the server
    if (response.ok) {
      // Login  successful
      console.log('User logged successfully');
    } else {
      // Login failed
      console.error('Failed to Login ');
    }
  } catch (error) {
    console.error('Error logging user in:', error);
  }
});
