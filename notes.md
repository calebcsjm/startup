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
```
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
```
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
```
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.woff2');
}

p {
  font-family: Quicksand;
}
```
Way 2
```
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```
Responsive Design: 
- elements can be `display: ` none, block, inline, flex, or grid, which changes what they do on the page.
- for phone compatibility, include this at the top of the page: `<meta name="viewport" content="width=device-width,initial-scale=1" />`
- Example CSS for the flex assignment:
```
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
9. What does the following code using arrow syntax function declaration do?


What does the following code using map with an array output?
What does the following code output using getElementByID and addEventListener?
What does the following line of Javascript do using a # selector?
Which of the following are true? (mark all that are true about the DOM)
By default, the HTML span element has a default CSS display property value of: 
How would you use CSS to change all the div elements to have a background color of red?
How would you display an image with a hyperlink in HTML?
In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?
What will the following code output when executed using a for loop and console.log?
How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
How do you declare the document type to be html?
What is valid javascript syntax for if, else, for, while, switch statements?
What is the correct syntax for creating a javascript object?
Is is possible to add new properties to javascript objects?
If you want to include JavaScript on an HTML page, which tag do you use?
Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
Which of the following correctly describes JSON?
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
Which of the following console command creates a remote shell session?
Which of the following is true when the -la parameter is specified for the ls console command?
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
Is a web certificate is necessary to use HTTPS.
Can a DNS A record can point to an IP address or another A record.
Port 443, 80, 22 is reserved for which protocol?
What will the following code using Promises output when executed?















