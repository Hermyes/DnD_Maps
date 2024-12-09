import { Api } from './Api';

export const api = new Api({
    baseURL: 'http://127.0.0.1:3000/api',
    withCredentials: true
});