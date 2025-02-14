import axios from 'axios';
import store from 'store';

const getToken = () => {
    const data = store.get('token');
    if (data) {
        if (data.expiresAt < Date.now()) {
            store.remove('token');
            return null;
        }
        return data.token;
    }
    return null;
};

const Headers={
    headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
}

const DEV_MODE=true;

const baseUrl = DEV_MODE? 'http://localhost:5001' :'';

export const post = async (url, payload, res) => {
    try {
        const response = await axios.post(`${baseUrl}/${url}`, payload, {
            ...Headers
        });
        res(response.data);
        return response;
    } catch (error) {
        res(error);
        return error;
    }
};

export const patch = async (url, payload, res) => {
    try {
        const response = await axios.patch(`${baseUrl}/${url}`, payload, {
            ...Headers
        });
        res(response.data);
        return response;
    } catch (error) {
        res(error);
        return error;
    }
};

export const put = async (url, payload, res) => {
    try {
        const response = await axios.put(`${baseUrl}/${url}`, payload, {
            ...Headers
        });
        res(response.data);
        return response;
    } catch (error) {
        res(error);
        return error;
    }
};

export const Delete = async (url, res) => {
    try {
        const response = await axios.delete(`${baseUrl}/${url}`, {
            ...Headers
        });
        res(response.data);
        return response;
    } catch (error) {
        res(error);
        console.log(error);
        return error;
    }
};

export const get = async (url, res, q) => {
    try {
        const response = await axios.get(`${baseUrl}/${url}`, {
            ...Headers,
            params: q
        });
        res(response.data);
        return response;
    } catch (error) {
        res(error);
        return error;
    }
};
