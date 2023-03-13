import { request } from "../utils/request";

// get data list
export const get_all_requests = () => {
    return request("/get/all/requests", {
        method: "get"
    });
}

export const create_blood_request = (data?: any) => {
    return request("/create/request", {
        method: "post",
        header: "application/json",
        body: data,
    });
}