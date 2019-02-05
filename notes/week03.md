---
title: WEB700 Week 3
layout: default
---


br>
<br>
<br>
<br>
<br>
<br>
# WEB222 WEEK 4
<br>
<br>
<br>
<br>
<br>
<br>


## Suggested Readings

* [Object-oriented JavaScript for beginners](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)
* [SpeakingJS, Chapter 17. Objects and Inheritance](http://speakingjs.com/es5/ch17.html)
* [SpeakingJS, Chapter 20. Dates](http://speakingjs.com/es5/ch20.html)
* [SpeakingJS, Chapter 21. Math](http://speakingjs.com/es5/ch21.html)

## Objects in JavaScript

So far we've been working with built-in `Objects` in JavaScript.  We can also create
our own in order to model complex data types in our programs.  There are a number
of ways to do this, and we'll look at a few of them now.

An `Object` in JavaScript is a *map* (also known as an *associative array* or a *dictionary*),
which is a data structure composed of a collection of *key* and *value* pairs.  We call an `Object`'s key/value pairs *properties*.  Imagine a JavaScript `Object` as a dynamic "bag" of properties, a
property-bag.  Each *key* is a unique `String`, and  an `Object` can only contain a given *key* once.  An `Object` can have any number of *properties*, and they can be added and removed at runtime.

Much like we did with an `Array` or `RegExp`, we can create instances of `Objects`
via literals.  An `Object` literal always starts with `{` and ends with `}`.  In between these curly
braces we can optionally include a list of any properties (comma separated) we want to attach to this `Object` instance. These properties are written using a standard `key: value` style, with the property's name `String` coming first, followed by a `:`, then its value.  The value can be any JavaScript value, including functions or other `Objects`.

Here are a few examples:

```js
// an empty Object, with no properties
var o = {};                       

// a `person` Object, with one property, `name`
var person = { name: 'Tim Wu' };  

// a `campus` Object, with `name` as well as co-ordinates (`lat`, `lng`)
var campus = {
    name: 'Seneca@York',
    lat: 43.7714,
    lng: -79.4988
};

// a `menu` Object, which contains lists of menu items per meal
var menu = {
    breakfast: ['eggs', 'toast', 'banana', 'coffee'],
    lunch: ['salad', 'chicken', 'apple', 'milk'],
    dinner: ['salmon', 'rice', 'green beans']
};
```

`Object` property names are `String`s, and we can refer to them either via the *dot operator* `.name`,
or using the *bracket operator* `['name']` (similar to indexing in an `Array`):

```js
var person = { name: 'Tim Wu' };

// get the value of the `name` property using the . operator
console.log(person.name);

// get the value of the `name` property using the [] operator
console.log(person['name']);
```

> Why would you choose the dot operator over the bracket operator, or vice versa?  The dot operator is probably more commonly used; however, the bracket operator is useful in a number of scenarios.  First, if you need to use a reserved JavaScript keyword for your property key, you'll need to refer to it as a string (e.g., `obj['for']`).  Second, it's sometimes useful to be able to pass a variable in order to lookup a property value for a name that will be different at runtime.  For example, if you are using usernames as keys, you might do `users[currentUsername]`, where `currentUsername` is a variable holding a `String` for the logged in user.

`Object` literals allow us to define an initial set of properties on an `Object`, but we aren't
limited to that set.  We can easily add new ones:

```js
var data = {};

data.score = 17;
data.level = 3;
data.health = '***';
```

Here we define an empty `Object`, but then add new properties.  Because we can add properties
after an `Object` is created, we have to deal with a property not existing.  If we try to access
a property that does not exist on an `Object`, there won't be an error.  Instead, we will get back `undefined`:

```js
var currentScore = data.score;    // `score` exists on `data`, and we get back the value `17`
var inventory = data.inventory;   // `inventory` does not exist on `data`, so we get back `undefined`
```

Because properties may or may not exist at runtime, it's important to always check for a value
before trying to use it.  We could rewrite the above to first check if `data` has an `inventory`
property:

```js
if(data.inventory) {
    // `data` has a value for `inventory`, use data.inventory here...
} else {
    // there is no `inventory` on `data`, do something else...
}
```

## Using Objects: dealing with optional parameters

A very common pattern in JavaScript programs that uses this concept is optional argument
passing to functions.  Instead of using an unknown number of `arguments` for a function, we
often use an `options` `Object`, which may contain values to be used in the function.  Consider
the case of starting a game and sometimes passing existing user data:

```js
function initGame(options) {
    // Make sure `options` exists, and use an empty `Object` instead if it's missing.
    // If we don't do this, we'll get an error if we try to do `options.score`, since
    // we can't lookup the `score` property on `undefined`.
    options = options || {};

    // If the user already has a score, use that, otherwise default to 0
    var score = options.score || 0;
    // If the user is already on a level, use that, otherwise default to 1
    var level = options.level || 1;
    // If the user has collected an items in her inventory, use that, otherwise an empty Array
    var inventory = options.inventory || [];

    // Begin the game, passing the values we have determined above
    playGame(score, level, inventory);
}

// Define our options: we have a score and level, but no inventory 
var options = {
    score: 25;
    level: 2
};
startGame(options);
```

In the code above, we have an `options` `Object` that defines some, but not all of the 
properties our `initGame` function might use.  We wrote `initGame` using a single argument
so that it was easier to call: we didn't need to worry about the order or number of arguments,
and could instead just define an `Object` with all of the properties we had.  The `initGame`
function examined the `options` at runtime to see which properties existed, and which were
`undefined` and needed a default value instead.  Recall that we can use the *logical OR* (`||`)
operator to choose between two values at runtime.

## Updating, Clearing, and Removing properties

We've seen that properties can be defined when declared as part of a literal and
added later via the `.` or `[]` operators.  We can also update or remove values
after they are created:

```js
var o = {};

// Add a name property
o.name = 'Tim Wu';

// Update the name property to a new value, removing the old one.
o.name = 'Mr. Timothy Wu';
```

An `Object`'s property keys are unique, and setting a value for `o.name` more than once
doesn't add more properties--it overwrites the value already stored in the existing property.
We can also *clear* (remove the value but not the key) or *delete* (remove the entire property
from the object, key and value) things from an `Object`.

```js
var o = {};

// Add a `height` property
o.height = '35 inches';

// Add an owner ID property
o.owner = '012341341';

// Clear the value of `height`. We leave the `height` key, but get rid of the '35 inches' value
o.height = null;

// Completely remove the owner property from the object (both the key and its value)
delete o.owner;
```

> Why would you choose to assign `null` vs. use `delete`?  Often we want to get rid of a key's value, but will use the key again in the future (e.g., add a new value).  In such cases we just *null the value* by assigning the key a value of `null`.  If we know that we'll never use this key again, and we don't want to retain it on the `Object`, we can instead completely remove the property (key and value) with `delete`.  You'll see both used.  For the most part, setting a key's value to `null` is probably what you want.

## Using Objects: creating sets to track arbitrary lists

Another common use of `Object`s, and their unique property keys, is to keep track of a sets, for example
to count or keep track of an unknown number of items.  Consider the following program, which tracks how many times each
character appears within a `String`.  The code uses the `[]` operator to allow for the keys to be created
and accessed via a variable (`char`).  Without an `Object` we would have to hard-code variables for each
separate letter.

```js
// An empty `Object`, which we'll populate with keys (letters) and values (counts)
var characterCounts = {};

var str = "The quick brown fox jumped over the lazy dog.";
var char;
var count;

// Loop through str, visiting each character
for(var i = 0; i < str.length; i++) {
    char = str[i];
    // Get the current count for this character, or use 0 if we haven't seen it before
    count = characterCounts[char] || 0;
    // Increase the count by 1, and store it in our object
    characterCounts[char] = count + 1;
}

console.log(characterCounts);
/* Our characterCounts Object now looks like this, and there were 8 spaces, 2 'h's, etc:
{ T: 1,
  h: 2,
  e: 4,
  ' ': 8,
  q: 1,
  u: 2,
  i: 1,
  c: 1,
  k: 1,
  b: 1,
  r: 2,
  o: 4,
  w: 1,
  n: 1,
  f: 1,
  x: 1,
  j: 1,
  m: 1,
  p: 1,
  d: 2,
  v: 1,
  t: 1,
  l: 1,
  a: 1,
  z: 1,
  y: 1,
  g: 1,
  '.': 1 }
*/
```

## Complex Property Types: `Object`, `Function`

We said earlier that `Object` properties can be any valid JavaScript type.  That includes
`Number`, `String`, `Boolean`, etc., also `Object` and `Function`.  A property may define
a complex `Object` of its own:

```js
var part = {
    id: 5,
    info: {
        name: 'inner gasket',
        shelf: 56713,
        ref: [5618, 5693]
    }
};
```

Here we define a `part`, which has an id (`part.id`) as well as a complex property named `info`,
which is itself an `Object`.  We access properties deep in an `Object` the same way as a simple
property, for example: `part.info.ref.length` means: get the `length` of the `ref` array on the
`info` property of the `part` `Object`.  An `Object`'s properties can be `Object`s many levels
deep, and we use the `.` or `[]` operators to access these child properties.

An `Object` property can also be a function.  We call these functions *methods*.  A *method* has
access to other properties on the `Object` via the `this` keyword, which refers to the current
`Object` instance itself.  Let's add a `toString()` method to our `part` `Object` above:

```js
var part = {
    id: 5,
    info: {
        name: 'inner gasket',
        shelf: 56713,
        ref: [5618, 5693]
    },
    toString: function() {
        return this.info.name + ' (#' + this.id + ')';
    }
};

console.log(part.toString()); // prints "inner gasket (#5)" to the console.
```

The `toString` property is just like any other key we've added previously, except its value
is an *anonymous function*.  Just as we previously bound function expressions to variables,
here a function expression is bound to an `Object`'s property.  When we write `part.toString` we
are accessing the function stored at this key, and by adding the `()` operator, we can invoke it:
`part.toString()` says *get the function stored at part.toString and call it*.  Our function 
accesses other properties on the `part` `Object` by using `this.*` instead of `part.*`.  When the
function is run, `this` will be the same as `part` (i.e., a reference to *this* `Object` instance).

> The [`this` keyword in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) is used in different contexts, and has a different meaning depending on where and how it is used.  We will return to `this` and its various meanings throughout the course. 

## Constructor Functions

Sometimes we need to create lots of `Objects` that have the same layout.  For example, we might
be defining lots of users in an application.  All of our user `Objects` need to work the same way
so that we can pass them around within our program, to and from functions.  Every `user` needs
to have the same set of properties and methods, so we decide to write a factory function that can
build our `user` `Objects` for us based on some data.  We call such functions a `Constructor`:

```js
// Define a Constructor function, `User`
function User(id, name) {
    // Attach the id to an Object referenced by `this`
    this.id = id;
    // Attach the name to an Object referenced by `this`
    this.name = name;
}

// Create a new instance of a User (Object)
var user1 = new User(1, 'Sam Smith');
// Create another new instance of a User (Object)
var user2 = new User(2, 'Joan Winston');
```

Notice that unlike all previous functions we've defined, the `User` function starts with a
capital `U` instead of a lower case `u`.  We use this naming convention to indicate that
`User` is special: a constructor function.  A constructor function needs to be called with
the extra `new` keyword in front of it.  When we say `new User(...)` we are saying,
*create a new object, and pass it along to User so it can attach various things to it*.

A constructor can also add methods to an object via `this`:

```js
// Define a Constructor function, `User`
function User(id, name) {
    this.id = id;
    this.name = name;

    // Add a toString method
    this.toString = function () {
        return this.name + ' (#' + this.id + ')';
    };
}

// Create a new instance of a User (Object)
var user1 = new User(1, 'Sam Smith');
console.log(user1.toString()); // 'Sam Smith (#1)
```

In the code above, we're creating a new function every time we create a new User.  As we
start to create lots of users, we'll also be creating lots of duplicate functions.  This will
cause our program to use more and more resources (memory), which can lead to issues as the
program scales.

## Object Prototypes

What we would really like is a way to separate the parts of a User that are different for each
user (the data: `id`, `name`), but somehow share the parts that are the same (the methods: `toString`).
JavaScript gives us a way to accomplish this via an `Object`'s `prototype`.

JavaScript is unique among programming languages in the way it accomplishes sharing
between `Object`s.  All object-oriented languages provide some mechanism for us to share or
inherit things like methods in a type hierarchy.  For example, C++ and Java use classes, which
can inherit from one another to define methods on parents vs. children.
JavaScript uses [*prototypal inheritance*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) and
a special property called `prototype`.

In JavaScript, we always talk about `Object`s, because every object is an instance of `Object`.
Notice the capital `O` in `Object`, which should give you an indication of what it is: a constructor
function.  In a previous week we said that an `Array` is an `Object`, and a `RegExp` is an `Object`.
This is true because of JavaScript's type system, where almost everything is *chained* to `Object`.

JavaScript objects always have a prototype, which is an object to which their `.proptotype` property
refers.  At runtime, when we refer to an object's property, JavaScript first looks for that property
on the object itself.  If it doesn't find it, the prototype object is visited, and the same search is
done.  The process continues until the end of the prototype chain is reached at `Object`.

Let's rewrite our `User` so that the `toString` method is moved from each user instance to the
prototype of all user instances:

```js
// Define a Constructor function, `User`
function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.toString = function () {
    return this.name + ' (#' + this.id + ')';
};
```

This code looks very similar to what we originally wrote.  Notice that we've moved
`toString` out of the `User` function, and instead attached it to `User.prototype`.
By doing so, we'll only ever need a single copy of this function: every `new User()` instance
we create will also include a reference to a prototype object, which contains our function.
When we use `user1.toString()`, JavaScript will do something like this:

1. does `user1` have a property called `toString`?  No, we didn't add one in the constructor.
2. does `user1.prototype` have a property called `toString`?  Yes, use that.

What if we'd written `user1.something()`?

1. does `user1` have a property called `something`?  No, we didn't add one in the constructor.
2. does `user1.prototype` have a property called `something`?  No.
3. does `user1.prototype.prototype` (i.e., `Object`) have a property called `something`? No.
4. there are no more objects in the prototype chain, throw an error

```js
user1.something();
// TypeError: user1.something is not a function
```

Whenever a method is used on a prototype, we still pass the current instance so we can get access
to its data.  Notice in our `User.prototype.toString` method, we still referred to `this`, which
will be the instance of our user, and give us access to the correct data (`name`, `id`).

> There are times when defining a method inside a constructor makes sense vs. putting it on the prototype.  The prototype will only have access to *public properties* of an object instance, meaning things you explicitly add to `this` and expose to the rest of your program.  Sometimes we want to define some data, but *hide* it from the rest of a program, so it can't be changed after it gets created.  Consider the following example, which uses a *closure* to retain access to a variable in the scope of the constructor without exposing it:

```js
function User(id, name) {
    this.id = id;
    this.name = name;

    // private variable within User function, not attached to `this`.
    // Normally this variable would go out of scope after User() completed;
    // however, we will use a closure function below to capture this scope.
    var createdAt = Date.now();

    // Return the number of ms this player has been playing
    this.playerAgeMS = function() {
        var currentTime = Date.now();

        // Access `createdAt` in the parent scope, which we retain via this closure function.
        // Calculate how many ms between createdAt and the current time.
        return (currentTime - createdAt) + " ms";
    };
}

var user = new User(1, 'Tom');
// We can access the total time this player has existed, but not modify it.
console.log(user.playerAgeMS())
// displays "4183 ms"
console.log(user.playerAgeMS())
// displays "5287 ms"
```

## `Object.create()`

We can also define an object's prototype when we create it by using the `Object.create()` method.
With `Object.create()`, we can pass an Object to use as the `prototype` for our new object.
Consider the case where we want to define different characters in a game, some of which are
human, and some not.

```js
var person = {
    isHuman: true,
    power: 5
};

var animal = {
    isHuman: false,
    power: 3
};

var robot = {
    isHuman: false,
    power: 10
}

// Create a list of characters for the game as an Array, each of a different type
var characters = [
    Object.create(person),
    Object.create(person),
    Object.create(robot),
    Object.create(animal)
];

function calculateHitDamage(character) {
    // Double human player's hit power
    if(character.isHuman) {
        return character.power * 2;
    } else {
        return character.power;
    }
}
```

> JavaScript version note: in newer versions of JavaScript, a new [`class` keyword](http://exploringjs.com/es6/ch_classes.html) has been implemented, allowing for a somewhat more familiar style of Object and Class definitions to be done.  Underneath, prototype inheritance is still used, but this adds some new syntax.  

## Practice Problem: a Morse Code translator

[Morse code](https://en.wikipedia.org/wiki/Morse_code) is a system of encoding developed
in the 1800s that allowed transmission of textual messages over signal systems that only
supported on/off (1 and 0) notations.

Complete the program below as specified.  Your program should be able to translate messages like
`-- --- .-. ... ./-.-. --- -.. .` into `MORSE CODE` and vice versa.  Use what you learned
above about `Object`s, and also some of the built-in `Object`s we've studied, in particular
`RegExp` and `String`.

Use the following [limited set of morse code](https://morsecode.scphillips.com/morse2.html) to use in this exercise.  You could expand your program to handle more complex messages later if you want:

|Letter | Morse |
|-------|-------|
|A|`.-`|
|B|`-...`|
|C|`-.-.`|
|D|`-..`|
|E|`.`|
|F|`..-.`|
|G|`--.`|
|H|`....`|
|I|`..`|
|J|`.---`|
|K|`-.-`|
|L|`.-..`|
|M|`--`|
|N|`-.`|
|O|`---`|
|P|`.--.`|
|Q|`--.-`|
|R|`.-.`|
|S|`...`|
|T|`-`|
|U|`..-`|
|V|`...-`|
|W|`.--`|
|X|`-..-`|
|Y|`-.--`|
|Z|`--..`|
|*space*|`/`|

NOTE: letters are separated by a single space (`' '`) within a word, and words are separated with a `/`.
For example, the words `MORSE CODE` would translate to `-- --- .-. ... ./-.-. --- -.. .`

```js
// Object to provide lookup of morse code (value) for a given letter (key).
var alpha = {
    // define the mapping here as a literal
};

// Object to provide lookup of letter (value) for a given morse code (key).
var morse = {};
// Hint: use the [] operator to specify these special key values rather than a literal.

// Return `true` if all characters are morse code.  Use a RegExp. 
function isMorse(characters) {

}

// Return `true` if all characters are part of the alphabet defined in `alpha`.  Use a RegExp.
// Bonus: can you rewrite it using `Object.keys()` and your `alpha` Object instead?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys 
function isAlpha(characters) {
    
}

// Given an alphabet message, convert and return in morse code.  Use your morse and/or alpha object.
// Return undefined if text is not alpha.
function textToMorse(text) {

}

// Given a morse code message, convert and return in text.  Use your morse and/or alpha object.
// Return undefined if morse is not proper code.
function morseToText(morse) {

}


// Constructor function that takes a `message` (String), which can be either morse or alpha.
// Use your functions above to decide how to store a value for `any` on `this`  
function Message(any) {

}

// Return the message as morse code, converting if necessary
Message.prototype.toMorse = function() {

};

// Return the message as alpha characters, converting if necessary
Message.prototype.toAlpha = function() {

};


var msg1 = new Message('--- -... .--- . -.-. - .../.. -./.--- .- ...- .- ... -.-. .-. .. .--. -/.- .-. ./...- . .-. -.--/.--. --- .-- . .-. ..-. ..- .-..');
console.log(msg1.toAlpha());
console.log(msg1.toMorse());

var msg2 = new Message('I am learning how to use Objects in JavaScript');
console.log(msg2.toMorse());
console.log(msg2.toAlpha());
```

You can download the [code above](example.js) as well as a [possible solution](solution.js).

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


## WEB700 Week 3 Notes

<br>

### Object-Oriented JavaScript Review

Now that we have our development environment all set up and are comfortable making a simple web server (with [Node.js](https://nodejs.org/en/) & [Express.js](http://expressjs.com/)), we can start making some real progress with our web applications. However, before we can dive into the deeper topics, we need to review some of the advanced Object-oriented JavaScript topics that we first discussed in WEB222.

<br>

### Creating Objects (Object Literal)

The most simple and straight-forward way to create an object in JavaScript is to use "Object Literal Notation" (sometimes referred to as "object initializer" notation). The syntax for creating an object using this notation is as follows:

```javascript
var obj = { property_1:   value_1,   
            property_2:   value_2,   
            // ...,
            "property n": value_n }; // properties can also be defined as a string` 
```

So, if we wanted to create an object with the following properties:

*   **name** (string)
*   **age** (number)
*   **occupation** (string)

and methods...

*   **setAge** (simple "setter" to set a new value for the "age" property)
*   **setName** (simple "setter" to set a new value for the "name" property)

using "Object Literal" notation, we would write the code:


```javascript
var architect = {name: "Joe",
                  age: 34,
                  occupation: "Architect",
                  setAge: function(newAge){this.age = newAge},
                  setName: function(newName){this.name = newName}
                 };
``` 

which creates a simple "architect" objet. Recall that we must use the **"this"** keyword whenever we refer to one of the properties of the object inside one of it's methods. This is due to the fact that when a method is executed, "age" (for example) might already exist in the global scope, or within the scope of the function as a local variable. To be absolutely sure that we are referring to the correct "age" property of the current object, we must refer to the "execution context" - ie: the object that is actually making a call to this method. We know the object has an "age" property, so in order to be more specific about _which_ age variable that we want to change, we leverage the keyword **this**. "this" will refer to the "execution context", ie: the object that called the function! So, **"this.age"** can be read literally as **"the age property on this object"**, which is exactly the property that we wish to edit.

Now, if we want to create more objects with these same properties & methods, we can leverage JavaScripts native [Object.create()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method:

```javascript
Object.create(proto[, propertiesObject])
```

This method will create a brand new object and use an existing object as it's **prototype** (explained further down). In practice, this will give the new object all of the properties, methods and values of the existing object while still being it's own, new instance. For example, if we wish to create two new _architect_ objects, we can simply call **Object.create()** with our previous **architect** object as the first parameter:

```javascript
var architect1 = Object.create(architect);
var architect2 = Object.create(architect);
```

Now both **architect1** and **architect2** are new objects that have the same properties, methods and values as the original **architect** object. However, because they are each their own instance, we can change their properties and manipulate their data as single entities:

```javascript
architect2.setName("Mary");

console.log(architect1.name); // "Joe"
console.log(architect2.name); // "Mary"
``` 

<br>

### Creating Objects (Function Constructor)

One of the more advanced & powerful ways of creating complex objects in JavaScript is by using **"Function Constructors"** and the ["new" operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new). Essentially, we can specify how instances of each "new" object will be created by writing a function that follows a specific pattern - for example:

```javascript
// Declare a function to initialize our "new" object with
// properties (ie: "objectProperty")
function myObjectInitializer(initialVal){
  this.objectProperty = initialVal;
}

// add methods (ie: "objectMethod") to the myObjectInitializer function prototype
myObjectInitializer.prototype.objectMethod = function(){ return this.objectProperty };

// create a new object and initialize the objectProperty with the value "Hello"
var myObject = new myObjectInitializer("Hello");

// execute the "objectMethod" on the new object
console.log(myObject.objectMethod()); // "Hello"
```

In the above example, we are using a function to define all of the properties of the object (later created using the "new" operator), in the same way that we declare properties in a "class" in C++. These properties (declared using the "this" keyword) will get added to the new object once the "new" operator is used to create a new "instance". Additionally, because we are using a function to define the new object, we can leverage the function properties to initialize the new object with some values - in this case, we set "objectProperty" to "Hello".

We can define the methods of the new object in either the function (using this.functionName = function(){};) or on the prototype of the function (as in the above example). It is generally preferred to add the methods to the function prototype, since all new objects created using this function constructor (ie: myObjectInitializer) will have access to it's prototype once they are created (using "new"). A second added benefit is if we were to change this function later in the code, all of our objects would be updated to use the new code (since they're all referring to the method in the prototype).

To illustrate this concept, why don’t we recreate our “architect” object using this method:

```javascript
function architect(setName, setAge){
  this.name = setName;
  this.age = setAge;
  this.occupation = "architect";
}

architect.prototype.setName = function(newName){this.name = newName};
architect.prototype.setAge = function(newAge){this.age = newAge};
architect.prototype.getName = function(){return this.name};
architect.prototype.getAge = function(){return this.age};

var architect1 = new architect("Joe", 34);
var architect2 = new architect("Mary", 49);

console.log(architect1.name); // "Joe"

console.log(architect1.getName()); // "Joe"
console.log(architect2.getName()); // "Mary"
```

A few key things to note when using the above method to create objects:

*   New "architect" objects (ie: "architect1" & "architect2") have their own **name**, **age**, & **occupation** properties
*   New "architect" objects do not have any methods directly, however they all refer to the same prototype (architect.prototype) which contains all of the methods. These methods can work with the correct data for each new architect object, because they are utilizing the "this" keyword.

<br>

### "this" keyword

As we have seen, when we create objects in JavaScript, we make regular use of the "this" keyword. This is an important concept in JavaScript, so before we move on to Prototypal Inheritance, let's just do a quick review:


**"this" always holds a reference to the "context" of the function (ie: the object actually invoking the function).**


So, when we declare an object with methods, we always make sure that each method refers to the properties in the object with the "this" keyword. This is because we wish to be specific about which property that we wish to reference and "this" always points to the object invoking the method. So, the **architect1.setName()** method will always work with the **architect1.name** property and similarly, the **architect2.setName()** method will always work with the architect2.name

While "this" allows us to be specific with which **properties** that we refer to in our **methods**, it can lead to some confusing scenarios. For example, what if we added a new "outputNameDelay()" method to our architect object that writes the architect's name to the console after 1 second (1000 milliseconds):

```javascript
// ...
architect.prototype.outputNameDelay = function(){
  setTimeout(function(){
    console.log(this.name);
  },1000);
}
// ...
architect2.outputNameDelay(); // outputs undefined
``` 

Everything looks correct and we have made proper use of the "this", however because the setTimeout function is not executed as a method of our architect object, we end up with "undefined" being output to the console. There are a number of fixes for this issue (most noteworthy is the new "arrow function" syntax - discussed below), however one common way is to introduce a local variable (often named "that") into the current scope that **holds a reference to "this"**

```javascript
// ...
architect.prototype.outputNameDelay = function(){
    var that = this;
    setTimeout(function(){
    console.log(that.name);
    },1000);
};
// ...
architect2.outputNameDelay(); // outputs "Mary"
```
    
Now, we aren't using the "this" keyword from within the setTimeout() function, but rather "that" from our outputNameDelay function and everything works as it should! (ie, "that" points to architect2, since it was the architect2 that invoked the outputNameDelay method).

<br>

### Prototypal Inheritance

Prototypal Inheritance is a very interesting and complex topic in JavaScript. There's a lot to learn about how it is implemented in the language, however for our purposes we will primarily concentrate on how it impacts our objects / object creation when using the Function Constructor notation. For a full treatment of Objects & Prototypal inheritence, see: [Introducing JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) from MDN's "Learn web development" series.

So far, we have seen how to create our "architect" object using this notation. We actually made use of the "Prototype" property of the "architect" function to define the methods of our new architect objects (see above). Essentially, what is happening here is that when we refer to a Constructor Function's prototype (ie "architect.prototype"), we are really referring to another, separate object that all future instances of "architect" (ie: "architect1" and "architect2") will reference via their own internal property "\_\_proto\_\_" (or "\[\[prototype\]\]").

So, why is this so important for us? Well, when you make a call to a method or reference a property on any object, the JavaScript runtime will actually check for their existence on the object's prototype as well as the object itself. Therefore, it can be said that "architect1" and "architect2" **inherit** getName(), setName(), getAge() and setAge() from their prototype and any future properties or methods declared on the prototype will be automatically picked up by each new / existing instance! This is easy to verify using the built in Object.getPrototypeof() function, for example:

```javascript
// ...
console.log(architect2); // outputs: { name: 'Mary', age: 49, occupation: 'architect' }

console.log(Object.getPrototypeOf(architect2)); // outputs: { setName: [Function], 
                                                //            setAge: [Function],
                                                //            getName: [Function],
                                                //            getAge: [Function] }
// ...
```

From the above code, it is clear that the "architect2" instance does not actually have it's **own** methods, but we can invoke them on the architect2 object and the JavaScript runtime will check its prototype for their existence and execute them as though they were. This actually happens often in JavaScript and is the reason that when we create a String (for example), we have access to properties like .length or methods like .split(), .slice(), .substr(), etc. (see: [String.prototype on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype)). We didn't have to specify each of those properties / methods, however we automatically **inherited them** from the global String Object's prototype.

To see why this concept is so powerful, why don't we add a new method to the architect prototype **after** we create our architect1 & architect2 instances:

```javascript
function architect(setName, setAge){
    this.name = setName;
    this.age = setAge;
    this.occupation = "architect";
}

architect.prototype.setName = function(newName){this.name = newName},
architect.prototype.setAge = function(newAge){this.age = newAge},
architect.prototype.getName = function(){return this.name},
architect.prototype.getAge = function(){return this.age}

var architect1 = new architect("Joe", 34);
var architect2 = new architect("Mary", 49);

architect.prototype.newMethod = function(){ 
    return "Hello: " + this.name; 
};

console.log(architect2.newMethod()); // outputs: "Hello: Mary"
``` 

As you can see from above, we are able to add a new method (newMethod) to the architect prototype at any time and because all architect instances (ie: architect2) use that prototype, they automatically get access to the method!

<br>

### Advanced JavaScript / ES6 Features

So far, we have learned quite a bit about JavaScript; from how it handles simple and complex custom / built-in Objects to design patterns like closures, modules, callback functions, etc. However, for us to properly understand some of the examples in the upcoming weeks, we need to discuss a few advanced techniques as well as new syntax / methods from the new ES6 (ECMAScript 6) standard. An important thing to note however, is that **ES6** is **still being implemented** across desktop & mobile browsers as well as JavaScript runtimes. Most of what we will discuss will be understood by modern browsers and 100% of the topics below will be understood by Node.js. However, it is a good idea to reference the following [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/) if you are unsure whether your target browser will fully understand the feature that you wish to use.

<br>

### "var" vs "let" vs "const"

As we know, JavaScript is a **dynamically typed language** and we declare our variables using the keyword **var**. However, when we use the "var" keyword, we're actually creating our variables on the **function scope** (effectively allowing access to the variable outside the scope in which it was declared). Fortunately ES6 has introduced the [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) & [const](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const) keywords to solve this problem. See the below table for a comparison of **var**,**let** & **const**

**[  var  ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/var)**

*   Declares a variable, optionally initializing it to a value.
*   The scope of a variable declared with var is its current execution context, which is either the enclosing function or, for variables declared outside any function, global.

    ```javascript
    for(var i =0; i < 5; i++){
      // ...
    }
    
    console.log(i); // 5
    ``` 

**[  let  ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)**

*   Declares a block scope local variable, optionally initializing it to a value.
*   The scope of a variable declared with "let" is limited to the block, statement, or expression on which it is used.

    ```javascript
    for(let j=0; j < 5; j++){
      // ...
    }
    
    console.log(j); // ReferenceError: j is not defined
    ``` 


**[  const  ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const)**

*   Declares an immutable block scope local variable, optionally initializing it to a value.
*   The scope of a variable declared with "const" is limited to the block, statement, or expression on which it is used. However, the value of a variable declared with "const" cannot change through re-assignment and cannot be redeclared.

    ```javascript
    for(const k=0; k < 5; k++){ // TypeError: Assignment to constant variable.
      // ...
    }
    
    console.log(k);
    ```

As we can see from the above examples, **let** & **const** behave more like variable declarations in C / C++. While still being dynamically typed, they will respect the scope in which they are declared and cannot be referenced before they are declared.

<br>

### Creating Objects ("class" keyword)

ES6 has introduced some "syntax sugar" to allow us to create objects in a more intuitive, familiar way using the "class" keyword. It's important to note however, that we are still using prototypal inheritance and the process of creating objects is still the same (see "Creating Objects (Function Constructor)" above). If we take the example from "Creating Objects (Function Constructor)" and use the "class" keyword instead, we can use the following code:

```javascript
class architect{
  
  constructor(setName, setAge){
      this.name = setName;
      this.age = setAge;
      this.occupation = "architect";
  }

  setName(newName){this.name = newName}

  setAge(newAge){this.age = newAge}

  getName(){return this.name;}

  getAge(){return this.age;}

}

var architect1 = new architect("Joe", 34);
var architect2 = new architect("Mary", 49);

console.log(architect1.name); // "Joe"

console.log(architect1.getName()); // "Joe"
console.log(architect2.getName()); // "Mary"
```

Notice how we specify a "constructor" function to take initialization parameters, as well as specify all of the methods within the "class" block. We are still creating objects using the method illustrated in the "Function Constructor" pattern (above), however this syntax is much more intuitive. Additionally, we can leverage the ["extends"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) and ["super"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keywords to create objects which inherit from other objects easily (for a detailed example, see [this great article from medium.com](https://medium.com/ecmascript-2015/es6-classes-and-inheritance-607804080906)).

<br>

### Error / Exception handling

One of the most important aspects of writing any program is elegantly handling errors. It is important to never let your program suddenly crash or enter an unknown state due to an unanticipated error. Up until now we have seen numerous mechanisms in JavaScript to handle certain types of logical errors; for example the global [isNaN()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/isNaN) function is a way to elegantly respond to a situation in which a number was expected, but not returned:

```javascript
let x = "twenty";

let y = parseInt(x);

if(isNaN(y)){
    console.log("x cannot be converted to a number");
}else{
    console.log("success! the numeric value of x is: " + y);
}
```    

Similarly, we can use the global [isFinite()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/isFinite) function to handle a situation where division by zero has occurred:

```javascript
let x = 30, y = 0;

let z = x / y;

if(isFinite(z)){
  console.log("success! " + x + "/" + y + "=" + z);
}else{
  console.log(x + " is not divisible by " + y);
}
```

However, while these functions are extremely useful for handling logical errors, they are not sophisticated enough to handle a situation that would completely break your code and cause the program to fail. For example, consider the following example that uses our new "const" keyword:

```javascript
const PI = 3.14159;

console.log("trying to change PI!");

PI = 99;

console.log("Haha! PI is now: " + PI );
```

Here, we are trying to change the value of a constant: PI. If we try to run this short program in Node.js, the program will crash before we get a chance to see the string "Haha! PI is now: 99", or even "Haha! PI is now: 3.14159". There is no elegant recovery and we do not get to exit the program gracefully. This can be a huge problem if, for example we were working with a live connection to a service and an unexpected error occurred. Our program would crash and we would not be able to respond to the error by alerting the user and properly closing the connection. Fortunately, before our program crashes in such a way, Node.js will **"throw"** an **["Error"](https://nodejs.org/dist/latest-v6.x/docs/api/errors.html#errors_class_error)** object that we can intercept using the **["try...catch"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)** statement:

```javascript
const PI = 3.14159;

console.log("trying to change PI!");

try{
  PI = 99;
}catch(ex){
  console.log("uh oh, an error occurred!");
}

console.log("Alas, it cannot be done, PI remains: " + PI);
```

If we execute the above code in Node.js we will find that our program doesn't crash and that our string: "Alas, it cannot be done, PI remains: 3.14159" gets correctly logged to the terminal! Additionally, we can execute a specific block of code right when the error is encountered; in this case we output "uh oh, an error occurred!". This is not very useful to help us debug the error, but it better than having the program crash and at least we know that an error did indeed occur. If we wish to obtain additional information about the error, we can make use of some of the properties / methods of the **[Error](https://nodejs.org/dist/latest-v6.x/docs/api/errors.html#errors_class_error)** object that was thrown as an exception and caught in our "catch" block. For example, we can alter the code to use the "message" property of the caught exception (ex) to display a more helpful error:

```javascript
const PI = 3.14159;

console.log("trying to change PI!");

try{
  PI = 99;
}catch(ex){
  console.log("uh oh, an error occurred: " + ex.message); 
  // outputs: uh oh, an error occurred: Assignment to constant variable.
}

console.log("Alas, it cannot be done, PI remains: " + PI);
```

By utilizing properties such as [Error.message](https://nodejs.org/dist/latest-v6.x/docs/api/errors.html#errors_error_message) & [Error.stack](https://nodejs.org/dist/latest-v6.x/docs/api/errors.html#errors_error_stack), we can gain further insight to exactly what went wrong and we can either refactor our code to remedy the error, or acknowledge that the error will happen and handle it gracefully.

Lastly, if we have some code that we would like to execute regardless of whether or not the code in our "try" block is successful, we can use a "finally" block:

```javascript
const PI = 3.14159;

console.log("trying to change PI!");

try{
    PI = 99;
}catch(ex){
    console.log("uh oh, an error occurred: " + ex.message); 
    // outputs: uh oh, an error occurred: Assignment to constant variable.
}finally{
    console.log("always execute code in this block");
}

console.log("Alas, it cannot be done, PI remains: " + PI);
```    

<br>

#### Throwing Errors

Now that we know how to correctly handle errors that have been thrown by the Node.js runtime environment or by other code / modules included in our solutions, why don't we try throwing our **own exceptions**? This is very straightforward and only requires the use of the **["throw"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)** keyword and (typically) an **[Error](https://nodejs.org/dist/latest-v6.x/docs/api/errors.html#errors_class_error)** Object:

```javascript
function divide(x,y){
    if(y == 0){
    throw new Error("Division by Zero!");
    }
    return x / y;
}

let a = 3, b = 0, c;

try{
    c = divide(a,b);
}catch(ex){
    console.log("uh oh, an error occurred: " + ex.message); 
    // outputs: uh oh, an error occurred: Division by Zero!
    c = NaN;
}

console.log(a + " / " + b + " = " + c); // 3 / 0 = NaN
```

Notice how the code below the "throw" statement does not get executed, and the flow of execution goes directly into the catch block. This prevents the error from propagating and ensures that it is handled immediately. As you can see, we can throw a new error whenever we detect that an error _may_ occur anywhere in our code. In the above example, we check if our second parameter (y) is zero (0) and rather than trying to do the division, we immediately throw a custom error with the message "Division by Zero!". If the function call exists in a "try" block ( as above ), the execution of the code will immediately continue in the "catch" block and we mitigate the error by setting "c" to NaN.

<br>

### Promises

So far, while learning JavaScript, we have seen a number of circumstances where ["asynchronous"](https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous) code is used. That is, once the code has been invoked, it does not block the main thread of execution while it's working. Once it's complete, an event is triggered (at an undetermined time) and we can write code to work with the result of the asynchronous operation. A classic example of this is a simple AJAX request using the [HXMLHttpRequest](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) object from the client side (web browser). Once we [send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) the request, code is executed that works outside of our main sequence of execution to establish the connection, make a request, etc. If we assign a function to the value of the XMLHttpRequest object's [onreadystatechange](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange) property, we can execute some code at a later, undetermined time (maybe the request is to a particularly slow server) and handle the updated status of the request. The important thing to understand is that we can still execute code in a sequential fashion **after** we initiate the request!

To see this in action, we can invoke the global [setTimeout](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args) function (as we did in our architect.prototype.outputNameDelay function) to create a situation in which the execution of code takes some time to complete, ie:


```javascript
// output "A" after a random time between 0 & 3 seconds
function outputA(){
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    setTimeout(function(){
        console.log("A");
    },randomTime);
}

// output "B" after a random time between 0 & 3 seconds
function outputB(){
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    setTimeout(function(){
        console.log("B");
    },randomTime);
}

// output "C" after a random time between 0 & 3 seconds
function outputC(){
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    setTimeout(function(){
        console.log("C");
    },randomTime);
}

// invoke the functions in order

outputA();
outputB();
outputC();
```    

In the above example, we can invoke the outputA() function (which will output the character "A" after a random delay between 0 & 3 seconds) and then immediately invoke the following "outputB()" and "outputC()" functions in order. Each function is said to be "non-blocking" because even though it will take some time to perform it's function (ie: output a letter to the browser), it does not stop the main flow of execution when it is invoked. Essentially, what we are doing is kickstarting 3 separate functions that will each output their value to the console after a random amount of time. When this example is executed, there is absolutely no way to know what order the functions will output their content to the browser - ie it could be "ACB", "BCA", "CAB", etc. However, what if that order was important? For example, what if one of the functions relies on the output from one of the other functions? If this were the case they would have to be executed in a specific order.

<br>

#### Resolve & Then

Fortunately, JavaScript has the notion of the **["Promise"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** that can help us solve this type of situation. Put simply, a Promise object is used for asynchronous computations (like the situation in the example above) and represents a value which may be available now, or in the future, or never. Basically, what this means is that we can place our asynchronous code inside a Promise object as a function with specific parameters ("resolve" and "reject"). When our code is complete, we invoke the ["resolve" function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) and if our code encounters an error, we can invoke the ["reject" function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject). We can handle both of these situations later with the [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method or (in the case of an error that we wish to handle) the [.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method. To see how this concept is implemented in practice, consider the following addition to the outputA() method from above:

```javascript

// output "A" after a random time between 0 & 3 seconds
function outputA(){
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        setTimeout(function(){
            console.log("A");
            resolve(); // call "resolve" because we have completed the function successfully
        },randomTime);
    });   
}

// call the outputA function and when it is "resolved", output a confirmation to the console

outputA().then(function(){
    console.log("outputA resolved!");
});
```
    
Our "outputA()" function still behaves as it did before (outputs "A" to the console after a random period of time). However, our outputA() function now additionally returns a **new Promise** object that contains all of our asynchronous logic and its status. The container function for our logic always uses the two parameters mentioned above, ie: **resolve** and **reject**. By invoking the **resolve** method we are setting the promise into the fulfilled state, meaning that the operation completed successfully and the character "A" was successfully output to the browser. We can respond to this situation using the ["then"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) function on the returned promise object to execute some code **after** the asynchronous operation is complete! This gives us a mechanism to react to asynchronous functions that have completed successfully so that we can perform additional tasks.

<br>

#### Adding Data

Now that we have the Promise structure in place and are able to **"resolve"** the Promise when it has completed it's task and **"then"** execute another function using the returned Promise object (as above), we can begin to think about how to pass data from the asynchronous function to the "then" method. Fortunately, it only requires a little tweak to the above the above example to enable this functionality:

```javascript
// output "A" after a random time between 0 & 3 seconds
function outputA(){
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        setTimeout(function(){
            console.log("A");
            resolve("outputA resolved!"); // call "resolve" because we have completed the function successfully
        },randomTime);
    });   
}

// call the outputA function and when it is "resolved", output a confirmation to the console

outputA().then(function(data){
    console.log(data);
});
``` 

Notice how we are able to invoke the **resolve()** function with a single parameter that stores some data (in this case a string with the text "outputA resolved!"). This is typically where we would place our freshly returned data from an asynchronous call to a web service / database, etc. The reason for this is that we will have access to it as the first parameter to the anonymous function declared inside the **.then** method and this is the perfect place to process the data.

<br>

#### Reject & Catch

It is not always safe to assume that our asynchronous calls will complete successfully. What if we're in the middle of an XHR (XMLHttpRequest) request and our connection is dropped or a database connection fails? To ensure that we handle this type of scenario gracefully, we can invoke the "reject" method instead of the "resolve" method and provide a reason why our asynchronous operation failed. This causes the promise to be in a "rejected" state and the ".catch" function will be invoked, where we can gracefully handle the error. The typical syntax for handling both "then" and "catch" in a Promise is as follows:

```javascript
// output "A" after a random time between 0 & 3 seconds
function outputA(){
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        setTimeout(function(){
            console.log("-");
            reject("outputA rejected!"); // call "reject" because the function encountered an error
        },randomTime);
    });   
}

// call the outputA function and when it is "resolved" or "rejected, output a confirmation to the console

outputA()
.then(function(data){
    console.log(data);
})
.catch(function(reason){
    console.log(reason);
});
```

<br>

#### Chaining Promises

As we have seen, the Promise object and pattern for dealing with asynchronous code (of any kind) is extremely powerful. We are able to effectively process the result of executing an asynchronous block of code whether it completes successfully (using .resolve & .then) or fails / gives undesired results (using .reject & .catch). However, there is one last feature that we should discuss before moving on, ie: "chaining" promises. Recall, when we first began discussing promises we saw an example with 3 asynchronous functions ("outputA()", "outputB()" and "outputC()") that always completed in a different order even though they were always invoked in the same order. This could potentially cause problems if one function depended on another for data.

With promises, we can reliably detect when an asynchronous block of code completes, so why not use this to invoke a second (dependant) asynchronous function? This is the notion of "chaining" promises - executing one piece of asynchronous code after another and optionally passing data. For example, if we wish to ensure that "outputA()", "outputB()" and "outputC()" always execute in the same order, regardless of how long each task takes, we can update the code to use Promises in the following way:

```javascript
// output "A" after a random time between 0 & 3 seconds
function outputA(){
    
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("A");
            resolve("outputA() complete");
        },randomTime);
    });   
}

