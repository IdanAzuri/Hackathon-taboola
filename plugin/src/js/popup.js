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

    $.each(recs.items, function (i, item) {
        trHTML += '<tr><td><img id="thmbnl" src="' + item[1] + '"/></td><td valign="middle"><a href="' + item[0] + '" onclick="chrome.tabs.create({url:this.href})">' + item[0] + '</a></td></tr>';
    });

    $('#recList').append(trHTML);
}

window.onload = function() {
  console.log("In event for recs...");
    console.log("user id is: "+USER_ID);
    var url = homepageUrl + "disco/get";
    var postObj = {params: {userId: USER_ID}};
    console.log("url: "+url);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        console.log("response: " + xmlhttp.responseText)
    };
    xmlhttp.send(JSON.stringify(postObj));
    // $.ajax
    // ({
    //     type: "POST",
    //     url: url,
    //     //dataType: 'json',
    //     async: false,
    //     data: JSON.stringify(postObj),
    //     success: function( data, textStatus, jQxhr ){
    //         console.log(data);
    //         renderRecs(data);
    // },
    // })
}



// var homepageUrl = chrome.runtime.getManifest().homepage_url;
// document.addEventListener('DOMContentLoaded', function() {
//     console.log("In event for recs...");
//     console.log("user id is: "+USER_ID);
//     var url = homepageUrl + "disco/get?"+USER_ID;
//     console.log("url: "+url);
//     $.getJSON( url, function(data) {
//         renderRecs(data)
//     })
//     .fail(function() {
//         $('#recList').append("Couldn't get recommendations");
//     });
// });



