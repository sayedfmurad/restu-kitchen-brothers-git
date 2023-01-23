const decodeToken = (token)=>{
   try{ if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(global.window.atob(base64));
    }
    catch(error){
        return error;
    }
}
export default decodeToken;