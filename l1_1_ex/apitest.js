/* 
This is a mocked API test. 

By right the button click event handler handleButton1Click() 
should make an HTTP get request to the server
and render the result in the span. 

However due to the CORS restriction, we fake it by just making a delay 
and return the faked response back to the span after the delay is over.

We will see the actual one in action once we learn backend development.

*/

// the actual one, not in used.
function handleButton1Click() {
    var textbox1 = document.getElementById("textbox1");
    // create an XMLHttpRequest() object
    var xhr = new XMLHttpRequest();
    var input = textbox1.value;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var span1 = document.getElementById("span1");
            span1.innerHTML = xhr.responseText;
        }
    }; // CORS restriction, we need to make sure the call is to the same host
    xhr.open('GET', `https://postman-echo.com/get?x=${input}`);
    xhr.send();
}

// the mocked handler
function handleButton1ClickMocked() {
    var textbox1 = document.getElementById("textbox1");
    // mocking the api as a timeout
    var input = textbox1.value;
    // setTimeout(f, num_of_mini_secs), initiates a timed browser event, which will be triggered
    // after num_of_mini_secs, when it is triggered, the callback f is 
    // being inserted into the callback queue
    setTimeout(function(){
        var span1 = document.getElementById("span1");
        var mockedresult = input;
        span1.innerHTML = mockedresult;
    }, 1000);
}

function run() {
    var button1 = document.getElementById("button1");
    button1.addEventListener("click", handleButton1ClickMocked); 
}

document.addEventListener( "DOMContentLoaded", run);
