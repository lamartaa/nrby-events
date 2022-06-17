import axios from 'axios'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
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

export const GetGridStateFormData = (gridState) => {

    const formData = new FormData();
    formData.append('skip', JSON.stringify(gridState.skip));
    formData.append('take', JSON.stringify(gridState.take));
    formData.append('sort', JSON.stringify(gridState.sort));
    formData.append('filter', JSON.stringify(gridState.filter));
    
    return formData;
}

const getAllEventsResponse = async(gridState, upcomingEventsOnly = false) =>
{
    axios.interceptors.response.use(
        response => response,
        error => {
            return error.response;
        }
    );
    
    var tokenConfig = GetTokenConfig();

    var baseAPIUrl = "https://nrby-webportalapi.azurewebsites.net";//"http://localhost:51441";

    return await axios.post(`${baseAPIUrl}/api/events/list`, { gridState: gridState, upcomingEventsOnly: upcomingEventsOnly}, tokenConfig);
}

export const getAllEvents = AwesomeDebouncePromise(getAllEventsResponse, 700);

export const getEventPublicDetails = async(eventId) =>
{
    axios.interceptors.response.use(
        response => response,
        error => {
            return error.response;
        }
    );
    
    var tokenConfig = GetTokenConfig();

    var baseAPIUrl = "https://nrby-webportalapi.azurewebsites.net";//"http://localhost:51441";

    return await axios.get(`${baseAPIUrl}/api/events/public?eventId=${eventId}`, tokenConfig);
}