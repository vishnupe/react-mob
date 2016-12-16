function isLoggedIn(state = [], action) {
  switch(action.type) {
    case 'SIGN_IN' :
      console.log('Signing in');
      return {isLoggedIn:true};
   case 'SIGN_OUT' :
      console.log('Signing out');
      return {isLoggedIn:false};
    default:
      return state;
  }
}

export default isLoggedIn;
