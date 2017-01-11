// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var HOMEPAGE = chrome.runtime.getManifest().homepage_url;
var HISTORY_UPDATE_URL = HOMEPAGE + "hist/save";
var USER_ID = 0;
var counter = 0;
var MAX_ITEMS = 100000;

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

function getUserId() {
    chrome.storage.sync.get('userid', function(items) {
        var userid = items.userid;
        if (userid) {
            useToken(userid);
        } else {
            userid = getRandomToken();
            chrome.storage.sync.set({userid: userid}, function() {
                useToken(userid);
                //console.log("UserId=" + userid);
            });
        }
        function useToken(userid) {
            // TODO: Use user id for authentication or whatever you want.
            console.log("UserId=" + userid);
            USER_ID = userid;
        }
    });
}

function getUserHistory(){
	chrome.history.search({text: '', maxResults: MAX_ITEMS}, function(data) {
	var items = [];
    data.forEach(function(page) {
        //console.log("from history: "+ page.url);
        items.push(page.url);
    });
    handleUrls(items);
});
}

function handleUrls(urls) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", HISTORY_UPDATE_URL);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		console.log("response: " + xmlhttp.responseText)
	};
	var urlsObj = {params:{userId: USER_ID , urls: urls}};
	xmlhttp.send(JSON.stringify(urlsObj));
}

getUserId();
// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
	getUserHistory();
});
chrome.history.onVisited.addListener(function(item) {
	if(item.url){
		handleUrls([item.url]);
	}
});