// output "B" after a random time between 0 & 3 seconds
function outputB(msg){
    // NOTE: msg holds the 'resolve' message from the 
    // previous function in the chain
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("B");
            resolve("outputB() complete");
        },randomTime);
    });   
}

// output "C" after a random time between 0 & 3 seconds
function outputC(msg){
    // NOTE: msg holds the 'resolve' message from the 
    // previous function in the chain
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("C");
            resolve("outputA() complete");
        },randomTime);
    });   
}

// invoke the functions in order

outputA()
.then(outputB)
.then(outputC)
.catch(function(rejectMsg){
    // catch any errors here
    console.log(rejectMsg);
});
```    

Now, all three functions ("outputA()", "outputB()" & outputC()") have been updated to use promises and each return a new Promise object. Each promise is "resolved" once it's message has been written to the console – ie: "outputA()"'s promise is resolved once "A" is written to the, console, etc. We don't have to alter the functions to be aware of each other by passing in any related functions / callbacks and each function is treated as it's own isolated "promise" to output it's message to the browser.

The chaining actually occurs further down in the ".then()" method of each promise. Recall the ".then()" method of the promise accepts a function that is invoked once the promise is "resolved". So, we can first invoke the "outputA()" method, "then" when it is resolved, invoke the "outputB()" method. The trick that makes chaining work is that we must ensure the next function "in the chain", returns it's promise. We can continue this pattern to execute as many asynchronous functions (Promises) we like and be confident that they will always be executed in the order we invoke them.

**NOTE:** calling "resolve()" or "reject()" won't immediately exit the promise and invoke the related ".then()" or ".catch()" callback - it simply puts the promise in a "resolved" or "rejected" state and code immediately following the statement will still run, ie:

```javascript
// ...
reject();
console.log("I will still be executed");
// ...
```

If we want to immediately exit the function and prevent further execution of the code within the Promise, we can invoke the "return" statement, immediately following the "resolve()" or "reject()" call, ie:

```javascript
// ...
reject(); return;
console.log("I will not be executed");
// ...
```

<br>

### Arrow Functions

ES6 has introduced many new keywords, constructs, syntax and functionality to the JavaScript language (for a full list, refer back to the [Compatibility Table](https://kangax.github.io/compat-table/es6/)). We cannot possibly discuss it all here, so we must concentrate on new syntax / functionality that is likely to be encountered when learning some of the frameworks in this course (ie: Node.js / Express.js, MongoDB, etc. ).

One new concept that you will notice right away (or may have already noticed), is that there's a new operator: "=>" that we can use to declare anonymous functions – or "arrow functions":

```javascript
var outputMessage = function(message){
  console.log(message);
};

