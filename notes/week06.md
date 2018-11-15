---
title: WEB700 Week 6
layout: default
---

## WEB700 Week 6 Notes

<br>

# WEB222 WEEK 5
<br>
<br>
<br>
<br>
<br>
<br>


## Suggested Readings

* [HTML: HyperText Markup Language on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
* [Learning HTML: Guides and Tutorials](https://developer.mozilla.org/en-US/docs/Learn/HTML)
* [HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)

## Running a Development Web Environment

Developing for the web requires at least 3 things pieces of software:

1. a proper code editor which, is aware of HTML, JavaScript, and CSS
1. a web client (i.e., browser), with developer and debugging tools
1. a web server

### Code Editor

For our code editor, we will be using [Visual Studio Code](https://code.visualstudio.com/),
which is a free ([open source](https://github.com/Microsoft/vscode)) code editor created
and maintained by Microsoft.  It also works on Windows, macOS, and Linux.  Make
sure you have downloaded and installed it on all the computers you will use for
web development.

### Web Client

For our web client we will use the many web browsers we introduced in Week 1, namely:

* Google [Chrome](https://www.google.com/chrome/) for desktop and Android
* [Microsoft Edge](https://www.microsoft.com/en-ca/windows/microsoft-edge) and Internet Explorer (IE)
* Apple [Safari and Safari for iOS](https://www.apple.com/ca/safari/)
* [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [Opera](https://www.opera.com/)

There are many more, and you are highly encouraged to install as many as possible.

### Web Server

We will also need a **web server** to host our web pages and applications.  Installing
and running a web server can be complicated.  Industry grade web servers like
[Apache](http://httpd.apache.org/) and [nginx](https://www.nginx.com/) are free
and can be installed and run on your local computer; however, they
are much more complicated and powerful than anything we will need for hosting
our initial web pages.

For our purposes, we will use a simple node.js based http-server.  In order to
use it, do the following:

1. Make sure you have installed [node.js](https://nodejs.org/en/) on your computer.
1. In a terminal window, navigate to the directory that you want your web server to host. For example `cd my-website`
1. Now start the web server by running the following command: `npx http-server`.

This will download and run the necessary software, and show you the following message:

```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.2.124:8080
Hit CTRL-C to stop the server
```

You can now open your web browser to `http://127.0.0.1:8080` and load your files.
This uses the `http` protocol, and connects you to the special IP address
`127.0.0.1`, also known as [localhost](https://en.wikipedia.org/wiki/Localhost)
(i.e., you can also use `http://localhost:8080`).  The localhost IP address always
refers to *this* computer, and allows you to connect network clients to your own
machine.  The final `:8080` portion of the URL is a port number.  Together,  
`http://127.0.0.1:8080` means *connect using HTTP to my local computer on port 8080.*

When you are done testing your web site, stop the web server by pressing `CTRL-C`
in your terminal window.  To run the server again, use `npx http-server`.

*NOTE: the second IP address will be different than the above, but 127.0.0.1 will always be correct.*

## HTML

HTML is the [HyperText Markup Language](https://en.wikipedia.org/wiki/HTML).  It
allows us to write *content* in a document, just as we would in a file created by 
a word processor.  Unlike a regular text file, it also includes structural and
layout information about this content.  We literally *mark up* the text of our
document with extra information.

When talking about HTML's markup, we'll often refer to the following terms:

* [tag](https://developer.mozilla.org/en-US/docs/Glossary/Tag): separated from regular content, tags are special text (names) wrapped in `<` and `>` characters, for example the image tag `<img>`.
* [element](https://developer.mozilla.org/en-US/docs/Glossary/Element): everything from an opening tag to the closing tag, for example: `<h1>Chapter 1</h1>`.  Here an element is made up of an `<h1>` tag (i.e., opening Heading 1 tag), the text content `Chapter 1`, and a closing `</h1>` tag.  These three together create an `h1` element in the document.
* [attribute](https://developer.mozilla.org/en-US/docs/Glossary/Attribute): optional characteristics of an element defined using the style `name` or `name="value"`, for example `<p id="error-message" hidden>There was an error downloading the file</p>`.  Here two attributes are included with the `p` element: an `id` with value `"error-message"` (in quotes), and the `hidden` attribute (note: not all attributes need to have a value).  [Full list of common attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).
* [entity](https://developer.mozilla.org/en-US/docs/Glossary/Entity): special text that should not be confused for HTML markup.  Entities begin with `&` and end with `;`.  For example, if you need to use the `<` character in your document, you need to use `&lt;` instead, since `<` would be interpreted as part of an HTML tag. `&nbsp;` is a single whitespace and `&amp;` is the `&` symbol.  [Full list of named entities](https://dev.w3.org/html5/html-author/charref).

## HTML Document

First [HTML page ever created](http://info.cern.ch/hypertext/WWW/TheProject.html) was
built by [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) on August 6, 1991.

Since then, the web has gone through many versions:

* HTML - created in 1990 and standardized in 1997 as HTML 4
* xHTML - a rewrite of HTML using XML in 2000
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - the current standard.

## Basic HTML5 Document

Here's a basic HTML5 web page:

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>My Web Page</title>
    </head>

    <body>
        <!-- This is a comment -->
        <h1>Hello World!</h1>
    </body>
</html>
```

Let's break this down and look at what's happening.

1. [`<!doctype html>`](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) tells the browser what kind of document this is, and how to interpret/render it
2.  [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html) the root element of our document: all other elements will be included with `<html>...</html>`.
3. [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) provides various information *about* the document as opposed to providing its content.  This is metadata that describes the document.
4. [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) an example of some piece of metadata, in this case defining the [character set](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#Attributes) used in the document: [utf-8](https://en.wikipedia.org/wiki/UTF-8)
5. [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) an example of a specific (named) metadata element: the document's title, shown in the browser's title bar.  There are a number of specific named metadata elements like this.
6. [`<body>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) the content of the document is contained within `<body>...</body>`.
7. `<!-- ... -->` a comment, similar to using `/* ... */` in C or JavaScript
8. [`<h1>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) a heading element (there are headings 1 through 6), which is a title or sub-title in a document.

Now let's try creating and loading this file in our browser:

1. Make a directory on your computer called `my-website`
1. Create a new file in `my-website` named `index.html`
1. Use Visual Studio Code to open your `my-website/index.html` file
1. Copy the HTML we just discussed above, and paste it into your editor
1. Save your `index.html` file 
1. In a terminal, navigate to your `my-website` directory
1. Start a web server by typing `npx http-server`
1. Open your web browser (Chrome, Firefox, etc) and enter `http://localhost:8080` in the URL bar
1. Make sure you can see a new page with `Hello World!` in black text.

Now let's make a change to our document:

1. Go back to your editor and change the `index.html` file so that instead of `Hello World!` you have `This is my web page.`
1. Save your `index.html` file.
1. Go back to your browser and hit the **Refresh** button.
1. Make sure your web page now says `This is my web page.`

Every time we update anything in our web page, we have to refresh the web page in our browser.
The web server will serve the most recent version of the file on disk when it is
requested.

## Common HTML Elements

There are dozens of [HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) you'll learn
and use, but the following is a good set to get you started.

### Metadata

Information *about* the document vs. the document's content goes in various [metadata elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Document_metadata):

* [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) - links from this document to external resources, such as CSS stylesheets
* [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) - metadata that can't be included via other elements
* [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) - the document's title

### Content Sections

These are [organizational blocks within the document](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning), helping give structure to the content and
provide clues to browsers, screen readers, and other software about how to present the content:

* [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) - introductory material at the top of a document
* [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) - content related to navigation (a menu, index, links, etc)
* [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) - the main content of the document.  For example, a news article's paragraphs vs. ads, links, navigation buttons, etc.
* [`<h1>, <h2>, ..., <h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1) - (sub) headers for different sections of content
* [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) - end material (author, copyright, links)

### Text Content

We organize [content into "boxes,"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content) some of which have unique layout characteristics.

* [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) - a generic container we use to attach CSS styles to a particular area of content
* [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) - an ordered list (1, 2, 3) of list items
* [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) - an unordered list (bullets) of list items
* [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) - a list item in an `<ul>` or `<ol>`
* [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) - a paragraph
* [`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote) - an extended quotation

### Inline Text

We also use [elements within larger text content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics) to indicate that certain words or phrases are to be shown differently:

* [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) - an "anchor" element, which will produce a hyperlink, allowing users to click and navigate to some other document.
* [`<code>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) - formats the text as computer code vs. regular text.
* [`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em) - adds emphasis to the text (often in italics)
* [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) - another generic container, used to define CSS styles

### Multimedia

In addition to text, HTML5 also defines a number of rich [media elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Image_and_multimedia):

* [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) - an element used to embed images in a document.
* [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) - an element used to embed sound in a document.
* [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) - an element used to embed video in a document
* [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) - a graphical area (rectangle) used to draw with either 2D or 3D using JavaScript.

### Scripting

We create dynamic web content and applications through the use of scripting:

* [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) - used to embed executable code in a document, typically JavaScript.

## Examples:

* [Lists: ordered and unordered](list-example.html)
* [Anchors: creating hyperlinks](anchor-example.html)
* [Images: using img](img-example.html)
* [Text: text sections](text-example.html)

<br>
<br>
<br>
<br>
<br>
<br>
# WEB222 WEEK 6
<br>
<br>
<br>
<br>
<br>
<br>


## Suggested Readings

* [HTML Tables (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables)
* [Images in HTML (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)
* [Video and Audio Content (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
* [HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)

## HTML Element Types: Block vs. Inline

Visual HTML elements are categorized into one of two groups:

1. [Block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements): create a "block" of content in a page, with an empty line before and after them.  Block elements fill the width of their parent element.  Block elements can contain other block elements, inline elements, or text.
1. [Inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements): creates "inline" content, which is part of the containing block.  Inline elements can contain other inline elements or text.

Consider the following HTML content:

```html
<body>
    <p>The <em>cow</em> jumped over the <b>moon</b>.</p>
</body>
```

Here we have a `<p>` paragraph element.  Because it is a block-level element, this paragraph will
fill its container (in this case the `<body>` element).  It will also have empty space added above and below it.

Within this block, we also encounter a number of other inline elements.  First, we have simple text.
However, we also see the `<em>` and `<b>` elements being used.  These will affect their content, but not
create a new block; rather, they will continue to flow inline in their container (the `<p>` element).

## Empty Elements

Many of the elements we've seen so far begin with an opening tag, and end with a closing tag: `<body></body>`.
However, not all elements need to be closed.  Some elements have no *content*, and therefore don't need
to have a closing tag.  We call these [empty elements](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element).

An example is the [`<br>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br) line break element.
We use a `<br>` when we want to tell the browser to insert a newline (similar to using `\n` in C):

```html
<p>Knock, Knock<br>Who's there?</p>
```

Other examples of empty elements include `<hr>` (for a horizontal line), `<meta>` for including metadata
in the `<head>`, and [a dozen others](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element).

## Grouping Elements

Often we need to group elements in our page together. We have a number of pre-defined element container options for how to achieve this, depending on what kind of content we are creating, and where it is in the document:

* [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) - introductory material at the top of a 
* [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) - content related to navigation (a menu, index, links, etc)
* [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) - the main content of the document.
* [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) - a self-contained composition, such as a blog post, article, etc.
* [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) - a group of related elements in a document representing one section of a whole
* [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) - end material (author, copyright, links)

Sometimes there is no appropriate semantic container element for our content, and we need something more generic.
In such cases we have two options:

* [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) - a generic block-level container
* [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) - a generic inline container

```html
<div>
    <p>This is an example of a using a div element. It also includes this <span><em>span</em> element</span>.</p>
    <p>Later we'll use a div or span like this to target content in our page with JavaScript or CSS styles.<p> 
</div>
```

## Tables

Sometimes our data is tabular in nature, and we need to present it in a grid.  A number of elements are used to create them:

* [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) - the root of a table in HTML
* [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption) - the optional title (or caption) of the table
* [`<thead>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead) - row(s) at the top of the table (header row or rows)
* [`<tbody>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody) - rows that form the main body of the table (the table's content rows)
* [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot) - row(s) at the bottom of the table (footer row or rows)

We define rows and columns of data within the above using the following:

* [`<tr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr) - a single row in a table
* [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) - a single cell (row/column intersection) that contains table data
* [`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th) - a header (e.g., a title for a column) 

We can use the `rowspan` and `colspan` attributes to extend table elements beyond their usual bounds,
for example: have an element span two columns (`colspan="2"`) or have a heading span 3 rows (`rowspan="3")`.

```html
<table>
    <caption>Order Information</caption>

    <thead>
        <tr>
            <th>Quantity</th>
            <th>Colour</th>
            <th>Price (CAD)</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>1</td>
            <td>Red</td>
            <td>$5.60</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Blue</td>
            <td>$3.00</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Blue</td>
            <td>$1.50</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <th colspan="2">Total</th>
            <th>$26.60</th>
        </tr>
    </tfoot>
</table>
```

## Multimedia: `<img>`, `<audio>`, `<video>`

HTML5 has built in support for including images, videos, and audio along with text.
We specify the media source we want to use, and also how to present it to the user
via different elements and attributes

```html
<!-- External image URL, use full width of browser window -->
<img src="https://images.unsplash.com/photo-1502720433255-614171a1835e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=344dfca9dc8cb137a4b1c2c711752bc5">

<!-- Local file cat.jpg, limit to 400 pixels wide -->
<img src="cat.jpg" alt="Picture of a cat" width="400">
```

HTML5 has also recently added the [`<picture>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
, to allow for an optimal image type to be chosen from amongst a list of several options.

We can also include sounds, music, or other audio:

```html
<!-- No controls, music will just auto-play in the background. Only MP3 source provided -->
<audio src="https://ia800607.us.archive.org/15/items/music_for_programming/music_for_programming_1-datassette.mp3" autoplay></audio>

<!-- Audio with controls showing, multiple formats available -->
<audio controls>
    <source src="song.mp3" type="audio/mp3">
    <source src="song.ogg" type="audio/ogg">
    <p>Sorry, your browser doesn't support HTML5 audio. Here is a <a href="song.mp3">link to the audio</a> instead</p>.
</audio>
```

Including video is very similar to audio:

```html
<!-- External Video File, MP4 file format, show controls -->
<video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls></video>

<!-- Local video file in various formats, show with controls -->
<video width="320" height="240" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.ogg" type="video/ogg">
    <source src="video.webm" type="video/webm">
    <p>Sorry, your browser doesn't support HTML5 video</p>
</video>
```

NOTE: the `<audio>` and `<video>` elements must use source URLs that point to actual audio or video files
and not to a YouTube URL or some other source that is actually an HTML page.

## Including Scripts

We've spent a good portion of the course learning about JavaScript.  So far, all of our code has
been written in a stand-alone form, executed in the Firefox Scratchpad, or by using node.js.

Our ultimate goal is to be able to run our JavaScript programs within web pages and applications.
To do that, we need a way to include JavaScript code in an HTML file.  Obviously HTML isn't anything
like JavaScript, so we can't simply type our code in the middle of an HTML file and expect the browser
to understand it.

Instead, we need an HTML element that can be used to contain (or link to) our JavaScript code.  HTML provides
such an element in the form of the [`<script>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script).

We can use `<script>` in one of two ways.

### Inline Scripts

First, we can embed our JavaScript program directly within the content area of a `<script>` element:

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Web Page with Script</title>
    </head>

    <body>
        <script>
            console.log('Hello World!');
        </script>
    </body>
</html>
```

Such `<script>` elements can occur anywhere in your HTML, though it is common to put them at the end of the `<body>`.
We can also include more than one, and each shares a common global environment, which is useful for combining
scripts:

```html
<script>
    // Define a global variable `msg` with a String
    var msg = "Hello World!";
</script>

<script>
    // Access the global variable `msg`, defined in another <script>, but within the same JS environment
    console.log(msg);
</script>
```
### External Scripts Linked via URL

As our JavaScript programs get larger, embedding them directly within the HTML file via an inline `<script>`
starts to become unwieldy.  For very small scripts, and debugging or experimentation, inline scripts are fine.
However, HTML and JavaScript aren't the same thing, and it's useful to separate them into their own files for
a number of reasons.

First, browsers can cache files to improve load times on a web site.  If you embed a large JavaScript file in
the HTML, it can't be cached.

Second, your HTML becomes harder to read.  Instead of looking at semantic content about the structure of your page,
now you have script mixed in too.  This can make it harder to understand what you're looking at while debugging.

Third, there are lots of tools for HTML, and even more for JavaScript, that only work when fed the proper file type.
For example, we often use linters or bundling tools in JavaScript.  We can't do that if our JavaScript is combined
with HTML markup.

For these and other reasons, it's common to move your JavaScript programs to separate files with a `.js` file extension.
We then tell the browser to load and run these files as needed via our `<script>` tag like so:

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Web Page with Script</title>
    </head>

    <body>
        <script src="script.js"></script>
    </body>
</html>
```

In this case, we have no content within our `<script>` element, and instead include a `src="script.js"`
attribute.  Much like the `<img>` element, a `<script>` can include a `src` URL to load at runtime.
The browser will begin by loading your `.html` file, and when it encounters the `<script src="script.js">` element,
it will begin to download `script.js` from the web server, and then run the program it contains. 

We can combine both of these methods, and include as many scripts as we need.  The scripts we include can be:

* embedded inline in the HTML
* a relative URL to the same web server that served the HTML file
* an absolute URL to another web server somewhere else on the web

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Web Page with Scripts</title>
    </head>

    <body>
        <script src="https://scripts.com/some/other/external/script/file.js"></script>
        <script src="local-script.js"></script>
        <script>
            // Use functions and Objects defined in the previous two files
            doSomethingAmazing();
        </script>
    </body>
</html>
```

## Validating HTML

It's clear that learning to write proper and correct HTML is going to take practice.  There are
lots of elements to get used to, and learn to use in conjunction.  Also each has various attributes
that have to be taken into account.

Browsers are fairly liberal in what they will accept in the way of HTML.  Even if an HTML file isn't
100% perfect, a browser can often still render something.  That said, it's best if we do our best
to provide valid HTML.

In order to make sure that your HTML is valid, you can use an HTML Validator.  There are a few available online:

* https://html5.validator.nu/
* https://validator.w3.org/

Both allow you to enter a URL to an existing web page, or enter HTML directly in a text field.  They
will then attempt to parse your HTML and report back on any errors or warnings, for example: an element missing 
a closing tag.
