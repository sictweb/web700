---
title: WEB700 Week 1
layout: default
---

## WEB700 Week 1 Notes

### Preface

The web is the most ubiquitous computing platform in the world.  As a developer, learning the web
takes time.  There are hundreds of languages, libraries, frameworks, and tools to be learned, some old, some built yesterday, and all being mixed together at once.

The fundamental unit of the web is the [hyperlink](https://en.wikipedia.org/wiki/Hyperlink)--the web is interconnected. These weekly
notes provide numerous links to external resources, books, blogs, and sample code.  To get
good at the web, you need to be curious and you need to go exploring, you need to try things.

Make sure you follow the links below as you read, and begin to create your own web of knowledge
and experience.  No one resource can begin to cover the breadth and depth of web development.

> Question: do I need to read the weekly notes?  How about all the many links to external resources?

Yes, you do need to read the weekly notes.  You will be tested on this material.  We will
discuss it in class, but not cover everything.  The external links will help you understand and
master the material.  You are advised to read some external material, but you don't need to read
all of it. 

<br>

### Internet Architecture

### Overview

* [How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)
    * [How the Internet works in 5 minutes (video)](https://www.youtube.com/watch?v=7_LPdttKXPc)

* [How the Web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

<br>

### Application Protocols

The web runs on-top of TCP/IP networks using a number of communication protocols, including:

* [IP](https://en.wikipedia.org/wiki/IP_address#IPv4_addresses) these 32-bit numbers (IPv4) are assigned to every device on the Internet (IPv6 uses 128-bit numbers).

* [Domain Names](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name#Structure_of_domain_names) human-readable addresses for servers on the Internet

* [Domain Name System (DNS)](https://www.cloudflare.com/learning/dns/what-is-dns/), the "Phone Book" of the Internet.  There are many popular DNS servers you can use:
    * OpenDNS: `208.67.222.222`, `208.67.220.220`
    * Cloudeflare: `1.1.1.1`, `1.0.0.1`
    * Google: `8.8.8.8`, `8.8.4.4`
    * There are lots more, but each has trade offs (privacy, [speed](https://www.dnsperf.com/#!dns-resolvers,North%20America))

* [Hypertext Transfer Protocol (HTTP)](https://dev.opera.com/articles/http-basic-introduction/)
    * [How to get things on the web](https://dev.opera.com/articles/http-lets-get-it-on/)
    * [HTTP Responses](https://dev.opera.com/articles/http-response-codes/)

* [Hypertext Transfer Protocol Secure (HTTPS)](https://en.wikipedia.org/wiki/HTTPS)

There are many more as well (SMTP, FTP, POP, IMAP, SSH, etc).

We often use the terms "Web" and "Internet" interchangeably, however, they aren't
the same.

The *World Wide Web* (WWW) runs on top of the Internet using HTTP, and
allows us to access web services, request resources (i.e., pages, images), and
transmit data between clients and servers.  The web is a subset of the Internet.

**The web isn't owned or controlled by any single company, organization, or government.**
Instead, it is defined as a set of [open standards](https://en.wikipedia.org/wiki/Web_standards),
which everyone building and using the web relies upon.  Some examples of these
standards include [HTML](https://html.spec.whatwg.org/multipage/), [HTTP](https://tools.ietf.org/html/rfc7230), [SVG](https://www.w3.org/TR/SVG11/), and many more.

<br>

### HTTP Requests and Responses

The Hypertext Transfer Protocol is a **stateless**, **client-server** model for [formatting
requests and responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages) between computers on the Internet.  This means one computer
makes a request (the client) to another (the server), and after the response is returned,
the connection is closed.

The server listens for requests, and fulfills (or rejects) those requests by returning
(or generating) the requested resources, such as images, web pages, videos, or other data.

#### URLs

Web resources are reachable via unique identifiers called a *Uniform Resource Locator* or
*URL*.  Consider the URL for the official Node.js documentation (A JavaScript runtime that we will use throughout this course):

[https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)

A URL contains all the information necessary for a web client (e.g., a browser) to request
the resource.  In the URL given above we have:

* protocol: `https:` - the resource is available using the HTTPS (i.e., secure HTTP) protocol

* domain: `nodejs.org` - the domain (domain name) of the server.  We could also have substituted the IP address (`104.20.23.46`), but it's easier to remember domain names.

* port: Not Given - if not specified, the port is the default for HTTP `80` or `443` for HTTPS.  It could have been specified by appending `:443` like so: `https://nodejs.org:443`

* origin: combining the protocol, domain, and port gives us a unique origin, `https://nodejs.org`.  Origins play a central role in the web's security model.

* path: `/en/docs` - a filesystem-like path to the resource on the server.  It may or may not end with a file extension.

* query string: Not Given - The query string contains additional parameters sent to the server as a part of the URL in the form `name=value`, ie:`?property1=value1&property2=value2` 

URLs can only contain a limited set of characters, and anything outside that set has to be *encoded*.
This includes things like spaces, non-ASCII characters, Unicode, etc.

#### Requests

A URL describes the location (i.e., server, pathname) and how to interpret (i.e., which protocol) a resource on the Internet.  To get the resource, we need to request it by sending a properly formatted HTTP Request to the appropriate server (host):

```http
GET /en/docs HTTP/2 
Host: nodejs.org 
```

Here we do a `GET` request using HTTP version 2 for the resource at the path `/en/docs`
on the server named `nodejs.org`.

There are various *HTTP Verbs* we can use other than `GET`, which allow us to request that
resources be returned, created, deleted, updated, etc.  The most common include:

* `GET` - retrieve the data at the given URL

* `POST` - create a new resource at the given URL based on the data sent along with the request in its *body*

* `PUT` - update an existing resource at the given URL with the data sent along with the request in its *body*

* `DELETE` - delete the resource at the given URL

We can use a URL in many ways, for example, via the command line using a tool like [curl](https://curl.haxx.se/):

```bash
$ curl https://nodejs.org/en/docs/

<!DOCTYPE html>
<html lang="en" >
...
</html>
```

#### Responses

Upon receiving a request for a URL, the server will respond with an *HTTP Response*, which includes
information about the response, and possibly the resource being requested.  Let's use `curl` again,
but this time ask that it `--include` the response headers:

```bash
$ curl --include https://nodejs.org/en/docs/

HTTP/2 200 
date: Fri, 26 Jul 2019 18:57:35 GMT
content-type: text/html
set-cookie: __cfduid=da9eda0bdcd9e97e879074e4b64bfcc221564167455; expires=Sat, 25-Jul-20 18:57:35 GMT; path=/; domain=.nodejs.org; HttpOnly
last-modified: Tue, 23 Jul 2019 21:05:15 GMT
cf-cache-status: HIT
age: 46
expires: Fri, 26 Jul 2019 22:57:35 GMT
cache-control: public, max-age=14400
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
server: cloudflare
cf-ray: 4fc899a5ae3ee1ce-ORD

<!DOCTYPE html>
<html lang="en" >
...
</html>
```

In this case, we see a two-part structure: first a set of **Response Headers**; then
the  **Response Body** formatted using HTML (Discussed in detail in week 6).  The two are separated by a blank line.  The headers
provide extra metadata about the response, the resource being returned, the server, etc.

[HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) are well defined,
and easy to lookup via Google, MDN, or StackOverflow.  They follow the `key: value` format,
and can be upper- or lower-case:

`name: value`

For example:

`content-type: text/html`, where `content-type` is the **name** and `text/html` is the **value**.

In the response above, we see a number of interesting things:

* `200 OK` - tells us that the requested resource was successful located and returned.

* Info about the `Date`, when the response `Expires`, whether to cache it (`cache-control`) on the client

* The `Content-Type` is `text`, and more specifically, `html` (a web page) using [UTF8 text encoding](https://en.wikipedia.org/wiki/UTF-8).

* The origin server is using `cloudflare` to handle the request.

* The content has been in a [proxy cache](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) (`age`) for 46 seconds.

After these **headers** we have a blank line (i.e., `\n\n`), followed by the **body** of our response: the actual HTML document.

What if we requested a URL that we know doesn't exist?

```bash
$ curl --include https://ict.senecacollege.ca/course/web000

HTTP/1.1 302 Found
Date: Thu, 30 Aug 2018 20:25:28 GMT
Server: Apache/2.4.29 (Unix) OpenSSL/1.0.2l PHP/5.6.30
X-Powered-By: PHP/5.6.30
Expires: Sun, 19 Nov 1978 05:00:00 GMT
Cache-Control: no-cache, must-revalidate, post-check=0, pre-check=0
Location: https://ict.senecacollege.ca/Course/CourseNotFound?=web000
Content-Length: 0
Content-Type: text/html; charset=UTF-8

```

This time, instead of a `200` status code, we get `302`.  [This indicates](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) that the resource has moved,
and later in the headers we are given a new `Location` to try.  Notice there is no body (not every response will include one).

Let's try following the suggested redirect URL:

```bash
$ curl --include curl --include https://ict.senecacollege.ca/Course/CourseNotFound?=web000

HTTP/1.1 404 Not Found
Date: Tue, 27 Aug 2019 13:08:55 GMT
Server: Apache/2.4.6 (CentOS) mpm-itk/2.4.7-04 OpenSSL/1.0.2k-fips mod_fcgid/2.3.9 PHP/5.6.40
X-Powered-By: PHP/5.6.40
Expires: Sun, 19 Nov 1978 05:00:00 GMT
Cache-Control: no-cache, must-revalidate, post-check=0, pre-check=0
Content-Language: en
Link: </?q=Course/CourseNotFound>; rel="canonical",</?q=node/891>; rel="shortlink"
X-Generator: Drupal 7 (http://drupal.org)
Transfer-Encoding: chunked
Content-Type: text/html; charset=utf-8

...
```

Now a third response code has been returned, [`404 Not Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) as well as another HTML page
telling us our course couldn't be located.

There are dozens of response codes, but they fall into a [few categories you should learn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status):

* `1xx` - [information responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Information_responses)
* `2xx` – [successful responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Successful_responses)
* `3xx` - [redirection messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Redirection_messages)
* `4xx` – [client error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Client_error_responses)
* `5xx` – [server error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Server_error_responses)

<br>

### Web Browsers

So far we've been communicating with web servers using `curl`, but a more common
tool is a **Web Browser**.

A good way to think about a browser is as an operating system vs. an application.
A web browser provides implementations of the web's open standards.  This means
it knows how to communicate HTTP, DNS and other protocols over the network in order
to request resources via URLs.  It also contains parsers for the web's programming languages,
and knows how to render, execute, and lay-out web content for use by a user.  Browsers
also contain lots of security features, and allow users to download and run untrusted code
(i.e., code from a random server on the Internet), without fear of infecting their
computers.

Some of the the largest software companies and vendors in the world all have their own browsers:

* Google [Chrome](https://www.google.com/chrome/) for desktop and Android
* [Microsoft Edge](https://www.microsoft.com/en-ca/windows/microsoft-edge) and Internet Explorer (IE)
* Apple [Safari and Safari for iOS](https://www.apple.com/ca/safari/)
* [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [Samsung Internet for Android](https://www.samsung.com/us/support/owners/app/samsung-internet)
* [Opera](https://www.opera.com/)

There are hundreds more, and thousands of different OS and version combinations. There are
good stats on usage info for [desktop](http://gs.statcounter.com/browser-market-share/desktop/worldwide)
and [mobile](http://gs.statcounter.com/browser-market-share/mobile/worldwide), but no one
company or browser controls the entire web.

As a web developer, you can't ever know for sure which browser your users will have.
This means you have to test your web applications in different browsers and on different platforms
in order to make sure the experience is good for as many people as possible.

The web is also constantly evolving, as new standards are written, APIs and features added
to the web platform, and older technologies retired.  A good way to stay on top of what
does and doesn't work in a particular browser is to use [https://caniuse.com/](https://caniuse.com/).
This is a service that keeps track of web platform features, and which browsers do and don't
implement it.

For example, you can look at the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL) API,
used to work with URLs in JavaScript: [https://caniuse.com/#feat=url](https://caniuse.com/#feat=url).
Notice that it's widely supported (green) in most browsers (89.69% at the time of writing), but not supported (red) in some older browsers like Internet Explorer.

Because the web is so big, so complicated, so old, and used by so many people for so many different
and competing things, it's common for things to break, for there to be bugs, and for you to have
to adapt your code to work in interesting ways.  The good news is, it means there are lots
of jobs for web developers to make sure it all keeps working.

<br>

### Uniqueness of the Web as a Platform

We've been discussing HTTP as a way to request URLs be transferred between clients and servers.
The web is globally distributed set of 

* services - requesting *data* ([JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), [XML](https://developer.mozilla.org/en-US/docs/XML_introduction), binary, etc) to be used in code (vs. looked at by a user)

* resources, pages, documents, images, media - both static and dynamic user viewable resources (web pages), which link to other similar resources.

* applications - a combination of the above, providing rich user interfaces for working with real-time data or other complex information, alone or in networked (i.e., collaborative) ways.

The web can be read-only.  The web can also be interactive (video games), editable (wikis), personal (blog), and productive (e-commerce).

The web is *linkable*, which makes it something that can be indexed, searched, navigated, and connected. The web gets more valuable as its connections grow: just look at all the other pages and resources this page links to itself!

The web allows users to access and run remote applications *without* needing to install new software.  **The deployment model of the web is HTTP**.  Compare that to traditional software that has to be manually installed on every computer that needs to run it.  Same with mobile phones and apps in the various app stores.  Updates get *installed* every time you use a URL.

> Question: how many mobile or desktop apps did you install today vs. how many websites did you visit?

The web works on *every* computing platform.  You can access and use the web on desktop and mobile computers, on TVs and smartwatches, on Windows and Mac, in e-Readers and video game consoles.  The web works everywhere, and learning how to develop software for the web extends your reach into all those platforms.

<br>

### Introduction to JavaScript

The first web technology we will learn is JavaScript.  JavaScript (often shortened to JS)
is a lightweight, interpreted or JIT (i.e., Just In Time) compiled language.

JavaScript looks [similar to C/C++ or Java](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction#JavaScript_and_the_ECMAScript_Specification#JavaScript_and_Java) in some of its syntax, but is quite different
in philosophy; it is more closely related to [Scheme](https://en.wikipedia.org/wiki/Scheme_(programming_language)) than C. For example, JavaScript is a dynamic scripting language supporting
multiple programming styles, from [object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming) to [imperative](https://en.wikipedia.org/wiki/Imperative_programming) to [functional](https://en.wikipedia.org/wiki/Functional_programming).

JavaScript is one of, if not the [most popular programming languages in the world](https://redmonk.com/sogrady/2021/03/01/language-rankings-1-21/), and has been for many years.
Learning JavaScript well will be a tremendous asset to any software developer, since so
much of the software we use is built using JS.

> JavaScript's many versions: JavaScript is an evolving language, and you'll hear it [referred to by a number of names](https://medium.freecodecamp.org/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5), including: ECMAScript (or ES), ES5, ES6, ES2015, ES2017, etc.  [ECMA is the European Computer Manufacturers Association, which is the standards body responsible for the JS language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction#JavaScript_and_the_ECMAScript_Specification). As the standard evolves, the specification goes through different versions, adding or changing features and syntax.  In this course we will primarily focus on ECMAScript 5 (ES5), which all browsers support.  We will also sometimes use newer features of the language from ECMAScript 6 (ES6), which most browsers support.  Language feature support across browsers is [maintained in this table](http://kangax.github.io/compat-table/es6/).

<br>

### JavaScript Resources

Throughout the coming weeks, we'll make use of a number of important online resources.
They are listed here so you can make yourself aware of them, and begin to explore on your own.
All programmers, no matter how experienced, have to return to these documents on
a routine basis, so it's good to know about them.

* [JavaScript on MDN](https://developer.mozilla.org/bm/docs/Web/JavaScript)
    * [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
    * [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

* [Eloquent JavaScript](https://eloquentjavascript.net/)

* [Speaking JavaScript (ES5)](http://speakingjs.com/es5/index.html)

* [Exploring ES6](http://exploringjs.com/es6/index.html)

<br>

### JavaScript Environments

Unlike C, which is compiled to machine code, JavaScript is meant to be run within a host
environment.  There are many possible environments, but we will focus primairly on the following:

* [Node.js](https://nodejs.org/), and its [command line REPL (Read-Eval-Print-Loop)](http://www.tutorialsteacher.com/nodejs/nodejs-console-repl)

If you haven't done so already, you should install Node.js

#### JavaScript Engines

JavaScript is parsed, executed, and managed (i.e., memory, garbage collection, etc) by an [engine](https://en.wikipedia.org/wiki/JavaScript_engine) written in C/C++.
There are a number of JavaScript engines available, the most common of which are:

* [V8](https://developers.google.com/v8/), maintained an used by Google in Chrome and in Node.js
* [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey), maintained and used by Mozilla in Firefox
* [ChakraCore](https://github.com/microsoft/chakracore), maintained and used by Microsoft in Edge
* [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore), maintained and used by Apple in Safari

These engines, much like car engines, are meant to be used within a larger context.  We will
encounter them indirectly via web browsers and in Node.js.

It's not important to understand a lot about each of these engines at this point,
other than to be aware that each has its own implementation of the ECMAScript standards, its own performance characteristics (i.e., some are faster at certain things), as well as its own set of bugs.

<br>

### Running JavaScript Programs

JavaScript statements can be stored in an external file with a `.js` file extension,
or embedded within HTML code via the HTML `<script>` element.  For the first part of this course, we will use [Node.js](https://nodejs.org/en/) to execute our JavaScript code from the command line within our development environment, [Visual Studio Code](https://code.visualstudio.com/)

1. If you have not yet done so, download and install [Visual Studio Code](https://code.visualstudio.com/) and [Node.js](https://nodejs.org/)

2. Create a folder somewhere on your local machine and give it a relavent name, ie: "Ex1" (**Note** Before starting any coding project in Visual Studio Code, it's important to first create a containing folder).

3. Open Visual Studio Code 

4. You should see a large, "Open Folder" button in the left pane.  If the left pane is not visible click the top-left icon (it should look like two files overlapping)

5. Click the "Open Folder" button and choose your newly-created "Ex1" folder.

6. Next, hover your moue over the "EX1" text in the left pane; this will cause 4 icons to appear.  Click the first one (It looks like a little file with a plus (+) icon) to create a new file within the "Ex1" folder.

7. Name this file "Hello.js" and press enter.  Once this is complete, "Hello.js" should be open and ready for editing.

8. Enter the following line of code: 
    
    ```js 
console.log("Hello World!");
    ```

9. Save the file and open the "Integrated Terminal" using either the "View" menu and choosing "Terminal" or using the key combination ctrl + `

10. You should now see a terminal / Command Prompt at the bottom of your code.  Within this terminal, execute the following command:
    
    ```
    node Hello.js
    ```

11. "Hello World!" - you have just executed your first line of JavaScript code!

<br>

### JavaScript Syntax

#### Important Ideas

* JavaScript is Case-Sensitive: `customerCount` is not the same thing as `CustomerCount` or `customercount`

* Name things using `camelCase` (first letter lowercase, subsequent words start with uppercase) vs. `snake_case`.

* Semicolons are optional in JavaScript, but highly recommended.  We'll expect you to use them in this course, and using them will make working in C++, Java, CSS, etc. much easier, since you have to use them there.

* Comments can be single or multi-line
    
    ```js
    // This is a single line comment. NOTE: the space between the // and first letter.

    /*
        This is a multi-line comment,
        and can be as long as you need.
    */
    ```

* Whitespace: JavaScript will mostly ignore whitespace (spaces, tabs, newlines).  In this course we will expect you to use good indentation practices, and for your code to be clean and readable. 
    
    ```js
    // This is poorly indented, and needs more whitespace
    function add(a,b ){
    if(!b){
            return a;
    }else {
    return a+b;        
    }}

    // This is much more readable due to the use of whitespace
    function add(a, b) {
        if(!b) {
            return a; 
        } else {
            return a + b;
        }
    }
    ```
    
* JavaScript statements: a JavaScript program typically consists of a series of statements. A statement is a single-line of instruction made up of objects, expressions, variables, and events/event handlers.

* Block statement: a block statement, or compound statement, is a group of statements that are treated as a single entity and are grouped within curly brackets `{...}`. Opening and closing braces need to work in pairs. For example, if you use the left brace `{` to indicate the start of a block, then you must use the right brace `}` to end it. The same matching pairs applies to single `'......'` and double `"......."` quotes to designate text strings.

* [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) are one of the primary building blocks of JavaScript.  A function defines a subprogram that can be called by other parts of your code.  JavaScript treats functions like other built-in types, and they can be stored in variables passed to functions, returned from functions or generated at run-time.  Learning how to write code in terms of functions will be one of your primary goals as you get used to JavaScript.

* Variables are declared using the [`var` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).  You must use the `var` keyword to precede a variable name, but you do not need to provide a type, since the initial value will set the type.

    ```js
    var year;
    var seasonName = "Fall";

    // Referring to and using syntax:
    year = 2019;
    console.log(seasonName, year);
    ```

#### JavaScript Variables

Variables must start with a letter (`a-zA-z`), underscore (`_`), or dollar sign (`$`).  They cannot be a [reserved (key) word](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords). Subsequent characters can be letters, numbers, underscores.

*NOTE*: If you forget to use the `var` keyword, JavaScript will still allow you to use a variable, and simply create a *global variable*.  We often refer to this as "leaking a global," and it should always be avoided:

```js
var a = 6;      // GOOD: a is declared with var
b = 7;          // BAD: b is used without declaration, and is now a global
```

* Data Types: JavaScript is a typeless language--you don't need to specify a type for your data (it will be inferred at runtime).  However, internally, the [following data types are used](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Overview):
    
    * [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Numbers) - a double-precision 64-bit floating point number.  Using `Number` you can work with both Integers and Floats.  There are also some special `Number` types, [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity) and [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN).
    
    * [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Strings) - a sequence of Unicode characters.  JavaScript supports both single (`'...'`) and double (`"..."`) quotes when defining a `String`.
    
    * `Boolean` - a value of `true` or `false`. We'll also see how JavaScript supports so-called *truthy* and *falsy* values that are not pure `Boolean`s.
    
    * `Object`, which includes [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Functions), [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), and many more. - JavaScript supports object-oriented programming, and uses objects and functions as first-class members of the language.
    
    * [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) - a value that means "this is intentionally nothing" vs. `undefined`
    
    * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) - a special value that indicates a value has never been defined.
    
    |Declaration|Type|Value|
    |-----------|----|-----|
    |`var s1 = "some text";` |`String`|`"some text"`|
    |`var s2 = 'some text';` |`String`|`"some text"` |
    |`var s3 = '172';`       |`String`|`"172"`|
    |`var s4 = '172' + 4;`   |`String`|`"1724"` (concatenation vs. addition)|
    |`var n1 = 172;`         |`Number`|`172` (integer)|
    |`var n2 = 172.45;`      |`Number`|`172.45` (double-precision float)|
    |`var b1 = true;`        |`Boolean`| `true` |
    |`var b2 = false;`       |`Boolean`| `false`|
    |`var b3 = !b2;`         |`Boolean`| `true` |
    |`var c;`                |`undefined`| `undefined`|
    |`var d = null;`         |`null`|`null`|

<br>

#### JavaScript Operators

Common [JavaScript Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators) (there are more, but these are a good start):

|Operator | Operation | Example |
|---------|-----------|----------|
|`+`      | Addition of `Number`s| `3 + 4` |
|`+`      | Concatenation of `String`s| `"Hello " + "World"`|
|`-`      | Subtraction of `Number`s| `x - y`|
|`*`      | Multiplication of `Number`s| `3 * n`|
|`/`      | Division of `Number`s| `2 / 4`|
|`%`      | Modulo | `7 % 3` (gives 1 remainder)|
|`++`     | Post/Pre Increment| `x++`, `++x`|
|`--`     | Post/Pre Decrement| `x--`, `--x`| 
|`=`      | Assignment | `a = 6`|
|`+=`     | Assignment with addition | `a += 7` same as `a = a + 7`. Can be used to join `String`s too|
|`-=`     | Assignment with subtraction | `a -= 7` same as `a = a - 7`|
|`*=`     | Assignment with multiplication | `a *= 7` same as `a = a * 7`|
|`/=`     | Assignment with division | `a /= 7` same as `a = a / 7`|
|`&&`     | Logical `AND` | `if(x > 3 && x < 10)` both must be `true`|
|`()`     | Call/Create | `()` invokes a function, `f()` means invoke/call function stored in variable `f`|
|<code>&#124;&#124;</code>   | Logical `OR` | <code>if(x === 3 &#124;&#124; x === 10)</code> only one must be `true`|
|<code>&#124;</code>     | Bitwise `OR` | <code>3.1345&#124;0</code> gives `3` as an integer|
|`!`      | Logical `NOT` | `if(!(x === 2))` negates an expression |
|`==`     | Equal | `1 == 1` but also `1 == "1"` due to type coercion|
|`===`    | Strict Equal | `1 === 1` but  `1 === "1"` is not `true` due to types. Prefer `===`|
|`!=`     | Not Equal | `1 != 2`, with type coercion|
|`!==`    | Strict Not Equal | `1 !== "1"`. Prefer `!==`|
|`>`      | Greater Than | `7 > 3` |
|`>=`     | Greater Than Or Equal | `7 >=7` and `7 >= 3`|
|`<`      | Less Than | `3 < 10`|
|`<=`     | Less Than Or Equal | `3 < 10` and `3 <=3` |
|`typeof` | Type Of | `typeof "Hello"` gives `'string'`, `typeof 6` gives `'number'`|
| `cond ? a : b` | Ternary | `status = (age >= 18) ? 'adult' : 'minor';` |

* JavaScript is dynamic, and variables can change value *and* type at runtime:

    ```js
var a;             // undefined
a = 6;             // 6, Number
a++;               // 7, Number
a--;               // 6, Number
a += 3;            // 9, Number
a = "Value=" + a;  // "Value=9", String
a = !!a;           // true, Boolean
a = null;          // null
    ```

* JavaScript is a [garbage collected language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management).  Memory automatically gets freed at runtime when variables are not longer in scope or reachable.  We still need to be careful not to leak memory (i.e., hold onto data longer than necessary, or forever) and block the garbage collector from doing its job.

* Strings: JavaScript doesn't distinguish between a single character and a multi-character `String` --everything is a `String`.  You [define a `String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) using either single (`'...'`) or double (`"..."`) quotes.  Make sure you use one or the other, but don't mix them in a single program, so as to avoid confusion.  

* JavaScript version note: newer versions of ECMAScript also allow for the use of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).  Instead of `'` or `"`, a template literal uses \` (backticks), and you can also [interpolate expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Expression_interpolation).

<br>

#### JavaScript Expressions

A JavaScript [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) is any code (e.g., literals, variables, operators, and expressions) that evaluates to a single value. The value may be a `Number`, `String`, an `Object`, or a logical value.

```js
var a = 10 /2;                        // arithmetic expression
var b = !(10 / 2);                    // logical expression evaluates to false
var c = "10 " + "/" + " 2";           // string, evaluates to "10 / 2"
var f = function() { return 10 / 2;}; // function expression, f can now be called via the () operator
var d = f();                          // f() evaluates to 10/2, or the Number 5
```

<br>

#### JavaScript Execution Flow

JavaScript execution flow is determined using the following four (4) basic control structures:

* **Sequential**: an instruction is executed when the previous one is finished.

* **Conditional**: a logical condition is used to [determine which instruction will be executed next](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals) - similar to the `if` and `switch` statements in C (which JavaScript also has).

* **Looping**: a series of [instructions are repeatedly executed](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code) until some condition is satisfied - similar to the `for` and `while` statements in C (which JavaScript also has).  There are many different types of loops in JavaScript: for example [`for` loops](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#The_standard_for_loop) and [`while` loops](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#while_and_do_..._while), as well as ways to [`break`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#Exiting_loops_with_break) out of loops or skip iterations with [`continue`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#Skipping_iterations_with_continue).  We'll cover other types as we learn about `Object` and `Array`.

* **Transfer**: [jump to, or invoke](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions) a different part of the code - similar to calling a function in C.

```js
/**
 * 1. Sequence example: each statement is executed one after the other
 **/
var a = 3;
var b = 6;
var c = a + b;


/**
 * 2. Conditional examples: a decision is made based on the evaluation of an expression,
 * and a code path (or branch) taken.
 **/
var grade;
var mark = 86;

if (mark >= 90) {
    grade = 'A+';
} else if (mark >= 80) {
    grade = 'A';
} else if (mark >= 70) {
    grade = 'B';
} else if (mark >= 60) {
    grade = 'C';
} else if (mark >= 50) {
    grade = 'D';
} else { 
    grade='F';
}

switch(grade) {
    case 'A+':
        // do these steps if grade is A+
        break;
    case 'A':
        // do these steps if grade is A
        break;
    case 'B':
        // do these steps if grade is B
        break;
    case 'C':
        // do these steps if grade is C
        break;
    case 'D':
        // do these steps if grade is D
        break;
    default:
        // do these steps in any other case
        break;
}


/**
 * 3. Looping example: a set of statements are repeated
 **/

var total = 0;
for(var i = 1; i < 11; i++) {
    total += i;
    console.log("i", i, "total", total);
}


/**
 * 4. Transfer example: a set of statements are repeated
 **/

function add(a, b) {        // declaring the add function
    if(!b) {                // check if the b argument exists/has a value
        return a;           // if not, simply return the value of argument a
    }
    return a + b;           // otherwise, return the two arguments added together
}

var total;
total = add(56);            // invoking the add function with a single argument
total = add(total, 92);     // invoking the add function with two arguments
```
