---
title: "Build a Next.js blog with markdown"
date: "2020-01-07"
og:
  description: "How I've build this blog in less than an hour"
  image: "https://telmo.im/og/nextjs.png"
author:
  twitter: "telmo"
  name: "Telmo Goncalves"
---

I've posted a Tweet about building this blog in less than an hour,
and I'll be honest; it took me more time writing this post than
actually putting this blog online.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Less than 1 hour. I&#39;ve used NextJS for the first time and it&#39;s pretty amazing. And it goes without saying I&#39;ve used <a href="https://twitter.com/zeithq?ref_src=twsrc%5Etfw">@zeithq</a> for the hosting 🔥<br><br>I might keep it updated, just wanted to check how long would take me to get a blog up and running.<a href="https://t.co/XsFjLYP7MU">https://t.co/XsFjLYP7MU</a></p>&mdash; Telmo Goncalves (@telmo) <a href="https://twitter.com/telmo/status/1214257221829312518?ref_src=twsrc%5Etfw">January 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I'll try to explain the steps I took.

> If you don't want to follow the tutorial download the [Source code](https://github.com/telmogoncalves/nextjs-markdown-blog).

---

I've decided to go ahead and create a personal page/blog for
myself, and since I'm a massive fan of [Zeit and Now](http://zeit.co/),
that meant no time wasted thinking about hosting and deployments.

