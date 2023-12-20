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
8. What does the following code using map with an array output?
   - map applies a function to each element in an array, like this:
```js
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
```
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
```js
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
```
   - Can also use it to add event listeners, as discussed above
12. By default, the HTML span element has a default CSS display property value of:
    - inline
    - The following are block-level elements, which always start on a new line and take up the full width available
      - div, h1-6, p, form, header, footer, section
    - Inline elements
      - span, a, img
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
    - Javascript executes as a single threaded application, so only one piece of code is ever running, but it can run in parallel
    - promise object is either in states pending, fufilled, or rejected
    - Create promise by calling Promise constructor and passing it an executor funciton that runs the asych operation
    - resolve sets it to fulfilled state, reject sets it to rejected state
    - can use the promise object, and chain then, catch, and finally to it. then is called if the promise is fulfilled, cathc if it is rejected, and finally is always called after it is complete (no longer pending)
    - Alternatively, you can use async and await to do it
      - The async keyword declares that a function returns a promise. The await keyword wraps a call to the async function, blocks execution until the promise has resolved, and then returns the result of the promise.
      - That is to say, with await, I don't think you could ever have something return "pending"
    - In the following code, setTimeout takes two parameters: an to do when the time runs out, and how long to wait for
```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('success');
    } else {
      reject('error');
    }
  }, 10000);
});

coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```
```js
// async/await conversion

function pickupPizza() {
  const order = createOrder();

  // Promise
  placeOrder(order)
    .then((order) => serveOrder(order))
    .catch((order) => {
      orderFailure(order);
    });
}

async function pickupPizza() {
  const order = createOrder();

  // async/await (placeOrder/makePizza have promises in them)
  try {
    await placeOrder(order);
    await makePizza(order);
    serveOrder(order);
  } catch (order) {
    orderFailure(order);
  }
}
```

Other notes: 
- Local storage
```js
let user = 'Alice';

let myObject = {
  name: 'Bob',
  info: {
    favoriteClass: 'CS 260',
    likesCS: true,
  },
};

let myArray = [1, 'One', true];

localStorage.setItem('user', user);
localStorage.setItem('object', JSON.stringify(myObject));
localStorage.setItem('array', JSON.stringify(myArray));

console.log(localStorage.getItem('user'));
console.log(JSON.parse(localStorage.getItem('object')));
console.log(JSON.parse(localStorage.getItem('array')));
```
```
//output
Alice
{name: 'Bob', info: {favoriteClass: 'CS 260', likesCS: true}
[1, 'One', true]
```
- CSS animations
  - you can define a demo using something like @keyframes, and then add it to that element
```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 20vh;
  }
}
```
- Rest: takes the "rest" of your parameters
```js
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```
- Spread: does the opposite, takes an object that is iterable (e.g. array or string) and expands it into a function's parameters.
```js
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```

## Final Notes: 
1. What ports are used for HTTP, HTTPS, SSH?
   - HTTPS: 443, SSH: 22, HTTP: 80
2. What do HTTP status codes in the 300, 400, 500 range indicate?
   - 2xx = success. 3xx = redirect to some other location, or that the previoulsy cached resource is still valid. 4xx = client errors, the request is invalid. 5xx = server errors, the request cannot be satisfied due to an error on the server
3. What does the HTTP header content-type allows you to do?
   - the format of the content being sent, described using standard MIME types
4. What do the following attributes of a cookie do?
   - Domain - The Domain attribute specifies which server can receive a cookie. If the server does not specify a Domain, the cookies are available on the server but not on its subdomains.
   - Path - The Path attribute indicates a URL path that must exist in the requested URL in order to send the Cookie header.
   - SameSite - The SameSite attribute lets servers specify whether/when cookies are sent with cross-site requests (where Site is defined by the registrable domain and the scheme: http or https). This provides some protection against cross-site request forgery attacks (CSRF). It takes three possible values: Strict, Lax, and None.
   - HTTPOnly - A cookie with the HttpOnly attribute is inaccessible to the JavaScript Document.cookie API; it's only sent to the server.
