---
title: "Random colour with JavaScript"
date: "2020-03-15"
og:
  description: "Create a random colour using only JavaScript"
  image: "https://telmo.im/og/random-colour.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

The main reason for writing this post is to explain why to use `16777215`, looks kind of a random number and can be a little misleading.

---

## Why 16777215?
If you're familiar with `RGB` (Red, Green, Blue), you know it's represented by a number from `0` to `255`, an example of a colour using RGB would look like:

```css
/* Same as #ffffff */
color: rgb(255, 255, 255);
```

Now, if we do `256 * 256 * 256` we end up with `16,777,216`, now why do we remove 1 from this value?

We want to convert into a hexadecimal format and `16777216` converts to `1000000`, while `16777215` converts to `ffffff`.

I did a little research but mainly this came from here, thanks Jacob:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Red, green, and Blue are each represented by a number from 0 to 255<br><br>256 * 256 * 256 = 16777216</p>&mdash; Jacob Paris 🇨🇦 (@jacobmparis) <a href="https://twitter.com/jacobmparis/status/1239022844136341504?ref_src=twsrc%5Etfw">March 15, 2020</a></blockquote>

---

There are other explanations, based directly on the hexadecimal code, but I felt this one made more sense and it was simpler.

---

Happy to discuss this further and give me a shout if you think something's not right. I'm always open to learning something new. Connect on [Twitter](https://twitter.com/telmo) if you want to discuss.

Hope this makes sense to you 🔥
