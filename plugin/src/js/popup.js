USER_ID = 0;
var homepageUrl = chrome.runtime.getManifest().homepage_url;

var staticData = {
    items: [
        {
            'url': 'youtube.com',
            'thumbnail_url': 'data:image/png;base64,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',
            'title': 'YouTube',
            'is_trending': 1,
            'also_like': 1040050
        },
        {
            'url': 'netflix.com',
            'thumbnail_url': 'data:image/png;base64,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',
            'title': 'Netflix',
            'also_like': 1220000
        },
        {
            'url': 'imdb.com',
            'thumbnail_url': 'data:image/jpeg;base64,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',
            'title': 'IMDB',
            'also_like': 80100
        },
        {
            'url': 'wikia.com',
            'thumbnail_url': 'data:image/png;base64,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',
            'title': 'Wikia',
            'also_like': 9000
        },
        {
            'url': 'deviantart.com',
            'thumbnail_url': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAD1CAMAAAAvfDqYAAAAflBMVEX///8B0TwA0DUAzyoAzzDE8MuV5aIAziYA0Di17b4A0DNf23XP9Nai6q9Z23Fk3Hna9t9r3X6u67je9uL2/fgj1E3T9drm+eqP5qBu34TH8tBb23Ls++9A2GCJ5Jqp6rTy/PVB2GEW00Yt1lZP2mp+45K88MYAzRic6at84o8f7YFYAAAEtklEQVR4nO2da1PbMBBFiW1wsEsC4U2AhPAI/P8/WMekgTId6y61dCVzD53m656RI2ul1WZvTwghhBBCCCGEEEIIIYQQQgghhMC4uTrogB2dmarooGRHZ+W+GHVQscMzclp22SSnM8mGpLPfPTip6azGQ9J5zbtt0tK57ZzVNmTsEC1cV0PSuXA9amnpPDrmgYYxO0acQ8cknZjOCBicdHS6F2up6Vy654GUdJ66F2tbnRE7TJAbYB5ISAeYpDc6K3acGEfIN6fROWcHCrEEZrVW55EdKcQbqvPAjhTheI3ZjLIJO1SEB2SS3lBds0MFeIEm6VbnjR0rQAZN0qnoXIHzwEbnmR2sE2ixlo5O7cyoPyiu2NG6uDEMTgI65/A8kIIOuFgj6Sxfj3YsFkeL2eywYfb+8S+AjJqo82v993lM7sJkE17H9OyYyWdD0gme7vjVKV+GpBM+efOqU+4PSSd7Cm3jVae8GJJOVge38amzPg2vA5w4fRPKNoE/neKWoOPtYSsoeegFvCljpFoOSYeUt/l62HKKjS+d/Iij42dmox3r+Pnu5IdD0uEdUnnRCZ61edUhHrn50ClvhqTDPHE77l+nPB6STkXI2jzqlJdD0uEe7vavwxwcV829GU7WtqPv0SnPqDo9j07+SrXpWWc84g5OzzqsrM2PDr8Yr1cdWtbmRSeC0sI+dfLgxzk+dcZ3bJlGZ13+zfa8vSiKqspWFp3yF1vGxZuhmiibs6N1YVoBMbM2jDtDiQc1a4OYmUq9qIkBwNnYMDhF9EWfyP2cHTnjrM2C6Y1U3LPDdeG4TP1lcMiJgRO89HvEz9rcWKoKx6vYB+fAMknTszYXtxYbftbmYmpYrEWQtTkwHQBHkLU5wO7pbSEe52AsTIMTvgjPxpmp9Hv8UM/ndV3PJ/VkuuWk+Xv/b8pfy11bFmuNT9ZBRd7lbZK2XisnCrLN3p1lsRa9DtJUwQC7FYur840RcrMPU9IWvY7lnh4Et/+C5Z4eZENtWIA1VUhGx3RPD9JhJg+2e3qQDnG5fYbe209Dx90By64zrNo24qGPZYcd1qF1xzDtsMM6tOSu8DA4vNLD554Xa1ydUz/V+ywdqANWMjovnm6KkHRs9/Zj17nydWeMcdsSaFealI5phz16nd6TNq6OaYfdqDMNbtN/0sbUWVrKIeLXMe6w26hOAtv0XedO1oE74SWh0/MO+1dCf3d8Lda2BB6dvnfYuTqXfh+10Dq+0hySzv4P1+k6pf4XedQ6q0nDU/O3o60p2DLd/JtONx/T9qOu50Er3Yw6+SJkcHZsOtEXE9l0wnf0MmLSIXT0MmLSYTSNsmHRSaC3tEUn+kJ2k078hewWHfoNVwRcJ/Y3aAusE/0btAXWieASJQCqkyXx8wywTvz39FpAnQTeoC2gznrJDhQD04m+I/sfIJ0k3qAtkE70t412IDppvEFbEB1e8zgzgE4MbQhQAJ08fFfpb+PWCX7e9D+4daj9yaw4dVLIQT9w6pB6434Tl04SOegHDp2E3qAtDp2E3qAt3Tpp/ETgJ7p1CL/L8H/sr792MfrUyahMJAcVQgghhBBCCCGEEEIIIYQQQgghhBBC/Dx+A3b5UHKoohDyAAAAAElFTkSuQmCC',
            'title': 'Deviantart',
            'also_like': 3000
        }
    ]
};

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

