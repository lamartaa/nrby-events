import axios from 'axios'
/// <reference path="./models/RequestModels.d.ts" />

export const GetTokenConfig = () =>
{
    var token = localStorage.getItem("nrby-access-token");

    let axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      };
      
    return axiosConfig;
}

export const getEventPublicDetails = async(eventIds) =>
{
    axios.interceptors.response.use(
        response => response,
        error => {
            return error.response;
        }
    );
    
    var tokenConfig = GetTokenConfig();

    var baseAPIUrl = "https://nrby-webportalapi.azurewebsites.net";//"http://localhost:51441";

    var url = `${baseAPIUrl}/api/widgets`;

    eventIds.forEach((e, i) => {
        if(i == 0){
            url += `?eventIds=${e}`;
        }
        else{
            url += `&eventIds=${e}`;
        }
    });

    return await axios.get(url, tokenConfig);
}