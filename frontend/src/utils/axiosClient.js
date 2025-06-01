import axios from "axios"

const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_REACT_BACKEND_BASEURL,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