var trHTML = '';
function renderRecs(recs) {
    $.each(recs.items, function (i, item) {
        var isTrending = item.is_trending
        var alsoLiked = item.also_like + ' also like this page'

        trHTML +=
            '<tr class="link" id="rowId">' +
                '<td class="newtab">' +
                '<img id="thumbnailId" src="' + item.thumbnail_url + '" style="width: 20px; height: 20px"/>' +
                '<a href="' + item.url + '">' + (item.title == null ? item.url : truncate(item.title.trim())) + '</a>' +
            '<br style="height: 1px"><small>' + ''+ '</small>' +
            '<br><small>' + alsoLiked + '</small>';


        if (isTrending == 1) {
            trHTML +=
                    '<img id="thumbnailId" src="https://www.materialui.co/materialIcons/action/trending_up_white_192x192.png" style="width: 15px; height: 25px; opacity: 05"/>' +
                    '</td>'+
                '<td>' +
                    '<i id="favourite-toggle" class="glyphicon glyphicon-plus" style="color:floralwhite"></i>'+
                '</td>' +
                '</tr>'
        }
        else {
            trHTML +=
                '</td>'+'<td>' +
                '<i id="favourite-toggle" class="glyphicon glyphicon-plus" style="color:floralwhite"></i>'+
                '</td>' +
                '</tr>'
        }
    });

    $('#recList').append(trHTML);
}

var isAsked = false

function getItems() {
    var url = homepageUrl + "disco/get";
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
                if (jsonObj.question != undefined && !isAsked) {
                    isAsked = true
                    $('#question').append('<tr id="question"><td colspan="1"><img id="thmbnl" name="male" src="src/img/male.jpeg"/></td><td colspan="2" align="middle">Help us help you</td><td colspan="1" align="right"><img id="thmbnl" name="female" src="src/img/female.png"/></td></tr>');
                }
            }
        }
    };
    xmlhttp.send(JSON.stringify(postObj));
}

window.onload = function () {
    getItems();
    $('#recList').on("click", "#favourite-toggle", function() {
        $(this).toggleClass('glyphicon-pushpin');
        $(this).removeAttr('id');
        var link = this.parentElement.parentElement.children[0].children[1].href;
        link = link.split('/')[3];
        var url = homepageUrl + "disco/savefav";
        var postObj = {params: {userId: USER_ID, url: link}};
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
    $("#question").on("click", "img[name*=male]", function () {
        var url = homepageUrl + "disco/post";
        var postObj = {params: {userId: USER_ID, userGender: this.name}};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(postObj));
        $("#question").remove();
    });

};

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        getItems()
    }
});
