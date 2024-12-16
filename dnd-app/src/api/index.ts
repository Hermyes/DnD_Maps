import { Api } from './Api';

export const api = new Api({
    baseURL: 'http://192.168.1.33:8000/api', // менять когда меняешь вайфай
    withCredentials: true
});