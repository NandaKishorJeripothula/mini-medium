const clusterName = "loathsome61"; //Add your own cluster name
var authUrl = "https://auth." + clusterName + ".hasura-app.io/v1/";
var dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
var fileStoreUrl = "https://filestore." + clusterName + ".hasura-app.io/v1/file";
var apiUrl = "https://api." + clusterName + ".hasura-app.io";
exports = { authUrl, dataUrl, fileStoreUrl, apiUrl };