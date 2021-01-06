import axios, { AxiosRequestConfig } from 'axios';

import store from 'redux/store';
import { setIsLoading } from 'redux/IsLoading/isLoadingActionCreators';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

let pendingRequestsCount = 0;

instance.interceptors.request.use(
    async (config) => {
        pendingRequestsCount++;
        activateIsLoading(config);
        return config;
    }, 
    (error) => Promise.reject(error)
);

export const activateIsLoading = (config: AxiosRequestConfig) => {
    if (!config.url?.includes('/optionalExposureSources') && pendingRequestsCount === 1) {
        setIsLoading(true);  
    } 
}

instance.interceptors.response.use(
    (config) => {
        pendingRequestsCount--;
        if (pendingRequestsCount === 0) {
            setIsLoading(false);
        }
        return config;
    }, 
    (error) => {
        pendingRequestsCount--;
        if (pendingRequestsCount === 0) {
            setIsLoading(false);
        }
        return Promise.reject(error);
    }
);

export default instance;