import moment from "moment";

export function getLocalStorage(key: string) {
    return localStorage.getItem(key)
}

export function getUserSession() {
    const authorization = localStorage.getItem("Authorization");
    if (authorization) {
        const expire = localStorage.getItem("expire");
        if (moment().add(expire, 's').isAfter(moment())) {
            return authorization
        } else {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("expire");
            return null;
        }
    } else {
        return null
    } 
}

export function removeUserSession(){
    localStorage.removeItem("Authorization");
    localStorage.removeItem("expire");
}