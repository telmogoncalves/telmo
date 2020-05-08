---
title: "Filtering arrays in JavaScript"
date: "2020-04-23"
og:
  description: "Learn how to use the filter with arrays in JavaScript"
  image: "https://telmo.im/og/arrayfilter.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

Using `filter()` in JavaScript can be really handy, you can filter an
array in so many ways, lets explore a little bit about that.

<br />

## Numbers

Start with a simple numbers array:

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

Now, lets filter this array in order to return only values below `8`:

```js:3-5
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// We're *saying*, get me all values
// that are less less (<) than 8
array.filter(value => value < 8);
```

With this filter it'll return `[1, 2, 3, 4, 5, 6, 7]`, pretty neat right?

<br />

Lets try a few more examples before moving on. Check the comments on the code:

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get only odd numbers
array.filter(value => value & 1); // [1, 3, 5, 7, 9]

// Get only even numbers
array.filter(value => !(value & 1)); // [2, 4, 6, 8, 10]

// Get values between `3` and `8`
array.filter(value => value > 3 && value < 8); // [4, 5, 6, 7]
```

As you can see we can use `filter()` in many ways, lets play
a little bit with `strings` 🙂

---

## Strings

Again, lets set up a simple array:

```js
const array = ["@telmo", "https://telmo.im", "Fullstack Developer"]
```

Lets assume we want to filter just URLs, so, we
can filter strings that start with `http` as an example:

```js:3
const array = ["@telmo", "https://telmo.im", "Fullstack Developer"];

array.filter(value => value.startsWith("http"));
```

This will return `["https://telmo.im"]`. I love JavaScript!

Since we know handlers start with an `@`, we can do exactly the same
thing to filter all handlers, lets add a few more entries into our array:

```js
const array = [
  "Telmo", "@telmo", "@codinghubio", "Coding Hub"
]

array.filter(value => value.startsWith("@"));
```

This should return `["@telmo", "@codinghubio"]`, sweet!

---

## Objects

Finally, lets just go through a more complex array, an array
of objects, lets assume an array of profiles:

```js
const profiles = [
  { name: "Telmo", handler: "@telmo", followers: 1000 },
  { name: "Catalin", handler: "@catalinmpit", followers: 2000 },
  { name: "Marc", handler: "@_marcba", followers: 3000 },
];
```

Now lets try and filter profiles that have more than `1000` followers:

```js
profiles.filter(value => value.followers > 1000);
```

With this filter you should get:

```json
[
  {
    "name": "Catalin",
    "handler": "@catalinmpit",
    "followers": 2000
  },
  {
    "name": "Marc",
    "handler": "@_marcba",
    "followers": 3000
  }
]
```

In the filter you can do another thing, which is destructuring the
`followers` directly, like this:

```js
profiles.filter(({ followers }) => followers > 1000);
```

---

I was about to end this writing now, but... We can still use another
approach into how we filter arrays.

<br />

Lets assume we have an array with `numbers` and `strings`, and we
want to filter the array to return just the `strings`, how do we
check in JavaScript if something is a `string`?

```js
typeof something === "string"
```

Right, lets take the following example:

```js
const array = [1, 3, "Telmo", 4, 6, "@telmo"];

// We can use the `typeof` directly in the filter
array.filter(value => typeof value === "string");
```

It should return `["Telmo", "@telmo"]`, awesome! But, we can
refactor this a little bit, assume you might want to use a function
that checks if *something* is a `string`, lets take a look:

```js
const array = [1, 3, "Telmo", 4, 6, "@telmo"];

function isString(value) {
  return typeof value === "string";
}

array.filter(isString);
```

This returns exactly the same `["Telmo", "@telmo"]`, but look how
our `filter()` got much cleaner, and bonus, you can re-use the `isString()`
function somewhere else.

> Note that this is not a **right way** of doing things approach, you should use whatever you think is fits you best.

<br />

That's it, hope it helped somehow ✌️
