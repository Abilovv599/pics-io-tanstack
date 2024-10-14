// Utility function to check if the user is authenticated
const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken'); // Example: You could replace this with your own logic.
  return Boolean(accessToken); // Returns true if accessToken is found, otherwise false
};

export { isAuthenticated };
