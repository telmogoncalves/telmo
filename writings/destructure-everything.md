---
title: "Destructure Everything"
date: "2020-01-08"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

Destructuring is a convenient way of extracting multiple values
from data stored in objects and Arrays.

---

Let's take a look on how to destructure an object:

```js
const info = { name: 'Telmo', age: 33, twitterHandler: '@telmo' }

// Destructure data from `info`
const { name, age, twitterHandler } = info

console.log(name, age, twitterHandler) // Telmo 33 @telmo
```

What we've done here? Instead of accessing the data through `info.name`, `info.age`, etc;
We extracted the data from `info`, this way you prevent calling `info.X` multiple times.

<br />

Let's mock an example where you're making an API call, for this we'll be using
[JSONPlaceholder](https://jsonplaceholder.typicode.com/), you can take a look to figure
out what it does.

<br />

A straight forward example is the one provided in the homepage, where we can fetch data
from [here](https://jsonplaceholder.typicode.com/todos/1) and it should return something like:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

Let's build a simple component so we can then extract the data from the API call:

```js
import React from 'react'

export default function MyComponent() {
  return (
    <div>My amazing component 🚀</div>
  )
}
```

<br />

Great, now let's assume the data from the API call is being passed to the component
through `props`, we can either extract the data before we `return` our component:

```js:!-3,4,7-12
import React from 'react'

export default function MyComponent(props) {
  const { userId, id, title, completed } = props

  return (
    <div>
      Task ID: {id}
      Created by user ID: {userId}
      Task title: {title}
      Completed: {completed}
    </div>
  )
}
```

Looks great, but we can still save at least one least in your code, take a look:

```js:!-3,-4
import React from 'react'

export default function MyComponent({ userId, id, title, completed }) {
  const { userId, id, title, completed } = props

  return (
    <div>
      Task ID: {id}
      Created by user ID: {userId}
      Task title: {title}
      Completed: {completed}
    </div>
  )
}
```

By extracting the data directly on `MyComponent()`, we no longer need
to extract the data through `const { ... } = props`.

---

## Let's play without brackets (Arrays)

Check the example bellow and notice the comments:

```js
const myTags = ['React', 'Next', 'Gatsby']

// Get first element of the array
console.log(myTags[0]) // React

// Destructuring the array
const [tag] = myTags

console.log(tag) // React
```

Looks way better.

<br />

Going a little further, I found out about this just a few days ago, and it's
amazing how good the code looks using this. Let's imagine the following data structure:

```json
"deliveries": [
  {
    "id": 337948,
    "shipments": [
      {
        "number": "FOO-5905959044",
        "products": [
          {
            "title": "Apple Pie"
          },
          {
            "title": "6 Pack Coronas"
          },
          {
            "title": "Doritos"
          },
          {
            "title": "Burgers"
          }
        ]
      }
    ]
  }
]
```

Let's destructure this sucker using the same component as before,
assuming this data is being passed to the component `props`:

```js
 // Destructuring happening right here within `MyComponent()`
export default function MyComponent({
  data: { deliveries }
}) {
  return (
    deliveries.map(delivery => {
      const {
        id,
         // Beauty of destructuring arrays
        shipments: [shipment]
      } = delivery
      // Destructuring data from the first array of `shipments`
      const { number, products } = shipment

      return (
        <div>
          Order with ID {id} and tracking shipment
          number {number}

          <ul>
            {products.map(({ title }) => ( // Destructuring happening here within `()`
              <li>{title}</li>
            ))}
          </ul>
        </div>
      )
    })
  )
}
```

You can check [this CodeSandbox](https://codesandbox.io/s/infallible-wilbur-xo90i) I've put together.
