import { json } from "react-router-dom";

export const fetch_json = async function(url: string, method: string, data: object | undefined) {
    let options : RequestInit = {
        method: method
    };

    if (data != undefined) {
        options.headers = {"Content-Type": "application/json"};
        options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);

    return await response.json();
}