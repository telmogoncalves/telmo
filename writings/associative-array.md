---
title: "Associative array"
date: "2020-09-21"
og:
  description: "Use associative array to clean up your code."
  image: "https://telmo.im/og/too-many-states.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

As the months pass by the more I know about React, in this article I just want to go through a *trick* I use when a component starts to get a little confusing with conditionals. Let us take a look at a simple dummy few functions to run a `console.log`:

```javascript
function start() {
  console.log("Starting...");
}

function pause() {
  console.log("Pausing...");
}

function stop() {
  console.log("Stopping!");
}
```

Alright, if we call each function we should get a console log with the respective content:

```js
start(); // Starting...
pause(); // Pausing...
stop(); // Stopping!
```

Looking good!

> These are simple functions, if you're writing complex functions I don't advice using what we're about to use in this article.

---

# Array array array

Since these are simple functions we can use an array to use the functions instead of having individual functions, such as:

```js
const actions = {
  start: () => console.log("Starting..."),
  pause: () => console.log("Pausing..."),
  stop: () => console.log("Stopping!")
}
```

Now we can call it by using:

```js
actions["pause"](); // Pausing...
```

We still go a little further and make sure our action names are always the same by creating an object with it:

```js
const actionNames = {
  START: "start",
  PAUSE: "pause",
  STOP: "stop"
}
```

Let us change our `actions` array to make sure it reflects with our brand new `actionNames`:

```js
const actions = {
  [actionNames.START]: () => console.log("Starting..."),
  [actionNames.PAUSE]: () => console.log("Pausing..."),
  [actionNames.STOP]: () => console.log("Stopping!")
}
```

Now instead of calling `actions["stop"]();` we can use our `actionNames`:

```js
actions[actionNames.STOP](); // Stopping!
```

---

# Without functions

Let me give you one more examples, say we want to display an online presence, it can either be **online**, **offline** or away, both content and background should change, we can also use an associative array to accomplish that, take a look:

```js
const status = {
  ONLINE: {
    background: "#09ded8",
    title: "User is online 🎉"
  },
  OFFLINE: {
    background: "#fe564c",
    title: "Oh bummer, user is offline 😔"
  },
  AWAY: {
    background: "#fac82b",
    title: "User is away, should be right back 👀"
  }
}
```

As an example if you call `status["ONLINE"]` you'll get the following in return:

```js
{
  background: "#09ded8",
  title: "User is online 🎉"
}
```

That's it! You can play around with the code [here](https://codesandbox.io/s/silly-dhawan-c5qpz?file=/src/index.js)
