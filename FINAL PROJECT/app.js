document.getElementById('darkModeToggle').addEventListener('click', function () {

    document.body.classList.toggle('dark-mode');
  
    if (document.body.classList.contains('dark-mode')) {
      this.textContent = 'Light Mode';
    } else {
      this.textContent = 'Dark Mode'; // 
    }
  });
  document.querySelector('#logout-btn').addEventListener('click', async () => {
    try {
      await signOut(auth);
      alert('You have been logged out successfully');
      window.location.href = 'login.html';
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  });