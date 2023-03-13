import Cookies from "js-cookie";
import { baseUrl, liveUrl } from "./server";
const axios = require('axios');
export const request = (link: string, params: any) => {
    // console.log({params});
    let headers: any = {
        // 'Content-type': 'application/json; charset=UTF-8',
        
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        // "Authorization": `Bearer ${getCookie('token', document?.cookie)}`,
    }
    params?.header && (headers["Content-type"] = params.header);
    let token: any = null;
    if (localStorage?.getItem("access_token")) {
        token = localStorage.getItem("access_token");
        // console.log("======================token applied from client/browser local storage=============", token);
    } else if (Cookies.get("access_token")) {
        token = Cookies.get("access_token");
        // console.log("======================token applied from client/browser cookie=============", token);
    } else{
        console.log("======================empty token =============");
    }
    token && (headers = { ...headers, ...{ Authorization: `Bearer ${token}` } });
    const url = (liveUrl || baseUrl) + link;
    let fetchConfig: any = {
        method: (params && params?.method) || "get",
        url: url,
        // baseURL: server,
        // params: (params && params.params) || "",
        // body: (params && params.body) || "",
        headers: headers,
    };
    
    params?.body && (fetchConfig = {
        ...fetchConfig,
        data: params.body,
    });
    // params?.method === 'post' && ( fetchConfig.headers);
    // console.log({fetchConfig});
    
    // console.log({url});
    
    return axios(fetchConfig)
        .then((response: any) => {
            const { data } = response;
            return data || {status: false, messages: "No data found"};
        })
        .catch((error: any) => {
            console.log({error});
            return error;
        });
    
}