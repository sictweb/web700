---
title: WEB700 Week 2
layout: default
---

## WEB700 Week 2 Notes

### Functions

A function is a *subprogram*, or a smaller portion of code that
can be called (i.e., invoked) by another part of your program, another function,
or by the environment in response to some user or device action (e.g., clicking a button,
a network request, the page closing). Functions *can* take values (i.e., arguments)
and may *return* a value.

Functions are first-class members of JavaScript, and play a critical role in developing
JavaScript programs.  JavaScript functions can take other functions as arguments,
can return functions as values, can be bound to variables or `Object` properties, and
can even have their own properties.  We'll talk about more of this when we visit JavaScript's
object-oriented features.

Learning to write code in terms of functions takes practice.  JavaScript supports
[functional programming](https://en.wikipedia.org/wiki/Functional_programming). Web
applications are composed of lots of small components that need to get wired together
using functions, have to share data (i.e., state), and interoperate with other code
in third-party frameworks, libraries, and components.

We use JavaScript functions in a number of ways.  First, we encapsulate
a series of statements into higher-order logic, giving a name to a set of repeatable
steps we can call in different ways and places in our code.  Second, we use them
to define actions to be performed in response to events.  Third, we use them to define behaviours for objects, what
is normally called a *member function* or *method*.  Fourth, we use them to define
*constructor* functions, which are used to create new objects.  We'll look at all
of these in the coming weeks.

Before we dive into that , we'll try to teach you that writing many smaller functions
is often [better than having a few large ones](https://martinfowler.com/bliki/FunctionLength.html).  Smaller code is [easier to test, easier to understand](https://dzone.com/articles/rule-30-%E2%80%93-when-method-class-or),
and generally [has fewer bugs](https://dubroy.com/blog/method-length-are-short-methods-actually-worse/).

<br>

### User-defined Functions

JavaScript has many built-in functions, which we'll get to below; however, it also
allows you to write your own and/or use ones written by other developers (libraries, frameworks).
These user-defined functions can take a number of forms.

> Important Note: Functions are typically named using the same rules we learned for naming any
variable: `camelCase` and using the set of valid letters, numbers, etc. and avoiding language keywords.

#### Function Declarations

The first is the *function declaration*, which looks like this:

```js
// The most basic function, a so-called NO OPERATION function
function noop() {
}

// square function accepts one parameter `n`, returns its value squared.
function square(n) {
    return n * n;
}

// add function accepts two parameters, `a` and `b`, returns their sum.
function add(a, b) {
    return a + b;
}
```

Here the `function` keyword initiates a *function declaration*, followed by a
*name*, a *parameter list* in round parenthesis, and the function's *body* surrounded
by curly braces.  There is no semi-colon after the function body.

#### Function Expressions

The second way to create a function is using a *function expression*.  Recall that
expressions evaluate to a value: a function expression evaluates to a `function` Object.
The resulting value is often bound (i.e., assigned) to a variable, or used as a parameter.

```js
var noop = function() {};

var square = function(n) {
    return n * n;
};

var add = function add(a, b) {
    return a + b;
};
```

A few things to note:

* The function's *name* is often omitted.  Instead we return an *anonymous function* and bind it to a variable.  We'll access it again via the variable name later.  In the case of recursive functions, we sometimes include it to make it easier for functions to call themselves.  You'll see it done both ways.
* We *did* use a semi-colon at the end of our function expression.  We do this to signify the end of our assignment statement `var add = ... ;`.
* In general, *function declarations* are likely a better choice (when you can choose) due to subtle errors introduced with declaration order and hosting (see below); however, both are used widely and are useful.

> JavaScript version note: newer versions of JavaScript also include the new `=>` notation, which denotes an [Arrow Function](https://eloquentjavascript.net/03_functions.html#h_/G0LSjQxoo).  When you see `var add = (a, b) => a + b;` it is short-hand for `var add = function(a, b) { return a + b; }`, where `=>` replaces the `function` keyword and comes *after* the parameter list, and the `return` keyword is optional when functions return a single value).  Arrow functions also introduce some new semantics for the `this` keyword, which we'll address later.

#### Parameters and arguments

Function definitions in both cases take parameter lists, which can be empty, single, or multiple
in length.  Just as with variable declaration, no type information is given:

```js
function emptyParamList() {
}

function singleParam(oneParameter) {
}

function multipleParams(one, two, three, four) {
}
```

A function can *accept* any number of arguments when it is called, including none.  This would
break in many other languages, but not JavaScript:

```js
var a = function(msg) {
    console.log(msg);
}

a("correct");          // logs "correct"
a("also", "correct");  // logs "also"
a();                   // logs undefined
```

Because we can invoke a function with any number of arguments, we have to write our functions
carefully, and test things before we make assumptions.  How can we deal with a caller
sending 2 vs. 10 values to our function?

One way we do this is using the built-in [`arguments` Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments).
Every function has an implicit `arguments` variable available to it, which is an array-like
object containing all the arguments passed to the function.  We can use `arguments.length` to 
obtain the actual number of arguments passed to the function at runtime, and use array index
notation (e.g., `arguments[0]`) to access an argument:

```js
var a = function(msg) {
    console.log(arguments.length, msg, arguments[0]);
}

a("correct");          // 1, "correct", "correct"
a("also", "correct");  // 2, "also", "also"
a();                   // 0, undefined, undefined
```

We can use a loop to access all arguments, no matter the number passed:

```js
function sum() {
    var count = arguments.length;
    var total = 0;
    for(var i = 0; i < count; i++) {
        total += arguments[i];
    }
    return total;
}

sum(1);          // 1
sum(1, 2);       // 3
sum(1, 2, 3, 4); // 10
```

You may have wondered previously how `console.log()` can work with one, two, three, or
more arguments.  The answer is that all JavaScript functions work this way, and you can use it
to "overload" your functions with different argument patterns, making them useful
in more than one scenario.

> JavaScript version note: in newer versions of JavaScript, we can also use [Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters), which allow us to specify that all final arguments to a function, no matter how many, should appear within the function as an `Array`.  There are [some advantages](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters#Difference_between_rest_parameters_and_the_arguments_object) to *not* using `arguments`, which rest parameters provide. We can convert the example above to:

```js
function sum(...numbers) {
    var total = 0;
    for(var i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}
```

#### Passing Functions as Parameters

Because JavaScript allows us to bind function objects (i.e., result of function expressions)
to variables, it is common to create functions without names, but immediately pass them
to functions as arguments.  The only way to use this function is via the argument name:

```js
// The parameter `fn` will be a function, and `n` a number
function execute(fn, n) {
    // Call the function referred to by the argument (i.e, variable) `fn`, passing `n` as its argument
    return fn(n);
}

// 1. Call the `execute` function, passing an anonymous function, which squares its argument, and the value 3
execute(function(n) {
    return n * n;
}, 3);

var doubleIt = function(num) {
    return num * 2;
}

// 2. Again call `execute`, but this time pass `doubleIt` as the function argument
execute(doubleIt, 3); // returns 6
```

#### Dealing with Optional and Missing Arguments

Because we *can* change the number of arguments we pass to a function at runtime, we
also have to deal with missing data, or optional parameters.  Consider the case of
a function to calculate a player's score in a video game.  In some cases we may want to
double a value, for example, as a bonus for doing some action a third time in a row:

```js
function updateScore(currentScore, value, bonus) {
    return bonus ? currentScore + value * bonus : currentScore + value;
}

updateScore(10, 3);
updateScore(10, 3);
updateScore(10, 3, 2);
```

Here we call `updateScore` three different times, sometimes with 2 arguments, and
once with 3.  Our `updateScore` function has been written so it will work in both cases.
We've used a [conditional ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to
decide whether or not to add an extra bonus score.  When we say `bonus ? ... : ...` we are
checking to see if the `bonus` argument is *truthy* or *falsy*--did the caller provide a value for it?
If they did, we do one thing, if not, we do another.

Here's another common way you'll see code like this written, using a default value:

```js
function updateScore(currentScore, value, bonus) {
    // See if `bonus` is truthy (has a value or is undefined) and use it, or default to 1
    bonus = bonus || 1;
    return currentScore + value * bonus;
}
```

In this case, before we use the value of `bonus`, we do an extra check to see if it
actually has a value or not.  If it does, we use that value as is; but if it doesn't, we
instead assign it a value of `1`.  Then, our calculation will always work, since multiplying
the value by `1` will be the same as not using a bonus.

The idiom `bonus = bonus || 1` is very common in JavaScript.  It uses the
[Logical Or Operator `||`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_OR_()) to test whether `bonus` evaluates to a value or not, and prefers that value if possible
to the fallback default of `1`.  We could also have written it out using an `if` statements like these:

```js
function updateScore(currentScore, value, bonus) {
    if(bonus) {
        return currentScore + value * bonus;
    }
    return currentScore + value;
}

function updateScore(currentScore, value, bonus) {
    if(!bonus) {
        bonus = 1;
    }
    return currentScore + value * bonus;
}
```

JavaScript programmers tend to use the `bonus = bonus || 1` pattern because it is
less repetitive, using less code, and therefore less likely to introduce bugs.  We could
shorten it even further to this:

```js
function updateScore(currentScore, value, bonus) {
    return currentScore + value * (bonus || 1);
}
```

> JavaScript version note: newer versions of JavaScript also support [Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), which allows us to specify a default value for any named parameter when declared.  This frees us from having to check for, and set default values in the function body.  Using default parameters, we could convert our code above to this:

```js
function updateScore(currentScore, value, bonus = 1) {
    return currentScore + value * bonus;
}
```

#### Return Value

Functions always *return* a value, whether implicitly or explicitly. If the `return`
keyword is used, the expression following it is returned from the function.  If
it is omitted, the function will return `undefined`:

```js
function implicitReturnUndefined() {
    // no return keyword, the function will return `undefined` anyway
}

function explicitReturnUndefined() {
    return;
    // return keyword, but no expression given, which is also `undefined`
}

function explicitReturn() {
    return 1;
    // return keyword, followed by `Number` expression evalutes to `Number`
}

function explicitReturn2() {
    return "Hello" + " World!";
    // return keyword, followed by expression evaluating to a `String`
}
```




<br>

### Built-in/Global Functions

JavaScript provides a number of [built-in global functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#Function_properties) for working with its data types, for example:

* [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
* [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
* [`isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)
* [`isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
* [`decodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)
* [`decodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
* [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
* [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

There are also global functions that exist for historical reasons, but should be avoided for performance,
usability, and/or security reasons:

* [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) dangerous to parse and run user-defined strings
* [`prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) and [`alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) synchronous calls that block the UI thread.

Most of JavaScripts "standard library" comes in the form of *methods* on global objects
vs. global functions.  A *method* is a function that is bound to a variable belonging
to an object, also known as a *property*.  We'll be covering these in more depth later, but
here are some examples

* [`console.*`](https://developer.mozilla.org/en-US/docs/Web/API/console).  There are
quite a few worth learning, but here are some to get you started:
    * [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/log), [`console.warn()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn), and [`console.error()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
    * [`console.assert()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/assert)
    * [`console.count()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
    * [`console.dir()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
* [`Math.*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
    * [`Math.abs()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)
    * [`Math.max()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
    * [`Math.min()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
    * [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
    * [`Math.round()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
* [`Date.*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
    * [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
    * [`Date.getTime()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
    * [`Date.getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
    * [`Date.getDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)
* [`JSON.*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
    * [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
    * [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

<br>

## Scope

JavaScript variables are *declared* with the `var` keyword (or `let`, `const` in es6).  We often
*assign* a value when we *declare* it, though we don't have to do both at once:

```js
var x;      // declared, no assignment (value is `undefined`)
x = 7;      // assignment of previously declared variable
var y = x;  // declaration and assignment combined
```

A variable always has a *scope*, which is the location(s) in the code where it
is usable.  Consider the variables `total` and `value`, as well as the
`add` function below:

```js
var total = 7;                    // global variable, accessible everywhere

function add(n) {
    var value = total + n;        // local variable, accessible within `add` function only 
    return value;
}

console.log("Total is", total);   // Works, because `total` is in the same scope
console.log("Value is", value);   // `undefined`, since `value` isn't defined in this scope
console.log("New Total", add(16)) // Works, because `add` is defined in the same scope
```

Unlike most programming languages, which use *block scope*, JavaScript variables
have *function scope*:

In many languages, we are told to declare variables when we need them.  However,
in JavaScript we tend to define our variables at the top of our functions.  We
don't strictly need to do this, due to *hoisting*.  JavaScript will *hoist* or
raise all variable declarations it finds in a function to the top of their
scope:

```js
function f() {
    var y = x + 1;
    var x = 2;
}
```

At runtime, this will be transformed into the following:

```js
function f() {
    var x;          // declaration is hoisted (but not assignment) to the top

    var y = x + 1;  // `NaN`, since `undefined` + 1 can't be resolved
    x = 2;          // note: `x` is not declared above, only the assignment is now here
```

This also happens when we forget to declare a local variable:

```js
function f() {
    x = 2;          // `x` is assigned a value, but not declared 
    return x + 1;
}
```

At runtime, this will be transformed into the following:

```js
var x;              // `x` is not found in the scope of `f`, so it becomes global

function f() {
    x = 2;
    return x + 1;
}
```

The previous example introduces another important concept with JavaScript scopes, namely,
that scopes can be *nested* within one another.  Hoisting is moving variable declarations to the beginning of a scope.  For example, function declarations are hoisted completely, which means
we can call a function *before* we declare it.

```js
f(); // this will work, as f's declaration gets hoisted
function f() {}
f(); // this will also work, because f has been declared as you expect.

g(); // this will not work, since g's declaration will be hoisted, but not the assignment.
var g = function() {};
```

In general, declare and define things *before* you need them.

<br>

### Overwriting Variables in Child Scopes

Since variables have function scope, and because functions can be nested, we have to be
careful when naming our variables and arguments so as to not overwrite a variable in a parent
scope.  Or, we can use this to temporarily do exactly that.  In both cases, we need to understand
how nested scopes work.  Consider the the following code, where a variable named `x` is used
in three different scopes.  What will be printed to the `console` when `child` is called?

```js
var x = 1;

function parent() {
    var x = 2;

    function child(x) {
        console.log(x);
    }

    child(3);
}
```

The first declaration of `x` creates a global variable (i.e., available in every scope).
Then, in `parent` we re-declare `x`, creating a new local variable, which overwrites (or hides)
the global variable `x` in this scope (i.e., within the body of `parent`).  Next, we define
yet another scope for `child`, which also uses `x` as the name of its only argument (essentially
another local variable).  When we do `child(3)`, we are binding the value `3` to the `x`
argument defined for the scope of `child`, and in so doing yet again overwriting the parent `x`.
In the end, the console will show `3`.

We can do this in error as well, and cause unexpected behaviour:

```js
var total = 100;

function increase(n) {
    var total += n;
}

increase(50);
console.log(total);
```

Here we expect to see `150` but instead will get `100` on the `console.`  The problem is
that we have redefined, and thus overwritten `total` inside the `increase` function.  During 
the call to `increase`, the new local variable `total` will be used, and then go out of scope.
After the function completes, the original global variable `total` will again be used.

<br>

## Closures

A closure is a function that has *closed over* a scope, retaining it even after it would
otherwise disappear through the normal rules of execution.  In the following function, the
variable `x` goes out of scope as soon as the function finishes executing:

```js
function f() {
    var x = 7;
    return x * 2;
    // After this return, and f completes, `x` will no longer be available.
}
```

In JavaScript, functions have access not only to their own local variables, but also
to any functions in their parents' scope.  That is, if a function is used (referenced)
but not declared in a function, JavaScript will visit the parent scope to find the variable.
This can happen for any number of child/parent levels up to the global level.

The following is an example of this, and probably one you've seen before:

```js
var x = 7;

function f() {
    return x * 2;  // `x` not declared here, JS will look in the parent scope (global)
}
```

Consider this example:

```js
function parent() {
    var x = 7;

    function child() {
        return x * 2;
    }

    return child();
}
```

Here `x` is used in `child`, but declared in `parent`.  The `child` function has access
to all variables in its own scope, plus those in the `parent` scope.  This nesting of scopes
relies on JavaScript's function scope rules, and allows us to share data.

Sometimes we need to capture data in a parent scope, and retain it for a longer period of time
than would otherwise be granted for a given invocation.  Consider this example:

```js
function createAccumulator(value) {
    return function(n) {
        value += n;
        return value;
    };
}

var add = createAccumulator(10);
add(1)   // returns 11
add(2)   // returns 13
```

Here the `createAccumulator` function takes an argument `value`, the initial value to use
for an accumulator function.  It returns an anonymous function which takes a value `n` (a `Number`)
and adds it to the `value` before returning it.  The `add` function is created by invoking
`createAccumulator` with the initial `value` of `10`.  The function that is returned by `createAccumulator` has access to `value` in its parent's scope.  Normally, `value` would be
destroyed as soon as `createAccumulator` finished executing.  However, we have created a *closure*
to capture the variable `value` in a scope that is now attached to the function we're creating and
returning.  As long as the returned function exists (i.e., as long as `add` holds on to it), the
variable `value` will continue to exist in our child function's scope: the variables that existed
when this function was created continue to live on like a memory, attached to the lifetime of
the returned function.  

Closures make it possible to *associate* some *data* (i.e., the environment) with a
function that can then operate on that data.  We see similar strategies in pure
object-oriented languages, where data (properties) can be associated with an object,
and functions (methods) can then operate on that data.  Closures play a somewhat
similar role, however, they are more lightweight and allow for dynamic (i.e., runtime)
associations.

By connecting data and functionality, closures help to reduce global variables, provide
ways to "hide" data, allow a mechanism for creating private "methods", avoid overwriting
other variables in unexpected ways. 

As we go further with JavaScript and web programming, we will encounter many instances
where closures can be used to manage variable lifetimes, and associated functions with
specific objects.  For now, be aware of their existence, and know that it is an advanced
concept that will take some time to fully master.  This is only our first exposure to it.

<br>

### Introduction to Objects and Object-Oriented Programming

In object-oriented languages like JavaScript, we are able to combine data and functionality into
higher order types, which both contain data and allow us to work with that data.  In other words,
we can pass data around in a program, and all the functionality that works on that data travels with it.

One way to think about `Object`s is to imagine that the data and the functions for working with that data are combined into one more powerful type.  

Fortunately for us, the JavaScript language comes with a number of [standard, "built-in" Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that we use regularly.  Today, we will discuss the built-in [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Objects.

<br>

### JavaScript's [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Object

A [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) is an `Object` with various [properties and methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_instances) we can use for working with lists in JavaScript.

<br>

#### Declaring JavaScript Strings

Here are a few examples of how you can declare a `String` in JavaScript, first using a
string literal, followed by a call to the [`new` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) and the `String` object's constructor function:

```js
/*
 * JavaScript String Literals
 */ 
var s = 'some text';  // single-quotes
var s1 = "some text"; // double-quotes
var s2 = `some text`; // template literal using back-ticks
var unicode = "中文 español Deutsch English देवनागरी العربية português বাংলা русский 日本語 ਪੰਜਾਬੀ 한국어 தமிழ் עברית" // non-ASCII characters

/*
 * JavaScript String Constructor: `new String()` creates a new instance of a String
 */
var s3 = new String("Some Text");
var s4 = new String('Some Text'); 
```

If we want to convert other types to a `String`, we have a few options:

```js
var x = 17;
var s = '' + x;        // concatenate with a string (the empty string)
var s2 = String(x);    // convert to String. Note: the `new` operator is not used here
var s3 = x.toString(); // use a type's .toString() method
```

Whether you use a literal or the constructor function, in all cases you will be able to use
the various [functionality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype#Properties) of the [`String` type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

<br>

### String Properties and Methods

* [`s.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) - will tell us the length of the string (UTF-16 code units)
* [`s.charAt(1)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) - returns the character at the given position (UTF-16 code unit).  We can also use `s[1]` and use an index notation to get a particular character from the string.
* [`s.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) - returns a new string created by concatenating the original with the given arguments.
 * [`s.includes("tex")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) - returns `true` if the search string is found within the string, otherwise `false` if not found.
* [`s.startsWith("some")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) - returns `true` if the string starts with the given substring, otherwise `false`.
* [`s.endsWith("text")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) - returns `true` if the string ends with the given substring, otherwise `false`.
* [`s.match(regex)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) - tries to match a regular expression against the string, returning the matches.  See discussion of RegExp below.
* [`s.replace(regex, "replacement")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) - returns a new string with occurrence(s) of a matched RegExp replaced by the replacement text.  See discussion of RegExp below.
* [`s.slice(2, 3)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) - returns a new string extracted (sliced) from within the original string.  A beginning index and (optional) end index mark the position of the slice.
* [`s.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) - returns an Array (see discussion below) of substrings by splitting the original string based on the given separator (`String` or `RegExp`).
* [`s.toLowerCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) - returns a new string with all characters converted to lower case.
* [`s.toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) - returns a new string with all characters converted to upper case.
* [`s.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim) - returns a new string with leading and trailing whitespace removed.

> JavaScript Version Note: modern JavaScript also supports [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), also sometimes called template *strings*.  Template literals use back-ticks instead of single- or double-quotes, and allow you to interpolate JavaScript expressions.  For example:

```js
var a = 1;
var s = "The value is " + (1 * 6);
var templateVersion = `The value is ${1*6}` 
```

<br>

### JavaScript's [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Object

An [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) is an `Object` with various [properties and methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Array_instances) we can use for working with lists in JavaScript.

<br>

### Declaring JavaScript Arrays

Like creating a `String`, we can create an `Array` in JavaScript using either a literal or the `Array` constructor function:

```js
var arr = new Array(1, 2, 3); // array constructor
var arr2 = [1, 2, 3]; // array literal
```

Like arrays in C, a JavaScript `Array` has a length, and items contained within it can be
accessed via an index:

```js
var arr = [1, 2, 3];
var len = arr.length; // len is 3
var item0 = arr[0]; // item0 is 1
```

Unlike languages such as C, a JavaScript `Array` can contain any type of data, including mixed types:

```js
var list = [0, "1", "two", true];
```

JavaScript `Array`s can also contain holes (i.e., be missing certain elements), change size dynamically at runtime, and we don't need to specify an initial size:

```js
var arr = [];  // empty array
arr[5] = 56;   // element 5 now contains 56, and arr's length is now 6
```

> NOTE: a JavaScript `Array` is really a **map**, which is a data structure that associates values with unique keys (often called a key-value pair).  JavaScript arrays are a special kind of map that uses numbers for the keys, which makes them look and behave very much like arrays in other languages.  We will encounter this **map** structure again when we look at how to create `Object`s.

<br>

### `Array` Properties and Methods

* [`arr.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) - a property that tells us the number of elements in the array.

#### Methods that modify the original array

* [`arr.push(element)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) - a method to add one (or more) element to the end of the array.  Using `push()` modifies the array (increasing its size). You can also use [`arr.unshift(element)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) to add one (or more) element to the *start* of the array.
* [`arr.pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) - a method to remove the last element in the array and return it.  Using `pop()` modifies the array (reducing its size). You can also use [`arr.shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) to remove the *first* element in the array and return it.

#### Methods that do not modify the original array

* [`arr.concat([4, 5], 6)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) - returns a new array with the original array joined together with other arrays or values provided.
* [`arr.includes(element)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) - returns `true` if the array includes the given element, otherwise `false`.
* [`arr.indexOf(element)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - returns the index of the given element in the array, if it exists, otherwise `-1` (meaning not found).
* [`arr.join("\n")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) - returns a string created by joining (concatenating) all elements in the array with the given delimiter (`String`).

#### Methods for iterating across the elements in an Array

* [`arr.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - calls the provided function on each element in the array.
* [`arr.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - creates and returns a new array constructed by calling the provided function on each element of the original array.

There are more [`Array` methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Array_instances) you can learn as you progress with JavaScript, but these will get you started.
