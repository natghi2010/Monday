import axios from "axios";

export const login = (email, password) => {
    return axios.post('/login', { email, password });
}

export const signup = (data) => {
    return post('/signup', { email, password });
}

export const logout = () => {
    return get('/logout');
}

export const me = () => {
    return get('/me');
}

export const edit = (data) => {
    return post('/edit', { data });
}

export const checkUser = (email) => {
    return post('/checkUser', { email });
}
