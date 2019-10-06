---
title: WEB700 Week 6
layout: default
---

## WEB700 Week 6 Notes

### HTML

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

#### HTML Document

First [HTML page ever created](http://info.cern.ch/hypertext/WWW/TheProject.html) was
built by [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) on August 6, 1991.

Since then, the web has gone through many versions:

* HTML - created in 1990 and standardized in 1997 as HTML 4
* xHTML - a rewrite of HTML using XML in 2000
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - the current standard.

#### Basic HTML5 Document

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

During the last couple of classes we learned how to create a simple web server using [Node.js](https://nodejs.org/en/) with the [Express.js](https://expressjs.com/) module.  We will be using this code once again to create a local web server, which will be responsible for returning requests for our HTML document on the default route,  ie "/".

**NOTE:** Try to familiarize yourself with these steps, as we will be doing this over and over in class, every time we wish to create a new web server.  A more detailed guide can be found as a part of [the week 4 notes](week04) ("Building a simple web server using Node.js with Express.js") as well as within the [Heroku Guide](/web700/getting-started-with-heroku).

1. Make a directory on your computer called `test-server`
2. Open Visual Studio Code and choose **File &gt; Open** to open your newly created `test-server` folder
3. Create a new file called `server.js`
4. Open the Integrated terminal useing the keyboard shortcut (ctrl + `` ` ``) or select "View" -> "integrated terminal" from the top menu.  
3. Run the **npm init** command to generate your `package.json` file (you can choose all of the defaults)
4. Run the command `npm install express --save`
5. Enter the following code for your `server.js` file

    ```javascript
    var HTTP_PORT = process.env.PORT || 8080;
    var path = require("path");
    var express = require("express");
    var app = express();

    // setup a 'route' to listen on the default url path
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname,"/views/hello.html"));
    });

    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, function(){ console.log('server listening on: ' + HTTP_PORT )});
    ```

6. Create a new folder in `test-server` named `views`
7. Within the `views` folder, create a file called `hello.html`
8. Open the newly created `hello.html` file and paste the html code from above and save the file
9. Go back to the Integrated terminal and type the command `node server.js`.  You should see the message: `server listening on: 8080`
10. Open your web browser (Chrome, Firefox, etc) and enter `http://localhost:8080` in the URL bar
11. Make sure you can see a new page with `Hello World!` in black text.

Now let's make a change to our document:

1. Go back to your editor and change the `hello.html` file so that instead of `Hello World!` you have `This is my web page.`
2. Save your `hello.html` file.
3. Go back to your browser and hit the **Refresh** button.
4. Make sure your web page now says `This is my web page.`

Every time we update anything in our web page, we have to refresh the web page in our browser.
The web server will serve the most recent version of the file on disk when it is
requested.

<br>

### Common HTML Elements

There are dozens of [HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) you'll learn
and use, but the following is a good set to get you started.

#### Metadata

Information *about* the document vs. the document's content goes in various [metadata elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Document_metadata):

* [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) - links from this document to external resources, such as CSS stylesheets
* [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) - metadata that can't be included via other elements
* [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) - the document's title

#### Content Sections

These are [organizational blocks within the document](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning), helping give structure to the content and
provide clues to browsers, screen readers, and other software about how to present the content:

* [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) - introductory material at the top of a document
* [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) - content related to navigation (a menu, index, links, etc)
* [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) - the main content of the document.  For example, a news article's paragraphs vs. ads, links, navigation buttons, etc.
* [`<h1>, <h2>, ..., <h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1) - (sub) headers for different sections of content
* [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) - end material (author, copyright, links)

#### Text Content

We organize [content into "boxes,"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content) some of which have unique layout characteristics.

* [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) - a generic container we use to attach CSS styles to a particular area of content
* [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) - an ordered list (1, 2, 3) of list items
* [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) - an unordered list (bullets) of list items
* [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) - a list item in an `<ul>` or `<ol>`
* [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) - a paragraph
* [`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote) - an extended quotation

#### Inline Text

We also use [elements within larger text content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics) to indicate that certain words or phrases are to be shown differently:

* [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) - an "anchor" element, which will produce a hyperlink, allowing users to click and navigate to some other document.
* [`<code>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) - formats the text as computer code vs. regular text.
* [`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em) - adds emphasis to the text (often in italics)
* [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) - another generic container, used to define CSS styles

#### Multimedia

In addition to text, HTML5 also defines a number of rich [media elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Image_and_multimedia):

* [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) - an element used to embed images in a document.
* [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) - an element used to embed sound in a document.
* [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) - an element used to embed video in a document
* [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) - a graphical area (rectangle) used to draw with either 2D or 3D using JavaScript.

#### Scripting

We create dynamic web content and applications through the use of scripting:

* [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) - used to embed executable code in a document, typically JavaScript.

<br>

### HTML Element Types: Block vs. Inline

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

<br>

### Empty Elements

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

<br>

### Grouping Elements

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

<br>

### Tables

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

<br>

### Multimedia: `<img>`, `<audio>`, `<video>`

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

<br>

### Including Scripts

JavaScript is an extremely versatile language.  So far, we have been using it in the context of creating a web server using Node.js and the Express.js framework.  However, it can also be executed within the context of a web *browser* (Chrome, Firefox, etc.).  While we will not be focusing on writing client-side JavaScript in this course, it is still valuable to know how to include scripts in your HTML code.  For example, the JavaScript code included with the [Bootstrap Framework](https://getbootstrap.com/docs/4.3/getting-started/introduction/).  

#### External Scripts Linked via URL

To reference an "external script" within your HTML code, the following &lt;script&gt; code can be used.  This JavaScript file can be located either on your working server, or somewhere on the web (accessible via it's full URL).

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

Notice how we include a `src="script.js"` attribute.  Much like the `<img>` element, a `<script>` can include a `src` URL to load at runtime.
The browser will begin by loading your `.html` file, and when it encounters the `<script src="script.js">` element,
it will begin to download `script.js` from the web server, and then run the program it contains. 

Using this syntax, we can include as many scripts as we need.  The scripts we include can be:

* an absolute URL to another web server somewhere else on the web
* a relative URL to the same web server that served the HTML file
* embedded inline in the HTML (by placing JavaScript content within the &lt;script&gt; element - not as common, and not used in this course)

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
<br>

### Validating HTML

It's clear that learning to write proper and correct HTML is going to take practice.  There are
lots of elements to get used to, and learn to use in conjunction.  Also each has various attributes
that have to be taken into account.

Browsers are fairly liberal in what they will accept in the way of HTML.  Even if an HTML file isn't
100% perfect, a browser can often still render something.  That said, it's best if we do our best
to provide valid HTML.

In order to make sure that your HTML is valid, you can use an HTML Validator.  There are a few available online:

* [https://html5.validator.nu/](https://html5.validator.nu/)
* [https://validator.w3.org/](https://validator.w3.org/)

Both allow you to enter a URL to an existing web page, or enter HTML directly in a text field.  They
will then attempt to parse your HTML and report back on any errors or warnings, for example: an element missing 
a closing tag.
