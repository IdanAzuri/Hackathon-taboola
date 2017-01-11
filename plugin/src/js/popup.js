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



function renderRecs(recs) {
    var trHTML = '<tr><th colspan=2>You May Like</th></tr>';
    var jsonRecs = JSON.parse(recs);
    $.each(jsonRecs.items, function (i, item) {
        trHTML += '<tr><td><img id="thmbnl" src="' + item.thumbnail_url + '"/></td><td valign="middle"><a class="link" href="' + item.url + '">' + item.url + '</a></td></tr>';
    });

    $('#recList').append(trHTML);

    $(".link").click(function () {
        chrome.tabs.create({ url: "http://" + this.innerHTML });
    });
}

window.onload = function() {
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
    };
    xmlhttp.send(JSON.stringify(postObj));
}



