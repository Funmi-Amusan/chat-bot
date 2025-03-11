import axios from "axios";
import queryString from "query-string";
import {
    IBaseUrl,
    IGet,
    IPatch,
    IPost,
    IPut,
} from "./axios.interface";

const BASE_URL = process.env.REACT_APP_API_URL;


class HttpFacade {
    private http;
    constructor() {
        this.http = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json"
            }
        });

    }
    post = async ({ url, body }: IPost) => {
        const response = await this.http.post(url, body);
        return response.data;
    };

    patch = async ({ url, body }: IPatch) => {
        const response = await this.http.patch(url, body);
        return response.data;
    };

    get = async ({ url, query = {} }: IGet) => {
        const queryStringified = queryString.stringify(query);
        const response = await this.http.get(`${url}?${queryStringified}`);
        return response.data;
    };

    delete = async ({ url }: IBaseUrl) => {
        const response = await this.http.delete(url);
        return response.data;
    };

    put = async ({ url, body }: IPut) => {
        const response = await this.http.put(url, body);
        return response.data;
    };
}

const httpFacade = new HttpFacade();
export default httpFacade;
