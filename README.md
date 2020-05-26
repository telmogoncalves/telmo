# Repo for Telmo's Website

This repo contains the code that is being used [here](https://telmo.im)

---

## Stack

- Now
- NextJS
- Markdown

---

## Want to use this project?

After forking the project run:

```
npm install
```

```
npm run dev
```

## Tips for Netlify fans

There are two ways you can deploy this site to Netlify:

- generate static folder using below command and upload the zip to your domain on Netlify

```
npm run build:static
```

If you face any issue while refreshing the routes, you can modify next.config.js 

If your blog name is writings/comparision-operaror-in-javascript.md you can add code as 
shown below, becuase writings/[slug].js looks for slug which can be passed.

```
exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
  return {
    '/about': { page: '/about' },
    '/uses': { page: '/uses' },
    '/': { page: '/' },
    '/writings/comparision-operaror-in-javascript': { page:'/writings/[slug]', query: { slug: 'comparision-operaror-in-javascript' }},
    }
}
```

Just make sure to remove any references of my name and use yours 🙂
