function renderRecs(recs) {
    var trHTML = '<tr><th colspan=2>You May Like</th></tr>';

    $.each(recs.items, function (i, item) {
        trHTML += '<tr><td><img id="thmbnl" src="' + item[1] + '"/></td><td valign="middle"><a href="' + item[0] + '" onclick="chrome.tabs.create({url:this.href})">' + item[0] + '</a></td></tr>';
    });

    $('#recList').append(trHTML);
}

var homepageUrl = chrome.runtime.getManifest().homepage_url;
document.addEventListener('DOMContentLoaded', function() {
    $.getJSON( homepageUrl + "disco/get/", function(data) {
        renderRecs(data)
    })
    .fail(function() {
        $('#recList').append("Couldn't get recommendations");
    }).done(function () {
        // var hrefs = document.getElementsByTagName("a");
        //
        // function openLink() {
        //     chrome.tabs.create({active: true, url: this.href});
        //     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //         // var tab = tabs[0];
        //         // chrome.tabs.update(tab.id, {url: "www." + tab.url.substring(tab.url.lastIndexOf("/")+1)});
        //
        //     // });
        // }
        //
        // for (var i=0,a; a=hrefs[i]; ++i) {
        //     hrefs[i].addEventListener('click', openLink);
        // }
        // $('body').on('click', 'a', function(){
        //     chrome.tabs.create({url: $(this).attr('href')});
        //     return false;
        // });
    });
});
window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
        chrome.tabs.create({url:e.target.href})
    }
});
