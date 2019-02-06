---
title: WEB700 Week 2
layout: default
---

## WEB700 Week 2 Notes

<br>

# WEB222 WEEK 2
<br>
<br>
<br>
<br>
<br>
<br>

## Suggested Readings

* [SpeakingJS,  Chapter 15. Functions](http://speakingjs.com/es5/ch15.html) and [Chapter 16. Variables: Scopes, Environments, and Closures](http://speakingjs.com/es5/ch16.html)
* [Eloquent JavaScript, Chapter 3. Functions](https://eloquentjavascript.net/2nd_edition/02_program_structure.html)
* [Functions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) and [Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) on MDN.
* [SpeakingJS, Chapter 12. Strings](speakingjs.com/es5/ch12.html)
* [SpeakingJS, Chapter 18. Arrays](speakingjs.com/es5/ch18.html)

## Functions

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
built into the browser, or in third-party frameworks, libraries, and components.

We use JavaScript functions in a number of ways.  First, we encapsulate
a series of statements into higher-order logic, giving a name to a set of repeatable
steps we can call in different ways and places in our code.  Second, we use them
to define actions to be performed in response to events, whether user initiated or
triggered by the browser.  Third, we use them to define behaviours for objects, what
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
function f() {
}
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

Another way we'll see closures used, is in conjunction with [Immediately-Invoked Function Expressions (IIFE)](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression).  Consider
the following rewrite of the code above:

```js
var add = (function(value) {
    return function(n) {
        value += n;
        return value;
    };
})(10);

add(1)   // returns 11
add(2)   // returns 13
```

Here we've declared `add` to be the value of invoking the anonymous function expression
written between the first `(...)` parentheses.  In essence, we have created a function
that gets executed immediately, and which returns another function that we will use
going forward in our program.

This is an advanced technique to be aware of at this point, but not one you need to master
right away.  We'll see it used, and use it ourselves, in later weeks to to avoid global variables,
simulate block scope in JavaScript, and to choose or generate function implementations at runtime (e.g., [polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill)).

<br>

## Introduction to Objects and Object-Oriented Programming

In object-oriented languages like JavaScript, we are able to combine data and functionality into
higher order types, which both contain data and allow us to work with that data.  In other words,
we can pass data around in a program, and all the functionality that works on that data travels with it.

One way to think about `Object`s is to imagine that the data and the functions for working with that data are combined into one more powerful type.  

Fortunately for us, the JavaScript language comes with a number of [standard, "built-in" Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that we use regularly.  Today, we will discuss built-in [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Objects.

<br>

## JavaScript's [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

<br>

### Declaring JavaScript Strings

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

## JavaScript's [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

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

## JavaScript's [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

A regular expression is a special string that describes a pattern to be used for matching or searching within other strings.  They are also known as a *regex* or *regexp*, and in JavaScript we refer to `RegExp` when we mean the built-in `Object` type for creating and working with regular expressions.

You can think of regular expressions as a kind of mini programming language separate from JavaScript.  They are not unique to JavaScript, and learning how to write and use them will be helpful in many other programming languages.

Even if you're not familiar with regular expression syntax (it takes some time to master), you've probably
encountered similar ideas with wildcards.  Consider the following Unix command:

```bash
ls *.txt
```

Here we ask for a listing of all files whose filename *ends with* the extension `.txt`.  The `*` has a special meaning: *any character, and any number of characters*.  Both `a.txt` and `file123.txt` would be matched against this pattern, since both end with `.txt`.

Regular expressions take the idea of defining patterns using characters like `*`, and extend it into a more powerful pattern matching language.  Here's an example of a regular expression that could be used to match both common spellings of the word `"colour"` and `"color"`:

```js
colou?r
```

The `?` means that the preceding character `u` is optional (it may or may not be there).
Here's another example regular expression that could be used to match a string that starts with `id-` followed by 1, 2, or 3 digits (`id-1`, `id-12`, or `id-999`):

```js
id-\d{1,3}
```

The `\d` means a digit (0-9) and the `{1,3}` portion means *at least one, and at most three*.  Together we get *at least one digit, and at most three digits*.

There are many [special characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters) to learn with regular expressions, which we'll slowly introduce.

<br>

### Declaring JavaScript `RegExp`

Like `String` or `Array`, we can declare a `RegExp` using either a literal or the `RegExp` constructor:

```js
var regex = /colou?r/;              // regex literal uses /.../
var regex2 = new RegExp("colou?r");
```

Regular expressions can also have [advanced search flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags_2),
which indicate how the search is supposed to be performed.
These flags include `g` (globally match all occurrences vs. only matching once),
`i` (ignore case when matching), and `m` (match across line breaks, multi-line matching) among others.

```js
var regex = /pattern/gi;                  // find all matches (global) and ignore case
var regex2 = new RegExp("pattern", "gi"); // same thing using the constructor instead
```

<br>

### Understanding Regular Expression Patterns

Regular expressions are dense, and often easier to write than to read.  It's helpful to use
various tools to help you as you experiment with patterns, and try to understand and debug
your own regular expressions:

* [regexr.com](https://regexr.com/)
* [Regulex](https://jex.im/regulex)
* [regexpal.com](https://www.regexpal.com/)

#### Matching Specific Characters

* `\ ^ $ . * + ? ( ) [ ] { } |` all have special meaning, and if you need to match them, you have to escape them with a leading `\`.  For example: `\$` to match a `$`.

* Any other character will match itself.  `abc` is a valid regular expression and means *match the letters abc*.

* The `.` means *any character*.  For example `a.` would match `ab`, `a3`, or `a"`. If you need to match the `.` itself, make sure you escape it: `.\.` means *a period followed by any character*

* We specify a set of possible characters using `[]`.  For example, if we wanted to match any vowel, we might do `[aeiou]`.  This says *match any of the letters a, e, i, o, or u* and would match `a` but not `t`.  We can also do the opposite, and define a negated set: `[^aeiou]` would match anything that is *not* a vowel.  With regular expressions, it can often be easier to define your patterns in terms of what they are not instead of what they are, since so many things are valid vs. a limited set of things that are not.  We can also specify a range, `[a-d]` would match any of `a, b, c, d` but not `f, g` or `h`.

* Some sets are so common that we have shorthand notation.  Consider the set of single digit numbers, `[0123456789]`.  We can instead use `\d` which means the same thing.  The inverse is `\D` (capital `D`), and means `[^0123456789]` (i.e., *not one of the digits*).  If we wanted to match a number with three digits, we could use `\d\d\d`, which would match `123` or `678` or `000`.

* Another commonly needed pattern is *any letter or number* and is available with `\w`, meaning `[A-Za-z0-9_]` (all upper- and lower-case letters, digits 0 to 9, and the underscore).  The inverse is available as `\W` and means `[^A-Za-z0-9_]` (everything *not* in the set of letters, numbers and underscore).

* Often we need to match blank whitespace (spaces, tabs, newlines, etc.).  We can do that with `\s`, and the inverse `\S` (anything not a whitespace).  For example, suppose we wanted to allow users to enter an id number with or without a space: `\d\d\d\s?\d\d\d` would match both `123456` and `123 456`.

* There are lots of other examples of pre-defined common patterns, such as `\n` (newline), `\r` (carriage return), `\t` (tab).  Consult the [MDN documentation for character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_meaning_in_regular_expressions) to lookup others.

#### Define Character Matching Repetition

In addition to matching a single character or character class, we can also match sequences of them,
and define *how many* times a pattern or match can/must occur.  We do this by adding extra information
*after* our match pattern.

* `?` is used to indicate that we want to match something *once or none*.  For example, if we want to match the word `dog` without an `s`, but also to allow `dogs` (with an `s`), we can do `dogs?`.  The `?` follows the pattern (i.e., `s`) that it modifies, and indicates that it is optional.

* `*` is used when we want to match *zero or more* of something.  `number \d*` would match `"number "` (no digits), `"number 1"` (one digit), and `"number 1234534123451334466600"`. 

* `+` is similar to `*` but means *one or more*. `vroo+m` would match `"vroom"` but also `"vroooooooom"` and `"vroooooooooooooooooooooooooooooooom"`

* We can limit the number of matches to an exact number using `{n}`, which means *match exactly `n` times*. `vroo{3}m` would only match `"vroooom"`.  We can further specify that we want a match to happen  *match `n` or more times* using `{n,}`, or use `{n,m}` to indicate we want to match *at least `n` times and no more than `m` times: `\w{8,16}` would match 8 to 16 word characters, `"ABCD1234"` or `"zA5YncUI24T_3GHO"`

#### Define Positional Match Parameters or Alternatives

Normally the patterns we define are used to look *anywhere* within a string.  However, sometimes
it's important to specify *where* in the string a match is located.  For example, we might care that
an id number *begins* with some sequence of letters, or that a name doesn't *end* with some set of characters.

* `^` means start looking for the match at the *beginning* of the input string.  We could test to see that a string begins with a capital letter like so: `^[A-Z]`.

* Similarly `$` means make sure that the match ends the string.  If we wanted to test that string was a filename that ended with a period and a three letter extension, we could use: `\.\w{3}$` (an escaped period, followed by exactly 3 word characters, followed by the end of the string).  This would match `"filename.txt"` but not `"filename.txt is a path"`. 

* Sometimes we need to specify one of a number of possible alternatives.  We do this with `|`, as in `red|green|blue` which would match any of the strings `"red"`, `"green"`, or `"blue"`.

<br>

### Using `RegExp` with `String`s

So far we've discussed how to declare a `RegExp`, and also some of the basics of defining search patterns.
Now we need to look at the different ways to use our regular expression objects to perform matches.

* [`RegExp.test(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) - used to test whether or not the given string matches the pattern described by the regular expression.  If a match is made, returns `true`, otherwise `false`.  `/id-\d\d\d/.test('id-123')` returns `true`, `/id-\d\d\d/.test('id-13b')` returns `false`.

* [`String.match(regexp)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) - used to find all matches of the given `RegExp` in the source `String`.  These matches are returned as an `Array` of `String`s.  For example, `'This sentence has 2 numbers in it, including the number 567'.match(/\d+/g)` will return the `Array` `['2', '567']` (notice the use of the `g` flag to find all matches globally).

* [`String.replace(regexp, replacement)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) - used to find all matches for the given `RegExp`, and returns a new `String` with those matches replaced by the replacement `String` provided.  For example, `'50      ,         60,75.'.replace(/\s*,\s*/g, ', ')` would return `'50, 60, 75.'` with all whitespace normalized around the commas.

* [`String.split(RegExp)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) - used to break the given `String` into an `Array` of sub-strings, dividing them on the `RegExp` pattern.  For example, `'one-two--three---four----five-----six'.split(/-+/)` would return `['one', 'two', 'three', 'four', 'five', 'six']`, with elements split on any number of dashes.

There are other [methods you can call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Working_with_regular_expressions), and more [advanced ways to extract data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_parentheses) using RegExp, and you are encouraged to dig deeper into these concepts over time.  Thinking about matching in terms of regular expressions takes practice, and often involves inverting your logic to narrow a set of possibilities into something you can define in code.  

