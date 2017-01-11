// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var counter = 0;

function handleNewUrl(url) {
  console.log("updated url: " + url);
  counter++;
  chrome.browserAction.setBadgeText({"text": counter.toString()});
}

chrome.tabs.onUpdated.addListener(function(tabId, props) {
  if (props.url && props.url.startsWith("http"))
    handleNewUrl(props.url);
});
