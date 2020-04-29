---
title: "Performance Matters"
date: "2020-01-10"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

A few people asked me how I've been testing JavaScript performance timings. I
use a really simple technique. Although this is a short post it might help someone.
Let's go!

---

We'll be using the example of one of my latest Tweets where I've used the following
code example:

```js
const flatUnique = data => [...new Set([].concat(...data))];

const arr = ["ReactJS", ["NextJS", "ReactJS"], ["JavaScript", "ReactJS"], "JavaScript"];

console.log(flatUnique(arr)); // ["ReactJS", "NextJS", "JavaScript"]
```

<br />

Alright, let's start by using performance, `performance` comes with JavaScript and
has a lot of proto properties, if you open your developer tools console and type `performance`
you can see what I'm talking about. If you're too lazy to do that check this
[image](https://img.onl/hU4rdE).

<br />

For this scenario we'll be using the `.now()` function, let's take care of that:

```js:4
const flatUnique = data => [...new Set([].concat(...data))];

const arr = ["ReactJS", ["NextJS", "ReactJS"], ["JavaScript", "ReactJS"], "JavaScript"];
const start = performance.now();

console.log(flatUnique(arr)); // ["ReactJS", "NextJS", "JavaScript"]
```

What we're doing here is setting the _current time_, this is pretty much
the same thing as `Date.now()`, right, so we've initialized that, let's move on.

<br />

Then we're running `console.log` and calling our `flatUnique` function, after that we
just need to apply simple math, let's add another code line and cover that:

```js:8
const flatUnique = data => [...new Set([].concat(...data))];

const arr = ["ReactJS", ["NextJS", "ReactJS"], ["JavaScript", "ReactJS"], "JavaScript"];
const start = performance.now();

console.log(flatUnique(arr)); // ["ReactJS", "NextJS", "JavaScript"]

const duration = performance.now() - start;
```

We are, once again, using `performance` to initialize `.now()`, but this time we'll
subtract `start`, our initial `performance.now()`, this will return the time it took
since the first `performance.now()` until the second one.

<br />

Now we just need to output the `duration` value in some way:

```js:10
const flatUnique = data => [...new Set([].concat(...data))];

const arr = ["ReactJS", ["NextJS", "ReactJS"], ["JavaScript", "ReactJS"], "JavaScript"];
const start = performance.now();

console.log(flatUnique(arr)); // ["ReactJS", "NextJS", "JavaScript"]

const duration = performance.now() - start;

console.log(duration);
```

I've just ran this test and returned `0.39499999955296516`, it'll differ every
time you run this, but you can have a general idea on how long it'll take to run
`flatUnique`.
