USER_ID = 0;
var homepageUrl = chrome.runtime.getManifest().homepage_url;

function getId(){
    if (USER_ID == 0){
        chrome.storage.sync.get('userId', function(result) {
            console.log("in pop up, got id: "+result.userId);
            USER_ID = result.userId;
        });
    }
}

getId();

var trHTML = ''
function renderRecs(recs) {
    var jsonRecs = JSON.parse(recs);
    $.each(jsonRecs.items, function (i, item) {
        console.log(item.url)
        trHTML += '<tr><td><img id="thmbnl" src="' + item.thumbnail_url + '"/></td><td valign="middle"><a href="' + item.url + '">' + item.url + '</a></td></tr>';
    });

    $('#recList').append(trHTML);
}

function getItems() {
    console.log("In event for recs...");
    console.log("user id is: " + USER_ID);
    var url = homepageUrl + "disco/get";
    var postObj = {params: {userId: USER_ID}};
    console.log("url: " + url);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            console.log("response: " + xmlhttp.responseText);
            renderRecs(xmlhttp.response);
        }

        // chrome.tabs.getCurrent(function (tab) {
        //     //Your code below...
        //     var tabUrl = encodeURIComponent(tab.url);
        //     var tabTitle = encodeURIComponent(tab.title);
        //     var myNewUrl = "https://www.mipanga.com/Content/Submit?url=" + tabUrl + "&title=" + tabTitle;
        //
        //     //Update the url here.
        //     chrome.tabs.update(tab.id, {url: myNewUrl});
        // });
    };
    xmlhttp.send(JSON.stringify(postObj));
}

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        getItems()
    }
});


window.onload = function() {
    getItems()
}



