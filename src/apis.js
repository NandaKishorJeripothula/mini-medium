// import { authUrl, dataUrl, fileStoreUrl, apiUrl } from './config'

const clusterName = "loathsome61"; //Add your own cluster name
var authUrl = "https://auth." + clusterName + ".hasura-app.io/v1/";
var dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
var fileStoreUrl = "https://filestore." + clusterName + ".hasura-app.io/v1/file";
var apiUrl = "https://api." + clusterName + ".hasura-app.io";

const networkErrorObj = {
    status: 503
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
};
export async function getArticles(token, user_id, id) {
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Bearer " + token
        },
    };
    if (user_id) {
        requestOptions.body = JSON.stringify({ "hasura_id": user_id });

    } else {
        requestOptions.body = JSON.stringify({})
    }
    // console.log(requestOptions);
    try {
        var resp = await fetch(apiUrl + '/api/getArticles', requestOptions).then((res) => { return res.json() });
        // console.log("from API \n", resp);
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
export async function signup(params) {
    if (!params.fullName || !params.city || !params.usernameInputVal || !params.passwordInputVal)
        Alert.alert("Mandatory", "All Fields and image are mandatory")
    else {
        // let uriParts = params.imageUri.split('.');
        // let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('username', params.usernameInputVal);
        formData.append('password', params.passwordInputVal);
        formData.append('full_name', params.fullName);
        formData.append('city', params.city);
        // formData.append('image', {
        //     uri: this.state.imageuri,
        //     name: "userPic." + fileType,
        //     type: "image/" + fileType,
        // });
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'

            },
        };
        try {
            var resp = await fetch(apiUrl + '/api/newuser', options);
            return resp;
        }
        catch (err) {
            console.log("Request Failed: " + err);
            return networkErrorObj;
        }
    }
}