// is the same as:

var outputMessageArrow = message => console.log(message);

// invoke each function to see the result

outputMessage("Function Expression");
outputMessageArrow("Arrow Function");
```

When we use the arrow (=>) syntax to create functions, we no longer need the "function" keyword and simple, one parameter / one line functions or methods can be greatly simplified as:

parameter => logic

However, if we have more than one parameter, or more than one line of logic, we can still use arrow functions to simplify the creation of anonymous functions by eliminating the "function" keyword:

```javascript
var outputMessage = function(message1, message2) {
  console.log(message1);
  console.log(message2);
};

// is the same as:

var outputMessageArrow = (message1, message2) => {
  console.log(message1);
  console.log(message2);
};

// invoke each function to see the result

outputMessage("Function", "Expression");
outputMessageArrow("Arrow", "Function");
```

This still simplifies things from a syntax point of view, however both methods of declaring anonymous functions are still very similar. The syntax difference is most noticeable when we have simple functions that accept zero (0) parameters and perform a single line of logic, for example:

```javascript
var outputMessage = function() {
  console.log("Hello Function Expression");
};

// is the same as:

var outputMessageArrow = () => console.log("Hello Arrow Function");

// invoke each function to see the result

outputMessage();
outputMessageArrow();
``` 

<br>

#### Lexical "this"

Arrow functions are great for creating simplified code that is easier to read (sometimes referred to as "syntax sugar"), however there is another very useful and slightly misleading feature that we have yet to discuss: the notion of a "lexical 'this'". Recall that when we added the "outputNameDelay" method to the architect prototype, we had to overcome the issue with "this" pointing at the incorrect object by introducing a new local variable, "that":

```javascript
architect.prototype.outputNameDelay = function(){
    var that = this;
    setTimeout(function(){
    console.log(that.name);
    },1000);
};
``` 

While this does solve the problem, wouldn't it be better if we didn't have to always create a new local variable to sit in for "this"? Fortunately, arrow functions actually use a "lexical this" instead of their own value for "this", so functions defined using the arrow notation use the "this" value of their parent scope. This insures that if an arrow function is invoked in a different context than the one in which it is defined (like the above example), the value of "this" will not change.

Now, we can re-write the above function using an arrow function to achieve the same result without having to introduce any new variables to handle the "this" issue. Additionally, because it's such a simple function, we can transform it into a single line:

```javascript
architect.prototype.outputNameDelay = function(){
    setTimeout(() => { console.log(this.name); }, 1000);
};
``` 

This is a typical use of arrow functions, ie to simplify a scenario in which we need to declare a function in place, often as a parameter to other functions. We don't have to concern ourselves with how "this" will behave in the new context and the added "syntax sugar" makes the operation much simpler to read and shorter to code.

<br>

#### A Word of Warning

Be careful when using arrow functions, as not every situation calls for a "lexical this". For example, when we declare methods on an object, we always want "this" to point to the current object, so "lexical this" doesn't make sense and arrow functions will actually fail to behave as expected:

```javascript
var test1obj = {
  a: "a",
  b: () => console.log(this.a)
}

test1obj.b(); // undefined

var test2obj = {
  a: "a",
  b: function() { console.log(this.a); }
}

test2obj.b(); // "a"
```  

In addition, arrow functions **do not** have any notion of the [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object and also **cannot** be used as function constructors and will throw an error when using the new operator (ie: Function is not a constructor).

<br>

### Sources

*   [MDN - Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
*   [MDN - Prototypal Inheritance](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance#Prototypal_inheritance)
*   [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
