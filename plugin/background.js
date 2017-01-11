// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var HOMEPAGE = chrome.runtime.getManifest().homepage_url;
var HISTORY_UPDATE_URL = "172.25.8.114:3000"+ "hist/save";
var counter = 0;

function handleNewUrl(url) {
	// console.log("updated url: " + url);
	// counter++;
	// chrome.browserAction.setBadgeText({"text": counter.toString()});
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", HISTORY_UPDATE_URL);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		console.log("response: "+xmlhttp.responseText)
	};
	xmlhttp.send(JSON.stringify({params:{userId: 2,url:url}}));
}

chrome.tabs.onUpdated.addListener(function(tabId, props) {
  if (props.url && props.url.startsWith("http"))
    handleNewUrl(props.url);
}
);
