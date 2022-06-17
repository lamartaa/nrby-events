import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
/// <reference path="./models/RequestModels.d.ts" />

export const GetTokenConfig = () =>
{
    var token = localStorage.getItem("nrby-access-token");

    let axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      };
      
    return axiosConfig;
}

export const authenticate = async (username, password, stayLoggedIn) =>  {
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };

    var baseAPIUrl = "https://nrby-webportalapi.azurewebsites.net";//"http://localhost:51441";

    return await axios.post(`${baseAPIUrl}/api/portalusers/authenticate`, { username: username, password: password, stayLoggedIn: stayLoggedIn }, axiosConfig);
}

