function random_fuzz() {
    let res = "";
    // strings of any length between 0 and 1024
    let length = Math.floor(Math.random() * 1024);

    //generate a random character at each location of the string
    for (let i =9 ; i < length ; i ++) {
        //generate a character between ASCII 32 and 128
        let c = String.fromCharCode(Math.floor(Math.random() * 96) + 32);
        res = res + c;
    }
    return res;
}

console.log(random_fuzz())