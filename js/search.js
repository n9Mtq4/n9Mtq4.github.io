/**
 * Created by will on 5/29/15.
 */
/* (c) Copyright 2013-2015 Will (n9Mtq4) Bresnahan */
/* Will Bresnahan's javascript search library */
/* Adapted for use at n9Mtq4.com */

var search = {
    htmlOutput: '',
    open: false,
    firstTime: true,
    htmlOutputPrefix: '',
    htmlOutputSuffix: '',
    searchInputFieldID: 'field',
    outputDivID: 'searchResultSpace',
    writeTemplate: '',
    searchDatabase: [],
    startSearch: function() {
        var inputField = document.getElementById(search.searchInputFieldID);
        if (inputField.value.trim() == "") {
            inputField.value = "a b c d e f g h i j k l m n o p q r s t u v w x y z";
        }
        var result = search.searchAlg(inputField.value);
        result = search.sortArray(result);
        search.writeResult(result);
    },
    reset: function() {
        $('#field').val("");
        search.clearResults();
    },
    clearResults: function() {
        document.getElementById(search.outputDivID).innerHTML = '';
    },
    writeResult: function(inputArray) {
        var count01 = 0;
        var space = document.getElementById(search.outputDivID);
        htmlOutput = '';
        htmlOutput.concat(search.htmlOutputPrefix);
        while (count01 < inputArray.length) {
            /*parsing input*/
            var mainIndexLocation = inputArray[count01][0];
            var placement = inputArray[count01][1];
            var title = search.searchDatabase[mainIndexLocation][0];
            var desc = search.searchDatabase[mainIndexLocation][1];
            var href = search.searchDatabase[mainIndexLocation][3];
            var searchResultHtml = search.writeTemplate;
            searchResultHtml = searchResultHtml.replace("$TITLE", title);
            searchResultHtml = searchResultHtml.replace("$DESC", desc);
            searchResultHtml = searchResultHtml.replace("$HREF", href);
            htmlOutput = htmlOutput.concat(searchResultHtml);
            count01++;
        }
        htmlOutput.concat(search.htmlOutputSuffix);
        space.innerHTML = htmlOutput;
    },
    searchAlg: function(keyWord) {
        /* algorithm for searching the array */
        var count = 0;
        var intArray = new Array();
        while (count < search.searchDatabase.length) {
            var keywordCount = 0;
            var comp = search.searchDatabase[count][2].split(", ");
            var keyWords = keyWord.split(" ");
            count1 = 0
            while (count1 < comp.length) {
                /*comp[count1];*/
                var count2 = 0;
                while (count2 < keyWords.length) {
                    if (comp[count1].indexOf(keyWords[count2].toLowerCase()) != -1 || keyWords[count2].indexOf(comp[count1].toLowerCase()) != -1) {
                        keywordCount++;
                    }
                    count2++;
                }
                count1++;
            }
            if (keywordCount > 0) {
                intArray.push([count, keywordCount]);
            }
            count++;
        }
        if (intArray.length == 0) {
            intArray.push([0, 1]);
        }
        return intArray;
    },
    sortArray: function(array) {
        /* yea, I know its not efficient or accurate, but it works alright for now */
        var newArray = [];
        var defaultSort = 50;
        while (newArray.length != array.length) {
            /*loop until newarray is same size as first array*/
            var start = defaultSort;
            while (start > 0) {
                /*until start gets to zero*/
                var count0000 = 0;
                while (count0000 < array.length) {
                    /*for each value in array*/
                    var intValue = array[count0000][1];
                    if (start == defaultSort) {
                        /*first time*/
                        if (intValue >= start) {
                            newArray.push(array[count0000]);
                        }
                    }else {
                        /*not first time*/
                        if (intValue == start) {
                            newArray.push(array[count0000]);
                        }
                    }
                    count0000++;
                }
                start--;
            }
        }
        return newArray;
    },
    openSearch: function() {
        $('#field').fadeIn(500);
        $('#clearbutton').fadeIn(500);
        $('#field').focus();
    },
    closeSearch: function() {
        $('#field').fadeOut(500);
        $('#clearbutton').fadeOut(500);
    },
    toggleSearch: function() {
        if (search.open) {
            search.closeSearch();
        }else {
            search.openSearch();
        }
        search.open = !search.open;
    },
    clearBoth: function() {
        search.clearResults();
        $('#field').val('');
    },
    searchButton: function() {
        if (search.firstTime) {
            search.ajaxit();
            search.firstTime = false;
        }
        if ($('#field').val().trim() == "") {
            search.toggleSearch();
        }else if (search.open) {
            search.startSearch();
        }else if (!search.open) {
            search.toggleSearch();
        }
    },
    ajaxit: function() {
        $.ajax({
            url: "http://n9mtq4.com/js/searchDatabase.txt",
            data: {
            },
            success: function( data ) {
                //TODO: console.log
                console.log(data);
                eval(removeCors(data));
            }
        });
        $.ajax({
            url: "http://n9mtq4.com/html/searchTemplate.html",
            data: {
            },
            success: function(data) {
                //TODO: console.log
                console.log(data);
                search.writeTemplate = removeCors(data);
            }
        })
    }
};

function removeCors(str) {
    return str.replace("Access-Control-Allow-Origin: *", "");
}

$(document).ready(function() {
    /* Back button support */
    search.ajaxit();
    if (($("#" + search.searchInputFieldID).val()).trim() != "") {
        search.ajaxit();
        search.startSearch();
        search.openSearch();
    }
    
    $("#" + search.searchInputFieldID).keyup(function(e) {
        if (e.keyCode == 13) {
            search.startSearch();
        }
    })
    
});
