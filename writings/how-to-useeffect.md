---
title: "How to useEffect, simplified."
date: "2020-08-28"
og:
  description: "How to useEffect, a simplified guide."
  image: "https://telmo.im/og/howtouseeffect.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

Alright, I've wrote about `useState` in the past, I thought about giving it a go with `useEffect`.

If you’re familiar with React class lifecycle methods, you can think of `useEffect` hook
as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

---

If you want to run your code once when the component mounts we can do:

```js
useEffect(() => {
  // Your code
}, [])
```

By using `[]` we're _telling_ the code inside `useEffect` to run only once.

---

What about if we want to run the code on every render of the component? **Careful** that
this can be tricky and I don't really advice using it.

```js
useEffect(() => {
  // Your code
})
```

Notice that we removed the `[]`, this way our code will run every render.

---

## useState & useEffect

Let us combine both `useState` and `useEffect`:

```js
// Here we are setting the `online` state to false
const [online, setOnline] = useState(false)
```

Build a button to trigger a change on the `online` state:

```html
<button onClick={() => setOnline(!online)}>
  Change status
</button>
```

Now let us say that we want to trigger a simple `console.log` whenever
the state `online` changes, we can use `useEffect` for that:

```js
useEffect(() => {
  if (online) {
    console.log('User is now online!')
  } else {
    console.log('User is now offline!')
  }
}, [online])
```

By using `online` inside `[]`, the code inside `useEffect` will run every
single time there's a change of the `online` state.

---

This is a pretty simple explanation of how `useEffect` works. If you want to play with
this code just check this [codesandbox](https://codesandbox.io/s/priceless-dijkstra-xs058).
