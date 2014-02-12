function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function prepLine(line, cap, clean) {
    var res = line.toLowerCase();
    res = res.replace(/ grey$/, "").replace(/ gray$/, "");
    if (clean) res = res.replace(/\bcock\b/, "cockrel");
    if (cap) {
        return res.charAt(0).toUpperCase() + res.slice(1);
    } else {
        return res;
    }
}

function generatePara(words, clean, isNotStart) {
    var newSentence = !isNotStart;
    var str = isNotStart ? "" : "<p>";
    var max = words.length;
    var last = false;
    var first = true;
    do {
        last = !first && (getRandomInt(0, 10) == 0);
        first = false;
        
        var i = getRandomInt(1, max) - 1;
        str += prepLine(words[i].Name, newSentence, clean);
        
        var puncType = getRandomInt(0, 100);
        if ((!newSentence && puncType < 15) || last) {
            str += ". ";
            newSentence = true;
        } else if(puncType < 25) {
            str += ", ";
            newSentence = false;
        } else if (puncType < 30) {
            str += "; ";
            newSentence = false;
        } else if (puncType < 35) {
            str += ": ";
            newSentence = false;
        } else if (puncType < 40) {
            str += " - ";
            newSentence = false;
        }
        else {
            str += " ";
            newSentence = false;
        }
    }
    while(!last)
    return str + "</p>";
}

function generateText(words) {
    $("#res").html("");
    var clean = $("#clean").is(":checked");
    var str = "<p>Grey ipsum ";
    for (var i = 0; i < $("#count").val(); i++) {
        str += generatePara(words, clean, i==0);
    }
    if($("#html").is(":checked")) {
        $("#res").text(str);
    } else {
        $("#res").html(str);
    }
}

$("#go").click(function() {
    $.ajax({
        url: "http://254shadesofgrey.com/api/grey",
        data: {
            $filter: "NamedBy ne 'Nobody'",
            $orderby: "NumericValue"
        },
        success: generateText,
        crossDomain: true
    });
});