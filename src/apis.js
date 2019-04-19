// import { authUrl, dataUrl, fileStoreUrl, apiUrl } from './config'

const clusterName = "loathsome61"; //Add your own cluster name
var authUrl = "https://auth." + clusterName + ".hasura-app.io/v1/";
var dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
var fileStoreUrl = "https://filestore." + clusterName + ".hasura-app.io/v1/file";
var apiUrl = "https://api." + clusterName + ".hasura-app.io";

const networkErrorObj = {
    status: 503
}

export async function uploadImage(Image, token) {
    // This is the file we are going to upload, replace this with your file
    var url = fileStoreUrl;

    // If you have the auth token saved in offline storage, obtain it in async componentDidMount
    // var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
    // And use it in your headers
    // headers = { "Authorization" : "Bearer " + authToken }
    var requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: Image
    }
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
        console.log(resp);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }



    // fetch(url, requestOptions)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (result) {
    //         console.log(result);
    //         // To save the auth token received to offline storage
    //         // var authToken = result.auth_token
    //         // AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
    //     })
    //     .catch(function (error) {
    //         console.log('Request Failed:' + error);
    //     });
}