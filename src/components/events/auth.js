let Auth = {};

Auth.saveToken = (token)=>{
    localStorage.setItem('kawaii', token);
};

Auth.getToken = ()=>{
    return localStorage.getItem('kawaii');
};

Auth.isLoggedIn = ()=>{
    let token = Auth.getToken();
    if(token){
        let exp = JSON.parse(window.atob(token.split('.')[1])).exp;
        return exp > Date.now() / 1000;
    }else{
        return false
    }
};

Auth.isLoggedOut = ()=>{
    let token = Auth.getToken();
    if(!token){
        return true;
    }else{
        return false
    }
};

Auth.currentName = ()=>{
    if(Auth.isLoggedIn()){
        let token = Auth.getToken();
        let name = JSON.parse(window.atob(token.split('.')[1])).username;
        return name
    }
}

Auth.currentUserID = ()=>{
    if(Auth.isLoggedIn()){
        let token = Auth.getToken();
        let id = JSON.parse(window.atob(token.split('.')[1]))._id;
        return id
    }
}

Auth.logout = ()=>{
    localStorage.removeItem('kawaii')
}

export default Auth;