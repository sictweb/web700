// NOTES
// to run this example, simply type "node week3.js" into the terminal

// Uncomment each function to see the example:

/////////////////////
// Code Examples
/////////////////////

//showObjectLiteralNotation();
//showClassKeyword();
//showVarLetConst();
//showExceptionHandling();
//showChainingPromises();
//showArrowFunctions();
//showLexicalThis();

/////////////////////
// Example Functions:
/////////////////////

function showObjectLiteralNotation() {

    console.log("\n-----------------------");
    console.log("Object Literal Notation");
    console.log("-----------------------\n");

    // Create an "architect" object using 
    // "Object Literal" notation

    var architect = {
        name: "Joe",
        age: 34,
        occupation: "Architect",
        setAge: function (newAge) { this.age = newAge },
        setName: function (newName) { this.name = newName }
    };

    // Create two new architect objects, using "architect"
    // as their prototype

    var architect1 = Object.create(architect);
    var architect2 = Object.create(architect);

    // Call the 'setName' method on Architect2

    architect2.setName("Mary");

    console.log("architect1.name: " + architect1.name);
    console.log("architect2.name: " + architect2.name);

}

function showClassKeyword(){

    console.log("\n-----------------------");
    console.log("Class Keyword");
    console.log("-----------------------\n");
    
    class architect{
        constructor(setName, setAge){
            this.name = setName;
            this.age = setAge;
            this.occupation = "architect";
        }

        setName(newName){ this.name = newName }
        setAge(newAge){ this.age = newAge }
        getName(){ return this.name }
        getAge(){ return this.age }
    }
    
    var architect1 = new architect("Joe", 34);
    var architect2 = new architect("Mary", 49);

    console.log("architect1.name: " + architect1.name);
    console.log("architect1.getName()): " + architect1.getName());
    console.log("architect2.getName(): " + architect2.getName());
}

function showVarLetConst() {

    console.log("\n-----------------------");
    console.log("var vs. let vs. const");
    console.log("-----------------------\n");

    for (var i = 0; i < 5; i++) {
        // ...
    }

    console.log("using var: " + typeof i);

    for (let j = 0; j < 5; j++) {
        // ...
    }

    console.log("using let: " + typeof j);

    for (const k = 0; k < 5; k++) { // TypeError: Assignment to constant variable.
        // ...
    }

    console.log("using const: " + typeof k);
}

function showExceptionHandling() {

    console.log("\n-----------------------");
    console.log("Exception Handling");
    console.log("-----------------------\n");

    // Using built in functionality

    let x = 30, y = 0;

    let z = x / y;

    if (isFinite(z)) {
        console.log("success! " + x + "/" + y + "=" + z);
    } else {
        console.log(x + " is not divisible by " + y);
    }

    // Using try, catch & finally to catch an exception

    const PI = 3.14159;

    console.log("trying to change PI!");

    try {
        PI = 99;
    } catch (ex) {
        console.log("uh oh, an error occurred: " + ex.message);
        // outputs: uh oh, an error occurred: Assignment to constant variable.
    } finally {
        console.log("always execute code in this block");
    }

    console.log("Alas, it cannot be done, PI remains: " + PI);

    // throw and catch a with a custom error

    function divide(x, y) {
        if (y == 0) {
            throw new Error("Division by Zero!");
        }
        return x / y;
    }

    let a = 3, b = 0, c;

    try {
        c = divide(a, b);
    } catch (ex) {
        console.log("uh oh, an error occurred: " + ex.message);
        c = NaN;
    }

    console.log(a + " / " + b + " = " + c);
}


function showChainingPromises() {

    console.log("\n-----------------------");
    console.log("Chaining Promises");
    console.log("-----------------------\n");

    // output "A" after a random time between 0 & 3 seconds
    function outputA() {

        var randomTime = Math.floor(Math.random() * 3000) + 1;

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("A");
                resolve("outputA() complete");
            }, randomTime);
        });
    }

    // output "B" after a random time between 0 & 3 seconds
    function outputB(msg) {
        // NOTE: msg holds the 'resolve' message from the 
        // previous function in the chain
        var randomTime = Math.floor(Math.random() * 3000) + 1;

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("B");
                resolve("outputB() complete");
                //reject("outputB() failed"); // test "rejecting"
            }, randomTime);
        });
    }

    // output "C" after a random time between 0 & 3 seconds
    function outputC(msg) {
        // NOTE: msg holds the 'resolve' message from the 
        // previous function in the chain
        var randomTime = Math.floor(Math.random() * 3000) + 1;

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("C");
                resolve("outputA() complete");
            }, randomTime);
        });
    }

    // invoke the functions in order

    outputA()
        .then(outputB)
        .then(outputC)
        .catch(function (rejectMsg) {
            // catch any errors here
            console.log(rejectMsg);
        });
}


function showArrowFunctions() {

    console.log("\n-----------------------");
    console.log("Arrow Functions");
    console.log("-----------------------\n");

    var outputMessage = function () {
        console.log("Hello Function Expression");
    };

    // is the same as:

    var outputMessageArrow = () => console.log("Hello Arrow Function");

    // invoke each function to see the result

    outputMessage();
    outputMessageArrow();
}

function showLexicalThis() {

    console.log("\n-----------------------");
    console.log("'Lexical This' with Arrow Functions");
    console.log("-----------------------\n");
    
    class architect{
        constructor(setName, setAge){
            this.name = setName;
            this.age = setAge;
            this.occupation = "architect";
        }

        setName(newName){ this.name = newName }
        setAge(newAge){ this.age = newAge }
        getName(){ return this.name }
        getAge(){ return this.age }
        outputNameDelay() {
            setTimeout(() => { console.log(this.name); }, 1000);
        };
    }
    
    var architect1 = new architect("Joe", 34);
    var architect2 = new architect("Mary", 49);

    console.log("architect1.name: " + architect1.name);
    console.log("architect1.getName()): " + architect1.getName());
    console.log("architect2.getName(): " + architect2.getName());

    architect2.outputNameDelay();
}

