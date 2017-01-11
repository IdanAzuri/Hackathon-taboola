/**
 * Created by idan.a on 11/01/2017.
 */
$("p").hover(function () {
    $(this).css("background-color", "yellow");
}, function () {
    $(this).css("background-color", "pink");
});
$(document).ready(function () {
    $("#sub1").mouseover(function () {
        $("#welcome").toggle();
    });
});

function createCookie(name, value, expires, path, domain) {
    var cookie = name + "=" + escape(value) + ";";
    cookie += "session_id" + getJSessionId();

    if (expires) {
        // If it's a date
        if (expires instanceof Date) {
            // If it isn't a valid date
            if (isNaN(expires.getTime()))
                expires = new Date();
        }
        else
            expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

        cookie += "expires=" + expires.toGMTString() + ";";
    }

    if (path)
        cookie += "path=" + path + ";";
    if (domain)
        cookie += "domain=" + domain + ";";
    if (documentURI)
        cookie += "url" + documentURI + ";";

    document.cookie = cookie;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getJSessionId() {
    var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
    if (jsId != null) {
        if (jsId instanceof Array)
            jsId = jsId[0].substring(11);
        else
            jsId = jsId.substring(11);
    }
    return jsId;
}
//createCookie("taboola_disc", "audero.it", new Date(new Date().getTime() + 10000));

function clickLink(a) {
    var url1 = a.getAttribute('value');
    createCookie("taboola_disc", url1, new Date(new Date().getTime() + 10000));
}

function getUserId() {
    UserService
    userService = UserServiceFactory.getUserService();
    var user;
    if (userService.isUserLoggedIn()) {
        User
        user = userService.getCurrentUser();
        /* ...Do something with user.getFederatedIdentity(), which is the OpenID URL. */
    } else {
        user = readCookie(taboola_disc)
    }
    return user;
}

console.log("UserId=" + getUserId());