/**
 * Created by will on 5/29/15.
 */

$(document).ready(function() {
    var page = getCurrentPage();
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

function loadContents(url) {
    $.ajax({
        url: url,
        data: {
        },
        success: function(data) {
            var html = removeCorsNAV(data);
            $(".contents").html(html);
        }
    });
}

function removeCorsNAV(str) {
    return str.replace("Access-Control-Allow-Origin: *", "");
}

function getCurrentPage() {
    var url = window.location.href;
    var dirList = url.split("/");
    var end = dirList[dirList.length - 1];
    var page = end.split(".")[0];
    return page;
}
