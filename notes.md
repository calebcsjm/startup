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