I have a few projects running with using [GatsbyJS](https://www.gatsbyjs.org/),
and to be honest, I love it, it's easy to use, and really powerful
if you plug a third-party such as [Contentful](https://www.contentful.com/).
Although this time, I wanted to try something different, and since I love hosting
and deploy my projects with Zeit, why not give [NextJS](https://nextjs.org/)
a try? First time using it, and let me tell you it's freaking amazing.

---

## Let's get started

Run the following:

```bash
mkdir my-blog && cd my-blog
```

```bash
npm init -y && npm install react react-dom next --save
```

> If you're wondering `-y` means you don't have to answer all the `npm init` questions

Now, in your `package.json` file replace `scripts` with:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

If you go ahead and try to start the server `npm run dev`, it should throw an error, because NextJS
is expecting to find a `/pages` folder.

<br />

So, let us take care of that, in the root of your project run:

```bash
mkdir pages && touch pages/index.js
```

Now you should be able to run `npm run dev` and access your application on `http://localhost:3000`

<br />

If everything is going as expected you should see an error similar to the following:

```text
The default export is not a React Component in page: "/"
```

That's alright; keep going.

---

## Our first view

In your `pages/index.js` file, paste the following code:

```js
import React from 'react'

export default function Index() {
  return (
    <div>
      ✍️ My blog about Books
    </div>
  )
}
```

Check `http://localhost:3000` you should see **My blog about Books**

#### Getting props

NextJS comes with a function called `getInitialProps`; we can pass props into our `Index` component.

<br />

Let us start with something simpler; at the end of your component lets put the following code:

```js:11-15
import React from 'react'

export default function Index() {
  return (
    <div>
      ✍️ My blog about Books
    </div>
  )
}

Index.getInitialProps = () => {
  return {
    blogCategory: 'Books'
  }
}
```

Here we're passing a `blogCategory` prop into our component, go ahead and change your component to look like the following:

```js:6
import React from 'react'

export default function Index(props) {
  return (
    <div>
      ✍️ My blog about {props.blogCategory}
    </div>
  )
}

// ...
```

If you refresh the page, it should look exactly the same, although, if you change the value
of `blogCategory` you'll see that it changes your view with the new value. Give it a try:

```js:5
// ...

Index.getInitialProps = () => {
  return {
    blogCategory: 'ReactJS'
  }
}
```

The content of your view should now be: **✍️ My blog about ReactJS**

<br />

Awesome, next!

---

## Dynamic Routes

So, to build a blog, you want dynamic routes, according to the route we want to load a
different `.md` file, which will contain our post data.

<br />

If you access `http://localhost:3000/post/hello-world` we'll want to load a file
called `hello-world.md`, for that to happen let us follow the next steps:

<br />

First of all, NextJS is clever enough to allow us to create a `[slug].js` file, which
is pretty awesome, let's go ahead and create that file:

```bash
mkdir pages/post
```

> Note the folder and file needs to be created inside `/pages`

Now create a file inside `/post` called `[slug].js`, it's exactly like that, with the brackets.

Inside this file we'll create our post template, to display the post title, contents, etc.

<br />

Go ahead and paste the following code, we'll go over it in a minute:

```js
import React from 'react'

export default function PostTemplate(props) {
  return (
    <div>
      Here we'll load "{props.slug}"
    </div>
  )
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query

  return { slug }
}
```

In here we're accessing `context.query` to extract the `slug` from the URL, this is because
we called our file `[slug].js`, let's say instead of a blog post you want to display a
product page, that might contain an id, you can create a file called `[id].js` instead and
access `context.query.id`.

<br />

If you access `http://localhost:3000/post/hello-world` you should see **Here we'll load "hello-world"**

Brilliant, let's keep going!

---

## Loading Markdown Files

As a first step lets create a `.md` file:

```bash
mkdir content && touch content/hello-world.md
```

In the `hello-world.md` file paste the following:

```
---
title: "Hello World"
date: "2020-01-07"
---

This is my first blog post!
```

That's great; now we need to load the content of this file and pass it through `props` in
our `PostTemplate` file.

<br />

Check the comments on the changed lines:

```js:13-14
import React from 'react'

export default function PostTemplate(props) {
  return (
    <div>
      Here we'll load "{props.slug}"
    </div>
  )
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query
  // Import our .md file using the `slug` from the URL
  const content = import(`../../content/${slug}.md`)

  return { slug }
}
```

Now that we have the data, we'll be using [gray-matter](https://www.npmjs.com/package/gray-matter)
to parse our file `frontmatter` data.

> `frontmatter` data is the information between `---` in our `.md` file

To install `gray-matter` run:

```bash
npm install gray-matter --save
```

<br />

We can now parse the data and pass it to the `PostTemplate` props:

> Don't forget to import `matter`

```js:1,8,10-11,13-14
import matter from 'gray-matter'

// ...

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query
  // Import our .md file using the `slug` from the URL
  const content = await import(`../../content/${slug}.md`)

  // Parse .md data through `matter`
  const data = matter(content.default)

  // Pass data to the component props
  return { ...data }
}
```

<br />

Awesome, now we should be able to access `data` in our component `props`.
Let's try it, refresh the page... **Ah, snap!**

Are you getting a `TypeError: expected input to be a string or buffer` error?

<br />

No worries, we need to add some NextJS configuration to tell it to load `.md` files,
this is a simple process, in the root of your project run:

```bash
touch next.config.js
```

Inside that new file paste the following code:

```js
module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}
```

This will be using the `raw-loader` package, so we'll need to install that as well:

```bash
npm install raw-loader --save
```

> Don't forget to restart your application

<br />

Now lets change our component to receive our new `props`:

```js:1-3,7
export default function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <div>
      <h1>{frontmatter.title}</h1>
    </div>
  )
}
```

Refresh your page, you should see **Hello World**.

<br />

It's missing rendering the `content`, lets take care of that:

```js:9
export default function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <div>
      <h1>{frontmatter.title}</h1>

      <p>{content}</p>
    </div>
  )
}
```

Ok, this great, you should be able to see **This is my first blog post!**

---

## Markdown Format

Now that we can render our markdown files fine, lets add some formatting to our
post file, go ahead and change `hello-world.md`:

```md:6-10
---
title: "Hello World"
date: "2020-01-07"
---

### Step 1

- Install dependencies
- Run locally
- Deploy to Zeit
```

Hmmm, format is not working like expected, it's just raw text.

<br />

Lets take care of that, we'll be using [react-markdown](https://github.com/rexxars/react-markdown)
to handle markdown formatting:

```bash
npm install react-markdown --save
```

Now lets update our `PostTemplate` component:

```js:3,13
import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

export default function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <div>
      <h1>{frontmatter.title}</h1>

      <ReactMarkdown source={content} />
    </div>
  )
}
```

That's it; we are done here! You can download the final code [here](https://github.com/telmogoncalves/nextjs-markdown-blog).
