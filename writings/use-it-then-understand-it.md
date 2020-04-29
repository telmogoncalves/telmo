---
title: "Use it, then understand it."
date: "2020-04-29"
og:
  description: "I've used reduce for too many years without knowing how it worked."
  image: "https://telmo.im/og/understandit.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

Learning how to code can be hard, **all** developers have a hard time once in a while, mostly when learning something new, it can be easier if you've been a developer for quite some time.

It will also get easier for you, once you get a gist of it, learning new some just comes naturally, something just clicks when you look a piece of code.

I'm a true believer that the only way of learning how to code is by **doing**, not by watching tutorials over and over again. Get your hands dirty with code, try to build something, I promise you, the second you start seeing stuff happening in a website, like styling a `div`, adding fancy typography, you'll fall in love.

---

## Use it

When you're learning how to code you might think that you need to understand **everything**, well, I'm not saying you can't focus on understanding how things work. I like to use it first, then understand it, let me give you an example.

A few years ago I was making an API call that returned an array with a few product lines, like this:

```json
[
  {
    "id": 1,
    "name": "iPhone",
    "price": 999
  },
  {
    "id": 2,
    "name": "iMac",
    "price": 2999
  },
  {
    "id": 3,
    "name": "iPad",
    "price": 699
  }
]
```

My goal was to sum all the values, sort of like a shopping cart, I want to know what's the total.

I don't actually have the code, but I remember I did something like this:

```js
let total = 0;

arr.map(a => (total = total + a.price));

total; // 4697
```


I thought that must be a better way of doing this crap, and like always, I googled it. _(Like everybody else does)_

That's when I found out about `reduce`, I'm not gonna lie to you, I've used `reduce` so many times and I **never** knew how it worked, absolutely no idea, until last year.

Once again I had to use `reduce`, but this time I though _"I've used this so many times, let me just figure out what's happening behind the scenes."_, and I started digging.

With the same example, we can convert the previous code with:

```js
arr.reduce((acc, a) => acc + a.price, 0);
```

I knew this worked, so I kept using it without even caring what was happening.

---

## Understand it

Let us break it down, we'll start simple with a simple array of numbers:

```js
const arr = [10, 15, 80, 30, 15];
```

Doing the math the sum of all those numbers is `150`. Using `reduce` it should return that same value. Take a look:

```js
arr.reduce((acc, value) => acc + value, 0); // 150
```

All good, now what's happening here? I like to call the first argument `acc` as in `accumulator` and second one `value` as in the value from the array entry.

This goes through each entry of the array, sort of like `map` or `forEach`. Since our array looks like `[10, 15, 80, 30, 15]` it'll need to run `5` times, one for each entry.

We can easily debug this with `console.log` and see what's happening with both `acc` and `value`:

```js
arr.reduce((acc, value) => {
  console.log({ acc, value });

  return acc + value;
}, 0);
```

This will output the following:

```js
{ acc: 0, value: 10 }
{ acc: 10, value: 15 }
{ acc: 25, value: 80 }
{ acc: 105, value: 30 }
{ acc: 135, value: 15 }
```

Take the first run as an example, what's happening:

- `acc` is `0`
- `value` is `10`
- It'll sum those values — `0 + 10` = `10`
- `10` is now stored in the `acc` variable for the next entry

It might sound a little confusing, if you're still not getting it drop me a message on Twitter, I'm happy to help 👇

---

I wanted to write this move focused on showing you something that I used for so many years without even knowing what it was actually happening behind the scenes.

Sometimes it's fine to just use it, if it works, why not? But if you have the time put an effort and trying to understand how things work, not all of them, you might
not need it 🙂

