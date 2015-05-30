/**
 * Created by will on 5/29/15.
 */

$(document).ready(function() {
    var page = getCurrentPage();
    if (page.trim() == "") page = "index";
    loadContents("html/" + page + "c.html")
});

function importElement(element) {
    var url = "polymer/" + element + "/" + element + ".html";
    var link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', url);
    /*link.onload = function() {};*/
    document.body.appendChild(link);
}

function requires() {
    for (var i = 0; i < arguments.length; i++) {
        importElement(arguments[i]);
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
            goto("404");
        }
    });
}

function removeCorsNAV(str) {
    return str.replace("Access-Control-Allow-Origin: *", "");
}

function getParameterByName(name) {
    /*https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript*/
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
