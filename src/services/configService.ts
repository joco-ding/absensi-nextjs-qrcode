export const API_BASE_URL = 'http://192.168.87.156:5000/api';
export const WS_BASE_URL = 'ws://192.168.87.156:5000/ws';
let token = '';

export const getToken = () => token
export const setToken = (dataToken: string) => token = dataToken