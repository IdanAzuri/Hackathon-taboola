/**
 * Created by alon.d on 1/12/17.
 */
USER_ID = 0;
var homepageUrl = chrome.runtime.getManifest().homepage_url;
function getId() {
    if (USER_ID == 0) {
        chrome.storage.sync.get('userId', function (result) {
            console.log("in pop up, got id: " + result.userId);
            USER_ID = result.userId;
        });
    }
}

getId();
function truncate(string) {
    if (string.length > 42)
        return string.substring(0, 40) + '...';
    else
        return string;
};
var trHTML='';
function renderRecs(recs) {
    $.each(recs.items, function (i, item) {
        trHTML +=
            '<tr class="link" id="rowId">' +
            '<td class="newtab">' +
            '<img id="thumbnailId" src="' + item.thumbnail_url + '" style="width: 20px; height: 20px"/>' +
            '<a href="' + item.url + '">' + (item.title == null ? item.url : truncate(item.title.trim())) + '</a>' +

                '</td>'+
                '</tr>';
    });

    $('#favList').append(trHTML);
}
function getItems() {
    var url = homepageUrl + "disco/getfavs";
    var postObj = {params: {userId: USER_ID}};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            console.log("response: " + xmlhttp.responseText);
            if (xmlhttp.statusText == '') {
                renderRecs(staticData);
            } else {
                jsonObj = JSON.parse(xmlhttp.response);
                renderRecs(jsonObj);
            }
        }
    };
    xmlhttp.send(JSON.stringify(postObj));
}


window.onload = function () {
    getItems();
    $('#recList').on("click", "#favourite-toggle", function() {
        var title = this.parentElement.parentElement.children[0].children[1].innerHTML;
        var url = homepageUrl + "disco/savefav";
        var postObj = {params: {userId: USER_ID, title: title}};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(postObj));
    });
    $("#recList").on("click", ".newtab", function() {
        var link = this.children[1].href;
        link = link.split('/')[3];
        chrome.tabs.create({url: "http://" + link});
    });
};