import store from './store';
export function requireAuth(nextState, replace) {
    const {isLoggedIn} = store.getState();
    if(!isLoggedIn){
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
    }


}
