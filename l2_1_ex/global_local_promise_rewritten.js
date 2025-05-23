// defining a blocking delay - never use this in practice! 
var delay = (millis) => {
  var date = new Date();
  while (new Date() - date < millis) { }
};

// demo 1 - global scope await
console.log("Demo 1");
var x = new Promise((resolve) => {
  console.log("promise x created");
  delay(2000);
  resolve("Resolved value of x");
});

x.then ( 
    (y) => { // await in global scope - blocking
        console.log("await result: " + y);
        // demo 2 - async function and await
        console.log("\nDemo 2");
        function return_z(str) {
            x.then((c) => {
                console.log(str + " inside then: " + c); 
                delay(3000);
                return 33.33;
            }).then(
                (z) => {
                    console.log("var z inside function: " + z);
                    return z;
            })
        }
        return_z("1").then ( 
            (output1) => {
                console.log("I am outside: " + output1);
            }
        )
    }
)
