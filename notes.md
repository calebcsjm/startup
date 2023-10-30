# Notes for CS 260

Consol:
- Vim:
  - copy a line is yy
  - paste a line is p
  - 0 takes you to the front of a line, A to the end
  - :u is undo
- Scripting:
  - Functions: writen as function_name() {...}, new terminal window to use

Git/GitHub:
- Run `git config pull.rebase false` to merge conflicts
   - Conflicts only occur when the exact same line has been changed - otherwise it can combine them without any issues

Remote shell to web server:
- ssh -i cs260_key.pem ubuntu@52.72.74.101

HTML:
- Some sample code from my CodePen
```html
<body>
  <p>Body</p>
  <header>
    <h1>Caleb Harding</h1>
    <nav>Navigation
      <div><a href=www.byu.edu>BYU</a></div>
      <div><a href=www.familysearch.org>FamilySearch</a>
      </div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>apples</li>
        <li>bananas</li>
        <li>oranges</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
        <tr>
          <td>HTML</td>
          <td>CSS</td>
          <td>JavaScript</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
      <img src="https://usustatesman.com/wp-content/uploads/2018/06/byu-logo.jpg" width="200" height="200">
    </aside>
  </main>

  <footer>
    <a href="https://github.com/calebcsjm/startup">My GitHub</a>
  </footer>
</body>
```

#### CSS

Three ways to do it: 
- In an HTML element: `<p style="color:green">CSS</p>`
- In a <style> element in the HTML head
```html
  <head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
```
- A link to a CSS sheet in the header `<link rel="stylesheet" href="styles.css" />` **preferred

Some CSS notes:
- descendant combinator - do a list of things in the declaration `section h2{}` only applies to h2 elements that are in a section element
- what is the difference between id and class?
  - class can be a bunch of elements, id there is only one thing
  - class gets defined with `.classname`, id with `#idname`
- Attribute selector - select elements of a type with some attribute `p[class='summary'] {}`
- Fonts: Two ways to import
Way 1
```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.woff2');
}

p {
  font-family: Quicksand;
}
```
Way 2
```css
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```
Responsive Design: 
- elements can be `display: ` none, block, inline, flex, or grid, which changes what they do on the page.
- for phone compatibility, include this at the top of the page: `<meta name="viewport" content="width=device-width,initial-scale=1" />`
- Example CSS for the flex assignment:
```css
* {
  font-family: sans-serif;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  flex: 0 50px;
  font-size: 20px;
  background: hsl(223, 57%, 38%);
  color: white;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

main {
  flex: 1;
  font-size: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

div {
  padding: 0 0.5em;
}

footer {
  flex: 0 50px;
  background: hsl(180, 30%, 15%);
  color: white;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
```
Midterm Prep: 
1. In the following code, what does the link element do?
   - Link element tells it where a css file is `<link rel="stylesheet" href="main.css" />`
   - The <link> tag defines the relationship between the current document and an external resource.
   - Also used to define language of text in linked document, what the relationship is, etc. 
2. In the following code,  what does a div tag do?
   - Defintes a division or a section in HTML doc
