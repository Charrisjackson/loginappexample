const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const dashboardSection = document.getElementById('dashboard-section');
const registerMessage = document.getElementById('register-message');
const loginMessage = document.getElementById('login-message');
const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('logout-button');

// Base API URL
const API_URL = '/';

// Handle Registration
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  try {
    const response = await fetch(`${API_URL}register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, firstName, lastName }), //sending info into the request body
    });

    const data = await response.json();
    if (response.ok) {
      registerMessage.textContent = 'Registration successful!';
      registerMessage.style.color = 'green';
    } else {
      registerMessage.textContent = data.error || 'Registration failed.';
      registerMessage.style.color = 'red';
    }
  } catch (error) {
    registerMessage.textContent = 'An error occurred.';
    registerMessage.style.color = 'red';
  }
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      loginMessage.textContent = '';
      loginForm.reset();
      showDashboard(data.token);
    } else {
      loginMessage.textContent = data.error || 'Login failed.';
      loginMessage.style.color = 'red';
    }
  } catch (error) {
    loginMessage.textContent = 'An error occurred.';
    loginMessage.style.color = 'red';
  }
});

// Show Dashboard
function showDashboard(token) {
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  welcomeMessage.textContent = `Welcome, User ${decodedToken.id}!`;
  dashboardSection.style.display = 'block';
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
}

// Handle Logout
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  dashboardSection.style.display = 'none';
  loginForm.style.display = 'block';
  registerForm.style.display = 'block';
});

