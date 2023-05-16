import { request } from "../utils/request";

// user login
export const user_login = (data?: any) => {
    return request("/user/login", {
        method: "post",
        header: "application/json",
        body: data,
    });
}

// admin signup
export const admin_signup = (data?: any) => {
    return request("/admin/signup", {
        method: "post",
        header: "application/json",
        body: data,
    });
}

// admin login
export const admin_login = (data?: any) => {
    return request("/admin/login", {
        method: "post",
        header: "application/json",
        body: data,
    });
}

// admin find donors
export const find_donors = () => {
    return request("/find/donors", {
        method: "get",
        header: "application/json",
    });
}

// find admins
export const find_admins = () => {
    return request("/find/admins", {
        method: "get",
        header: "application/json",
    });
}


// send email to donor notification
export const send_email_to_donor = (data?: any) => {
    return request("/donor/send-email", {
        method: "post",
        header: "application/json",
        body: data,
    });
}

// send email to donor notification
export const send_email_to_admin = (data?: any) => {
    return request("/admin/send-email", {
        method: "post",
        header: "application/json",
        body: data,
    });
}

// donor register 
export const donor_register = (data?: any) => {
    return request("/donor/register", {
        method: "post",
        header: "application/json",
        body: data,
    });
}


// get user user details
export const get_user_details = (token: any) => {
    return request("/user/details", {
        method: "get",
        header: "application/json",
        token
    });
}

// update user details
export const update_user_details = (data?: any) => {
    return request("/user/update", {
        method: "patch",
        header: "application/json",
        body: data,
    });
}

// user delete 
export const user_delete = (data?: any) => {
    return request("/user/delete?email=" + data, {
        method: "delete",
        header: "application/json",
    });
}

export const reset_password = (data: any) => {
    return request("/user/reset-password?email=" + data, {
        method: "get",
    });
}

export const change_password = (data: any) => {
    return request("/user/change-password", {
        method: "post",
        body: data
    })
}