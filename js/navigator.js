/**
 * Created by will on 5/29/15.
 */

var includedUrls = [];

$(document).ready(function() {
    var page = getCurrentPage();
    if (page.trim() == "") page = "index";
    loadContents("html/" + page + "c.html")
});

function importElement(element, folder) {
    var url = folder + "/" + element + "/" + element + ".html";
    var included = typeof includedUrls.indexOf(url) === 'undefined';
    if (included) return;
    includedUrls.push(url);
    var link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', url);
    /*link.onload = function() {};*/
    document.body.appendChild(link);
}

function requires() {
    for (var i = 0; i < arguments.length; i++) {
        importElement(arguments[i], "components");
    }
}

function requiresc() {
    for (var i = 0; i < arguments.length; i++) {
        var args = arguments[i].split("/");
        importElement(args[1], args[0]);
    }
}

function goto(str) {
    window.location.search = jQuery.query.set("page", str);
}

function setTitle(str) {
    document.title = str;
}

function loadContents(url) {
    $.ajax({
        url: url,
        data: {
        },
        success: function(data) {
            var html = removeCorsNAV(data);
            $(".contents").html(html);
        },
        error: function(data) {
            if (getCurrentPage() == "404") {
                $("body".html("Sorry, something has gone horribly wrong!"))
            }else {
                goto("404");
            }
        }
    });
}

function removeCorsNAV(str) {
    return str.replace("Access-Control-Allow-Origin: *", "");
}

function getParameterByName(name) {
    //http://stackoverflow.com/a/901144
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function contains(str, str1) {
    return str.indexOf(str1) > -1;
}

function getCurrentPage() {
    var url = window.location.href;
    if (contains(url, "?") && contains(url, "page=")) {
        return getParameterByName("page");
    }else {
        var dirList = url.split("/");
        var end = dirList[dirList.length - 1];
        var page = end.split(".")[0];
        return page;
    }
}
