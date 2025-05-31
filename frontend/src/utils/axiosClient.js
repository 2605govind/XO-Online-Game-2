import axios from "axios"

const axiosClient =  axios.create({
    baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5000' : '',
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

