// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var HOMEPAGE = chrome.runtime.getManifest().homepage_url;
var HISTORY_UPDATE_URL = HOMEPAGE + "hist/save";
//var USER_ID = 0;
var counter = 0;
var MAX_ITEMS = 10;

function getUserHistory(){
	chrome.history.search({text: '', maxResults: MAX_ITEMS}, function(data) {
	var items = [];
    data.forEach(function(page) {
        //console.log("from history: "+ page.url);
        items.push(page);
    });
    handleUrls(items);
});
}

function handleUrls(urls) {
	var urlsObj = {params:{userId: USER_ID , urls: urls}};
	console.log(urlsObj);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", HISTORY_UPDATE_URL);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		console.log("response: " + xmlhttp.responseText)
	};
	
	xmlhttp.send(JSON.stringify(urlsObj));
}
//getUserId();
// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
	getUserHistory();
});
chrome.history.onVisited.addListener(function(item) {
	if(item.url){
		//console.log(item);
		handleUrls([item]);
	}
});


