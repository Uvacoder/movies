const isUserLogged = () => {
  if (localStorage.getItem('token')) {
    return true
  };
  
  return false
};

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
};

export default {
  isUserLogged,
  logOut
};