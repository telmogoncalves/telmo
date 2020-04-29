---
title: "filter() Array Method with Javascript"
date: "2020-01-09"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

Recently I've found out about filtering array using type guards,
such as `Number` or `Boolean` and I thought it would be good to
write a small post about it.

<br />

I've posted a Tweet about this, which contain a really neat trick in my opinion:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Get rid of falsy values from an array, pretty neat.<br><br>🔥🔥<a href="https://twitter.com/hashtag/js?src=hash&amp;ref_src=twsrc%5Etfw">#js</a> <a href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw">#javascript</a> <a href="https://twitter.com/hashtag/react?src=hash&amp;ref_src=twsrc%5Etfw">#react</a> <a href="https://twitter.com/hashtag/reactjs?src=hash&amp;ref_src=twsrc%5Etfw">#reactjs</a> <a href="https://twitter.com/hashtag/programming?src=hash&amp;ref_src=twsrc%5Etfw">#programming</a> <a href="https://twitter.com/hashtag/code?src=hash&amp;ref_src=twsrc%5Etfw">#code</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://twitter.com/hashtag/tip?src=hash&amp;ref_src=twsrc%5Etfw">#tip</a> <a href="https://twitter.com/hashtag/tips?src=hash&amp;ref_src=twsrc%5Etfw">#tips</a> <a href="https://twitter.com/hashtag/array?src=hash&amp;ref_src=twsrc%5Etfw">#array</a> <a href="https://twitter.com/hashtag/mentor?src=hash&amp;ref_src=twsrc%5Etfw">#mentor</a> <a href="https://twitter.com/hashtag/coding?src=hash&amp;ref_src=twsrc%5Etfw">#coding</a> <a href="https://t.co/Y43WDmmJYE">pic.twitter.com/Y43WDmmJYE</a></p>&mdash; Telmo Goncalves (@telmo) <a href="https://twitter.com/telmo/status/1215244075579924480?ref_src=twsrc%5Etfw">January 9, 2020</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Let's do this.

---

## Type Guards

Take the following array example, where we'll have both falsy statements and strings:

```js
const arr = [false, 'NextJS', undefined, 'React', null]
```

My first approach here to filter the falsy statements and returns just the strings would be
to go with something like the following:

```js:3
const arr = [false, 'NextJS', undefined, 'React', null]

arr.filter(value => value && value) // ["NextJS", "React"]
```

Which is perfectly fine, although there's a more elegant way of doing this:

```js:-3,4
const arr = [false, 'NextJS', undefined, 'React', null]

arr.filter(value => value && value)
arr.filter(Boolean) // ["NextJS", "React"]
```

Both return exactly the same thing, aside from that I went ahead and
tested the performance on both methods:

```js
const arr = [false, 'NextJS', undefined, 'React', null]

// Took 0.030000024707987905 milliseconds to run
arr.filter(value => value && value)

// Took 0.004999979864805937 milliseconds to run
arr.filter(Boolean)
```

It's amazing how faster it is to use `.filter(Boolean)`.

---

## What about numbers and string?

I liked this so much I went ahead and tried filtering numbers and strings, I ran
a couple of examples, let's start with numbers:

```js
const arr = [1, 2, 3, "4", 5, "6"]
```

With this example we want to filter the numbers, removing all strings:

```js
const arr = [1, 2, 3, "4", 5, "6"]

arr.filter(Number) // [1, 2, 3, "4", 5, "6"]
```

This returns exactly the same array, `"4"` and `"6"` are being considered numbers,
because well, they are numbers. Javascript is a tricky fellow.

<br />

If we actually had strings in our array it would work fine:

```js:!-1
const arr = [1, 2, 3, "Fancy", 5, "Array"]

arr.filter(Number) // [1, 2, 3, 5]
```

<br />

The only way I got to filter numbers, even when numbers are string (`"4"`), was
by checking the data type:

```js
const arr = [1, 2, 3, "4", 5, "6"]

arr.filter(value => typeof value === 'number' && value) // [1, 2, 3, 5]
```

---

I thought it was a simple and short post that can probably help someone, and I hope it does. If there's
anything else that you think I should write about or you need some help just let me know.
