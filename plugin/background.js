// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var HOMEPAGE = chrome.runtime.getManifest().homepage_url;
var HISTORY_UPDATE_URL = HOMEPAGE + "hist/save";
var counter = 0;

function handleNewUrl(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", HISTORY_UPDATE_URL);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		console.log("response: " + xmlhttp.responseText)
	};
	xmlhttp.send(JSON.stringify({params:{userId: 2,url:url}}));
}

chrome.history.onVisited.addListener(function(item) {
	if(item.url){
		handleNewUrl(item.url);
	}
});
