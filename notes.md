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

















