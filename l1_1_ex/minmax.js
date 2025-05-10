
function numbers(l) {
    var o = [];
    for (let i in l) {
        var n = parseInt(l[i],10);
        if (!isNaN(n)) {
            o.push(n);
        }
    }
    return o;
}

function min_max(a) {
    var min = null;
    var max = null;
    for (let i of a) {
        if (min == null) {
            min = i; 
        } else if (min > i) {
            min = i;
        }
        if (max == null) {
            max = i;
        } else if (max < i) {
            max = i;
        }
    }
    return { 'min' : min, 'max' : max}
}

function handleButton1Click() {
    var textbox1 = document.getElementById("textbox1");
    var min = document.getElementById("min");
    var max = document.getElementById("max");
    var items = textbox1.value.split(",");
    var obj = min_max(numbers(items));
    min.innerHTML = obj['min'];
    max.innerHTML = obj['max'];
}


function run() {
    var button1 = document.getElementById("button1");
    button1.addEventListener("click", handleButton1Click); 
}



document.addEventListener( "DOMContentLoaded", run);