3. In the following code, what is the difference between the #title and .grid selector?
   - This is likely CSS code, #title defines the attributes for a item of a specific id, where .grid defines the attribues for all the grid type objects
   - Can select HTML element by its tag, CSS class, id, or DOM position
   - `p {}` does all paragraph elements
   - `#para1 {}` does the element with `id="para1"` (id can't start with num)
   - `.center {}` does all the elements with `class="center"`
   - `p.center {}` does p elements that are class center
   - `*` does all elements
   - Can also do `h1, h2, p {}` to define together
   - or do extended ones like `h1:nth-child(2)`
   - descendant combinator is a space deliited list of values where each item in the list is a descendant of the previous item - can also do stuff like `section h2 {color: red}`
   - siblings is ~ `hs ~ p {}`
   - attribute selector `p[class="summary"]`, can be used for any defined attribute, including things like href
5. In the following code, what is the difference between padding and margin?
   - Margin is distance that external elements have to be from the border, where padding is distance that internal elements have to be from the border for that item
7. Given this HTML and this CSS how will the images be displayed using flex?
   - Block display is just a block basically accross that portion of the screen
   - Inline is, well, inline
   - Grid and Flexbox. These are both CSS display modes that automatically respond to screen sizes to position and resize their child elements.
   - Flex is flexible, and can be defined with `display: flex;` and then direction as `flex-direction: row;` or `flex-direction: column;`
   - You can define `flex: __;` for each element in the flex as a number, percentage, etc. to determine how much of the flex space it should take up
   - Grid is self-explanatory
8. What does the following padding CSS do?
   - Padding usually looks like: `padding: v1 ... v4`. If only one value, it does all sides. 2 does top/bottom and left/right. 3 does top, left/right, bottom. 4 does top, right, bottom, left
   - can be defined in length, percentage of the width of the containing element, or inherit from the parent
   - if you define width and padding, it will make the width bigger by adding the padding to it on both sides. Stop this by using the CSS setting `box-sizing: border-box;`
   - Units are usually em (1 em = the size of the font), px (varies, defined to be small but visible) rem (root em of the doc), %, vw and vh (1/100th of the windows width and height), etc. 
7. What does the following code using arrow syntax function declaration do?
   - some basic arrow function notation
```js
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```
   - Can't be used for constructors or iterator generators
   - `() => 3` -> `()` contains the parameters (none in this instance), and then the arrow points to what it does. That can be curly braces with a operations and a return statement, or just a constant return like the function above has.
   - Inherit `this` pointer from the scope where it is created, not called.
8. _What does the following code using map with an array output?_
9. What does the following code output using getElementByID and addEventListener?
   - `const setHabitButton = document.getElementById("setHabitButton");` gets an element
   - Then the add event listener could attach an event listener to that element so that something happens when it is called
10. What does the following line of Javascript do using a # selector?
    - The # selector is used in Javascript when referencing something by its id: `const habitNameEl = document.querySelector('#habit-name');`
    - often used with a document querySelector as above, which returns the first element that matches the specified selector
    - selectors can be complex: `const el = document.querySelector("div.user-panel.main input[name='login']");`
11. Which of the following are true? (mark all that are true about the DOM)
    - The Document Object Model (DOM) is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML.
     - The browser provides access to the DOM through a global variable name document that points to the root element of the DOM. If you open the browser's debugger console window and type the variable name document you will see the DOM for the document the browser is currently rendering.
     - Everything in HTML has a node in the DOM, which forms a big tree
     - Add stuff to the DOM
```js
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
```
  - You can change all the text in the element by setting el.textContent = "___", or inject straight HTML
```
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
```
   - Can also use it to add event listeners, as discussed above
12. By default, the HTML span element has a default CSS display property value of:
    - inline
    - _**should I google others?**_
13. How would you use CSS to change all the div elements to have a background color of red?
    - `div {background-color: red;}`
14. How would you display an image with a hyperlink in HTML?
    - `<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />`
15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
    - CSS box model is essentially a box that wraps around every HTML element. It consists of: content, padding, borders and margins.
16. Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?
    - use a selector (see #3 above) to differentiate between the two 
17. What will the following code output when executed using a for loop and console.log?
    - NA, need to see the code
18. How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
    - `const el = document.selectElementByID("byu"); el.style.color = "green";`
19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
    - p, ol (numbers them, sub-element li), ul (bullets instead of numbering sub-element also li), h2, h1, h3
20. How do you declare the document type to be html?
    - top of the document, add `<!DOCTYPE html>`
21. What is valid javascript syntax for if, else, for, while, switch statements?
    - Note: `let` sets var but you can change value, `const` will throw error if you try to change it
    - `===` is the equality operator for strings
    - if is like C++ - if () {} else if () {} else {}
    - for (let i = 0; i < 2; i++) {}
    - for in: iterates over an object's property names `for(const name in obj) {}` (the key if its a dictionary, the index if it is an array)
    - for of: iterates over an iterables propery values `for (const val of arr) {}`
    - do {} while ();
    - while () {};
    - switch(a value) { case x: stuff; break; case y: stuff; break; default: stuff }
    - all of them can use a break or continue statement
22. What is the correct syntax for creating a javascript object?
    - object is basically anything with properties - can be a object literal, standard object like Date, the Object object, or an instance of a class you create
    - can use the new operator, proporties can be referenced with obj.prop or obj['prop']
    - functions that return an object (even if it is just a string literal) are considered constructors, even if they aren't part of a class
    - for inheritance, you can do `class Employee extends Person` and use super() in the constructor to call the parent constructor
23. Is is possible to add new properties to javascript objects?
    - yes. these properties can include functions too
```js
const obj = new Object({a:3});
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
```
```js
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```
24. If you want to include JavaScript on an HTML page, which tag do you use?
    - script: `<script src="login.js"></script>`. This is the most common way, which references an external source. You can also just put code right in the script tag, like this: `<script> document.getElementById("demo").innerHTML = "Hello JavaScript!"; </script>`
    - If your code references HTML elements during initialization, put it at the end of the HTML file (like right before the </body> tag
26. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
    - NA, need to see code. Could be a selector, as described above. Could also be a function
28. Which of the following correctly describes JSON?
    - javascript object notation, data all occurs in name/value pairs, syntactically identical to the code for creating JavaScript objects
    - key is always a string, value must be one fo the valid JSON data types (string, number, boolean, array, object, null)
    - always encoded with UTF-8
    - conversion:
```js
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```
30. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
    - chmod: used to change the access mode of a file `chmod u+rwx [file_name]` gives u (owner) read, write, execute permissions
    - mv: move,`mv /path/to/file/source_file_name /path/to/dest/name`
    - man: used to display the user manual of any command that we can run on the terminal, like `man ls`
    - ssh is secure shell, connect network devices
    - ps: process status, shows information on processes currently running on a system
    - wget: download files from the internet `wget http://example.com/sample.php`
32. Which of the following console command creates a remote shell session?
    - ssh: like `ssh -i cs260_key.pem ubuntu@52.72.74.101`
34. Which of the following is true when the -la parameter is specified for the ls console command?
    - it lists all the files, including those that are hidden (start with .), and use the long list formt (read and write permissions, etc.) with a and l, respectively
    - long listing includes permission, owner, file size, date modified/created, name
36. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
    - top level domain: click, root domain: bozo.click, subdomain: banana.fruit
38. Is a web certificate is necessary to use HTTPS.
    - Yes. To use HTTPS with your domain name, you need a SSL or TLS certificate installed on your website. Your web host (Web Hosting Provider) may offer HTTPS security or you can request a SSL/TLS certificate from Certificate Authorities and install it yourself
40. Can a DNS A record can point to an IP address or another A record.
    - An A (address) record maps a domain to the physical IP address of the computer hosting that domain
    - A record points your domain or subdomain to an IP address, and will always point to an IP address
    - CNAME (canonical name, aka alias) points your domain or subdomain to the IP address of a different domain, and always point to domain names
42. Port 443, 80, 22 is reserved for which protocol?
    - 443 is for HTTPS, 80 is for HTTP, and 22 is for SSH. 443 encrypts network data packest before data transmission takes place
    - HTTP is hypertext transfer protocol
44. What will the following code using Promises output when executed?















