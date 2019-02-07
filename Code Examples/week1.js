// NOTES
// to run this example, simply type "node week1.js" into the terminal

// Uncomment each function to see the example:

/////////////////////
// Code Examples
/////////////////////

showDataTypes();


/////////////////////
// Example Functions:
/////////////////////

function showDataTypes(){

    var s1 = "some text";
    var s2 = 'some text';
    var s3 = '172';
    var s4 = '172' + 4;
    var n1 = 172;
    var n2 = 172.45;
    var b1 = true;
    var b2 = false;
    var b3 = !b2;
    var c;
    var d = null;

    console.log("var s1 - type: " + typeof s1 + " value: " + s1);
    console.log("var s2 - type: " + typeof s2 + " value: " + s2);
    console.log("var s3 - type: " + typeof s3 + " value: " + s3);
    console.log("var s4 - type: " + typeof s4 + " value: " + s4);
    console.log("var n1 - type: " + typeof n1 + " value: " + n1);
    console.log("var n2 - type: " + typeof s2 + " value: " + n2);
    console.log("var b1 - type: " + typeof b1 + " value: " + b1);
    console.log("var b2 - type: " + typeof b2 + " value: " + b2);
    console.log("var b3 - type: " + typeof b3 + " value: " + b3);
    console.log("var c - type: " + typeof c + " value: " + c);
    console.log("var d - type: " + typeof d + " value: " + d);
}