// import { authUrl, dataUrl, fileStoreUrl, apiUrl } from './config'

const clusterName = "loathsome61"; //Add your own cluster name
var authUrl = "https://auth." + clusterName + ".hasura-app.io/v1/";
var dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
var fileStoreUrl = "https://filestore." + clusterName + ".hasura-app.io/v1/file";
var apiUrl = "https://api." + clusterName + ".hasura-app.io";

const networkErrorObj = {
    status: 503
}
export async function createUser(data, session) {
    var url = dataUrl;
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session.auth_token,
        }
    };
    var body = {
        "type": "insert",
        "args": {
            "table": "user_data",
            "objects": [
                {
                    "city": data.city,
                    "full_name": fullName,
                    "image_id": imageID,
                    "user_id": session.hasura_id,
                }
            ]
        }
    };

    requestOptions.body = JSON.stringify(body);
    try {
        var resp = await fetch(url, requestOptions);
        console.log(resp);
        // file_id,content_type
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}
export async function uploadImage(image, token) {
    // This is the file we are going to upload, replace this with your file
    var url = fileStoreUrl;
    var requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "type": image.type,
        },
    };
    requestOptions.body = image;
    try {
        var resp = await fetch(url, requestOptions);
        // file_id,content_type
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}
export async function tryAuth(username, password, task) {
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    var body = {
        "provider": "username",
        "data": {
            "username": username,
            "password": password
        }
    };

    var url = authUrl + task;
    requestOptions.body = JSON.stringify(body);
    try {
        var resp = await fetch(url, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}