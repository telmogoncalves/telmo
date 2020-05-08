---
title: "Introduction to useState"
date: "2020-03-05"
og:
  description: "A quick introduction to ReactJS useState method"
  image: "https://telmo.im/og/usestate.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

I've been working with React Hooks for some time now and I thought about writing a quick and simple post on how to use `useState`.

---

# Let us get started

First of all, we need to import `useState` from `react`

```js
import React, { useState } from 'react'
```

Take into account the following function:

```js
import React, { useState } from 'react'

function Steps() {
  return (
    <div>
      Today I've walked 0 steps.
    </div>
  )
}
```

Alright, we want to control the amount of steps we've walked today, for that we can use the `useState` method, let us take a look:

```js
import React, { useState } from 'react'
```

Take into account the following function:

```js
import React, { useState } from 'react'

function Steps() {
  const [steps] = useState(0)

  return (
    <div>
      Today I've walked {steps} steps.
    </div>
  )
}
```

What are we doing here?

- Creating a new state called `steps` and its default value is `0`
- We're printing our `steps` value in our function

---

## Control

Now we want to control the value of `steps`, with `useState` you can destructure another prop, so, currently we have `const [steps]`, we will get another method from there, let us change that to `const [steps, setSteps]`.


Now we've introduced `setSteps`, with this we can control the value of `steps`, let us create a button to handle an `onClick` function to set the steps to `10`, try it out

```js
import React, { useState } from 'react'

function Steps() {
  const [steps, setSteps] = useState(0)
  const increaseSteps = () => setSteps(10)

  return (
    <div>
      Today I've walked {steps} steps.

      <button onClick={() => increaseSteps()}>
        Increase steps
      </button>
    </div>
  )
}
```

When you click on our new `button` the steps should increase to `10`, great.

---

## We can do better

We might want to increase the steps by `1`, not `10`. You might be thinking it's as simple as changing `10` with `1`, give it a try, I'll wait.

![](https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif)

It only goes to `1` right? 🤷‍♂️

Nothing to worry, we'll fix it right now, change the `increaseSteps()` function:

```js
const increaseSteps = () => setSteps(steps + 1)
```

What are we doing? We're getting the value of `steps` and increasing it by one.

You can also create another button to decrease the value, similar function but using `-1`:

```js
const decreaseSteps = () => setSteps(steps - 1)
```

---

## Result

I've spiced things a little bit with styling and an emoji 🙂

![](https://img.onl/ivDHCX)

You can check the final code in this [Codesandbox](https://codesandbox.io/s/thirsty-chatelet-76cyl)
