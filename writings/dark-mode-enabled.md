---
title: "Enabled dark mode with styled-components"
date: "2020-01-08"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

After creating this blog, I thought it would be good to be part of all
the **Dark Mode** hype. And since I've never done it, I tried it out.

![](https://img.onl/ksEPSi)
> Outdated version of my blog

Since I'd never really worked with NextJS aside from building this blog,
I had to do some research before getting my hands dirty.

<br />

For this tutorial, I'll continue using the code from [this post](/writings/nextjs-blog-in-less-than-1-hour),
although I'll leave the changes for this tutorial in a branch called `dark-mode`.

---

## All right, let's get started

For this to happen we'll be using `styled-components`, if you're not familiar with it,
I would suggest you take a quick look into [their documentation](https://www.styled-components.com/docs/basics#getting-started).

<br />

In the root of your projects let us create a `styles` folder and a `themes.js` file:

```bash
mkdir styles && touch styles/themes.js
```

All right, we need a `light` and a `dark` theme, for that we can simply create 2 objects,
one for each theme:

```js
export const lightTheme = {
  body: '#FFFFFF',
  text: '#363537',
}

export const darkTheme = {
  body: '#101010',
  text: '#FAFAFA',
}

```

Don't worry about this for now, we'll be using it later.

<br />

What I've done was creating a `Layout` wrapper that contains my global styles, theme styles and so forth.
But before that let's define our global styles:

```bash
touch styles/global.js
```

Inside `global.js` we'll be using `styled-components`, so let's take care of install it:

```bash
npm install styled-components --save
```

<br />

Let's start with something simple such as, background and text color:

```js
import { createGlobalStyle } from 'styled-components';

// the `theme` object is comming from our ./themes.js file
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
`
```

<br />

Cool, we should be done with this, let's look into implement the themes.

---

## Layout and Theme Switch

I've mentioned that I used a `Layout` wrapper to take care of styles, themes, and so forth. Let's
create that wrapper:

```bash
mkdir components && touch components/Layout.js
```

<br />

Paste the following into `Layout.js`:

```js
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

// Default dark mode to true for now
const darkMode = true

function Layout({ children }) {
  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

We should be ready to wrap our pages with `Layout`, if you look at the codebase
I've provided at the beginning of this tutorial you should see a file `/pages/index.js`,
on that file change the following lines:

```js:3,7,9
import React from 'react'

import Layout from '../components/Layout'

export default function Index(props) {
  return (
    <Layout>
      ✍️ My blog about {props.blogCategory}
    </Layout>
  )
}

Index.getInitialProps = () => {
  return {
    blogCategory: 'ReactJS'
  }
}
```

Run the following commands and access your application at `http://localhost:3000`:

```bash
npm install && npm run dev
```

You should see the background turned dark and the text white 🥳

<br />

### Let there be light

Let's change the `Layout` wrapper to allow us to switch between dark and light mode. Go
to the `components/Layout.js` file and let's make some changes:

```js:!-1,-7-8,11-12
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

// Default dark mode to true for now
const darkMode = true

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState(true)

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

If you refresh the page, you should see the same behaviour: dark background, white text.

<br />

Let's make a quick change to check if our **Light** theme is working as well, change
our `darkMode` state from `true` to `false`:

```js:!-3
function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState(false)

  // ...
}
```

Refresh the page; you should see the original theme: white background, dark text 👌

<br />

#### The Switch

We'll be using the `setDarkMode` method from the previous code, we'll create a
`<button>` with an `onClick` prop:

```js:14-18
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState(true)

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light it up!' : 'Turn the light off!'}
        </button>
      </div>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

So, what are we doing with `onClick={() => setDarkMode(!darkMode)}`, we're setting
the `darkMode` state by using the `! (not)` operator, which inverts the boolean expression:

```js
let darkMode = true

darkMode = !darkMode // false
darkMode = !darkMode // true
```

---

## Persistence

You should notice that every time you refresh your application and theme falls back to the light theme,
well, let's deal with that.

<br />

For that we'll take advantage of `localStorage` and React Hooks `useEffect` method. Let's take a look:

```js:!-1,11-13
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    console.log(`Using dark mode? ${darkMode}`)
  }, [darkMode]) // Run every time `darkMode` changes

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light it up!' : 'Turn the light off!'}
        </button>
      </div>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

Open your developer console, every time you switch between light and dark mode, you should
see logs such as:

```text
Using dark mode? false
Using dark mode? true
Using dark mode? false
```

Great, that means `useEffect` is working as expected. Although, is you refresh the page
it keeps falling back to the light theme.

<br />

Let's use `localStorage` to fix that:

```js:-12,13
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    console.log(`Using dark mode? ${darkMode}`)
    localStorage.setItem('DARK_MODE', darkMode)
  }, [darkMode]) // Run every time `darkMode` changes

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light it up!' : 'Turn the light off!'}
        </button>
      </div>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

You can check if this is working as expected in the developer tools console,
under **Application → Local Storage → http://localhost:3000**, you should see:

| Key        | Value |
| ------------- | ------------- |
| `DARK_MODE`      | `true` or `false` |

<br />

Once again, on refresh it's still falling back to the light theme, to fix that we
need to make a small change, we need to get the value from `localStorage` and
set as our default `darkMode` state:

```js:!-9,11-15
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState()

  useEffect(() => {
    const darkModeValue = localStorage.getItem('DARK_MODE')
    // localStorage returns a string, not a boolean
    setDarkMode(darkModeValue === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('DARK_MODE', darkMode)
  }, [darkMode]) // Run every time `darkMode` changes

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
         <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light it up!' : 'Turn the light off!'}
        </button>
      </div>

      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

We could have got the `localStorage` value before setting the state, but `localStorage`
is still not available because it's not part of NextJS, so this is a nice work-around.

---

## What the flash?

You might have noticed that when reloading your application while in dark mode,
the page kind of _flashes_ between light and dark mode. Well, we also can use `useEffect`
as a good work-around to prevent that, let's set another state – `mounted`:

```js:6,12-13
// ...

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const darkModeValue = localStorage.getItem('DARK_MODE')
    // localStorage returns a string, not a boolean
    setDarkMode(darkModeValue === 'true')
    // Set mounted to `true` only after setting the `darkMode` state
    setMounted(true)
  }, [])

  // ...
}
```

Alright, now we can simply render an empty `<div />` before the component has been mounted,
this will prevent the component to render our styles, `ThemeProvider` etc before we set the
`darkMode` state:

```js:24
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'

function Layout({ children }) {
  // Use the state to determine darkMode
  const [darkMode, setDarkMode] = useState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const darkModeValue = localStorage.getItem('DARK_MODE')
    // localStorage returns a string, not a boolean
    setDarkMode(darkModeValue === 'true')
    // Set mounted to `true` only after setting the `darkMode` state
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('DARK_MODE', darkMode)
  }, [darkMode]) // Run every time `darkMode` changes

  if (!mounted) return <div />

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
         <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light it up!' : 'Turn the light off!'}
        </button>
      </div>

      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
```

If you reload your application, the _flash_ between light and dark mode should be gone.

---

## Source Code

You can find the source code of this tutorial [here](https://github.com/telmogoncalves/nextjs-markdown-blog),
don't forget it's under the branch `dark-mode`.
