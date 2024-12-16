import { Api } from './Api';

export const api = new Api({
    baseURL: 'http://172.20.10.3:3000/api', // менять когда меняешь вайфай
    withCredentials: true
});