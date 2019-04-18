const networkErrorObj = {
    status: 503
}

export async function tryAuth(username, password, task, dispatch) {
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    var url = authUrl + task;
    console.log(url)
    var body = {
        "provider": "username",
        "data": {
            "username": username,
            "password": password
        }
    };
    console.log("BeforeFetch")
    requestOptions["body"] = JSON.stringify(body);

    try {
        var resp = await fetch(url, requestOptions);
        return resp;
    }
    catch (err) {
        console.log("Request Failed: " + err);
        return networkErrorObj;
    }
}