5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
   - ??
6. Given the following Express service code: What does the following JavaScript fetch return?
   - fetch is the way to make HTTP requests from JavaScript. The fetch function is built into the browser's JavaScript runtime. This means you can call it from JavaScript code running in a browser.
   - Post example:
```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```
7. Given the following MongoDB query `{ cost: { $gt: 10 }, name: /fran.*/}` select all of the matching documents.
   - / is whatever, * at end has no effect? $ means last character, ^ means it starts with that
1. How should you store user passwords in a database?
   - hashed, so they can't be used by someone who hacks the db
1. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
   - ??
1. What is the WebSocket protocol used for?
   - The core feature of WebSocket is that it is fully duplexed. This means that after the initial connection is made from a client, using vanilla HTTP, and then upgraded by the server to a WebSocket connection, the relationship changes to a peer-to-peer connection where either party can efficiently send data at any time.
   - still only between two parties, so if you want three, there has to be a coordinator
   - By specifying a port when you create the WebSocketServer, you are telling the server to listen for HTTP connections on that port and to automatically upgrade them to a WebSocket connection if the request has a connection: Upgrade header.
1. What is JSX and how are the curly braces rendered?
   - React abstracts HTML into a JavaScript variant called JSX. JSX is converted into valid HTML and JavaScript using a preprocessor called Babel. Curly braces = JS
12. Assuming a HTML document with a `<div id="root"></div>` element, what content will the following React component generate?
    - three headers that all say Hello, ___ with the name of the person passed in
```jsx
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
```
13. Assuming a HTML document with a `<div id="root"></div>` element, what content will the following React component generate?
    - just a list of numbers with bullets in front (since it is ul)
```jsx
    function Numbers() { 
      const numbers = [1, 2, 3, 4, 5];
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return(<ul>{listItems}</ul>)
    }
    const root = ReactDOM.createRoot(document.getElementById('root')); 
    root.render(<Numbers/>);
```
14. What does the following React component do?
    - button with a click count
```jsx
function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
15. What are React Hooks used for?
    - React hooks allow React function style components to be able to do everything that a class style component can do and more.
    - includes useState
1. What is the useEffect hook used for?
   - allows you to represent lifecycle events. For example, you could run a function every time the component completes rendering, or rerender every time a button is changed
   - You can also take action when the component cleans up by returning a cleanup function from the function registered with useEffect
```jsx
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```
17. What does this code do?
    - sets the route - what things are rendered based on what the url is 
```jsx
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
18. What role does npm play in web development?
   - npm is the node package manager, allows you to use preexisting packages of JavaScript for implementing common tasks.
   - First install the package locally on your machine using the Node Package Manager (NPM), and then include a require statement in your code that references the package name. NPM is automatically installed when you install Node.js.
19. What does package.json do in a npm project?
   - This file contains three main things: 1) Metadata about your project such as its name and the default entry JavaScript file, 2) commands (scripts) that you can execute to do things like run, test, or distribute your code, and 3) packages that this project depends upon.
   - With NPM and the joke package installed, you can now use the joke package in a JavaScript file by referencing the package name as a parameter to the require function. This is then followed by a call to the joke object's getRandomDadJoke function to actually generate a joke.
1. What does the fetch function do?
   - see above
1. What does node.js do?
   - Node.js was the first successful application for deploying JavaScript outside of a browser. This changed the JavaScript mindset from a browser technology to one that could run on the server as well. This means that JavaScript can power your entire technology stack.  
1. What does Vite do?
   - Vite bundles your code quickly, has great debugging support, and allows you to easily support JSX, TypeScript, and different CSS flavors.

Additionally: 
1. What does Express do?
   - works great for little projects where you are trying to quickly serve up some web content, but to build a production ready application you need a framework with a bit more functionality for easily implementing a full web service. This is where the Node package Express come in. Express provides support for:
     - Routing requests for service endpoints
     - Manipulating HTTP requests with JSON body content
     - Generating HTTP responses
     - Using middleware to add functionality












