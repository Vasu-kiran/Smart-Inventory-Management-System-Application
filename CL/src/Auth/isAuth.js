export const isLoggedIn = () => {
    
    return (
      localStorage.getItem('userId') !== null &&
      localStorage.getItem('username') !== null &&
      localStorage.getItem('role') !== null
      
    );
  };