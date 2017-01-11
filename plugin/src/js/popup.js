function renderRecs(recs) {
    var trHTML = '<tr><th colspan=2>You May Like</th></tr>';

    $.each(recs.items, function (i, item) {
        trHTML += '<tr><td><img id="thmbnl" src="' + item[1] + '"/></td><td valign="middle">' + item[0] + '</td></tr>';
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
    });
});
