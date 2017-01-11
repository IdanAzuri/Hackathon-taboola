HOMEPAGE = chrome.runtime.getManifest().homepage_url;
USER_ID = 0;
var INIT_USER_URL = HOMEPAGE + "initUser";

function getUserId(){
	console.log("getting user id...");
    chrome.storage.sync.get('userId', function(result) {
    	console.log("result is: ");
    	console.log(result);
    	if (result.userId){
    		console.log("found id: ");
    		USER_ID = result.userId;
    		console.log(USER_ID);
    	}
    	else{
    		console.log("generating id from server...");
    		getUserIdFromServer();
    		chrome.storage.sync.set({userId: USER_ID}, function() {
	            console.log("saved new user id: " + USER_ID);
	        });
    	}
	});
}

function getUserIdFromServer(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", INIT_USER_URL, true);
	xmlhttp.onreadystatechange = function() {
		console.log("response id from server: " + xmlhttp.responseText);
		USER_ID = xmlhttp.responseText;
	};
	xmlhttp.send();
}

chrome.windows.onCreated.addListener(function() {
	getUserId();
})