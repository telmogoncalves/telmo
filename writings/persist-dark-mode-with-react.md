---
title: "Persist Dark Mode with React"
date: "2020-05-10"
og:
  description: "How to persist dark mode with ReactJS"
  image: "https://telmo.im/og/persistdarkmodereact.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

> If you're the type of person that likes to go directly to the code here's the [CodesandBox Link](https://codesandbox.io/s/affectionate-varahamihira-u5tvt?file=/src/App.js)

Before we start I suggest you take a look at [this post](https://telmo.im/writings/dark-light-mode-css-javascript), we'll be using that same approach but with React.

<br>

Let us get started with a simple React component called `App`:

```jsx
import React from "react";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello stranger!</h1>
      <h2>Lets persist our dark theme, shall we?</h2>
    </div>
  );
}

export default App;
```

Now lets use `useState` to set our default value for `darkMode`, which will be `false`:

```js:!-1,6
import React, { useState } from "react";

import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // ...
```

Now, lets change our `div` to include a `data-theme` attribute, we'll check if the value of `darkMode` is `true` and set a value of `dark`, otherwise it's `light`:


```jsx:!-5
// ...

function App() {
  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <h1>Hello stranger!</h1>
      <h2>Lets persist our dark theme, shall we?</h2>
    </div>
  );
}

// ...
```

Now if you change our `useState()` from `false` to `true` you should see that it sets the background of `.App` to black and the text color to white.

---

## Switch

Let us build a switch between dark and light mode. We can start by adding a new function that sets our theme either to `light` or to `dark` mode:

```js:7
import React, { useState } from "react";

import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(darkMode ? false : true);

  // ...
```

We can still use a little trick on `darkMode ? false : true`, we can change it to `!darkMode`, what does this means?

Since `darkMode` is a boolean we're _saying_ we want the opposite value, see the output:

```js
var darkMode = true;

darkMode = !darkMode; // false
darkMode = !darkMode; // true
darkMode = !darkMode; // false
darkMode = !darkMode; // true
```

We can do this all day!

---

## Button Switcher

Now that we have our `toggleDarkMode` function in place let us create a `<button>` to use it:

```jsx:4-6
function App() {
  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <button onClick={toggleDarkMode}>
        Dark mode toggler
      </button>
      <h1>Hello stranger!</h1>
      <h2>Lets persist our dark theme, shall we?</h2>
    </div>
  );
}
```

If you try it out is should work just fine, switching from `light` to `dark` mode and vice-versa. We can still use our `darkMode` state to manipulate what the button displays:

```jsx:!-2
<button onClick={toggleDarkMode}>
  {darkMode ? "Lights ON!" : "Lights OFF!"}
</button>
```

Let us move on.

---

## Persist

This is all good, but what if you switch to dark mode and refresh the page? We're back to light mode. Let us fix that shall we?

For that we'll be using React's `useEffect` and `localStorage`. First we need to import:

```js:!-1
import React, { useState, useEffect } from "react";
```

With `useEffect` we can run some code every time a value changes, in this case we want to run our code when `darkMode` changes:

```js:9-11
import React, { useState, useEffect } from "react";

import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(darkMode ? false : true);

  useEffect(() => {
    console.log(`Is in dark mode? ${darkMode}`);
  }, [darkMode]);

  // ...
```

If you check the console you'll see what's happening every time we toggle dark mode. Now that we know this is working we can store our value in `localStorage`:

```js:-2,3
useEffect(() => {
  console.log(`Is in dark mode? ${darkMode}`);
  localStorage.setItem("DARK_MODE", darkMode);
}, [darkMode]);
```

Alright, all good so far, now we just need read the value of `DARK_MODE` from `localStorage` and set our default `darkMode` value:

```js:1,!-2
const storedDarkMode = localStorage.getItem("DARK_MODE");
const [darkMode, setDarkMode] = useState(storedDarkMode);
```

Give it a try, change to dark mode and then refresh your page. Boom 💥

That's all, hope it helped you in some way.
