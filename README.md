# 📔 RecipeBook

Monorepo to easily manage all the dependencies and packages and the tools we use within the project.

## 💡 About the project

Online recipe book where you can create your own cooking recipes. Yes, those recipes for dishes that we make on sundays at home and that unfortunately will never be as delicious as our mothers and fathers 🥲.

👉 View project on production: [recipebook-app.vercel.app](https://recipebook-app.vercel.app)

https://user-images.githubusercontent.com/1427623/223583541-32ec05b3-ff22-4f42-b769-e2ad6b816374.mp4

## 👋 Getting started!

To start the project you’ll need to use `Node.js 18` and `pnpm 7` on your machine.

You can use [nvm (Node Version Manager)](https://github.com/creationix/nvm) to easily switch Node versions between different projects.

To make managing between versions much easier, you can use this little script and automatically change the version when entering your project.

⚙️ [Calling 'nvm use' automatically in a directory with a `.nvmrc` file](https://gist.github.com/klaufel/9db737b8896f21b533bd0c0d5a612cea#file-zshrc)

### Start the project

Clone the repository in your machine and install the dependencies `pnpm install`.

**Initializes the server in development mode:**

```node
pnpm run dev
```

**Initializes the server in production mode.**

```node
pnpm run start
```

**Compile statics chunks and generate a build of application.**

```node
pnpm run build
pnpm run build:analyze // With bundler analyze report
```

Another scripts allocated in root package but they can be thrown by the different packages:

```node
pnpm run lint // Lint all files
pnpm run lint:fix // Lint and fixed if possible all files

pnpm run ts:check // Check validation of types (TypeScript)

pnpm run theme:generate // Generate theme based on design tokens
```

> Look more in the documentation of each package inside our workspace!

## 📦 Packages

The repository is based on a monorepo so we have different packages that we use in our application, you can look at the documentation of all of them from here.

| Package                                 |  Description                                                          |
| :-------------------------------------- | :-------------------------------------------------------------------- |
| [@recipebook/config](./packages/config) | Shared configuration to use throughout the application.               |
| [@recipebook/domain](./packages/domain) | A domain of contain all business logic to be used in the application. |
| [@recipebook/e2e](./packages/e2e)       | Execution of the test e2e of the application                          |
| [@recipebook/lint](./packages/lint)     | Easy control of all standardization of code in all our projects.      |
| [@recipebook/theme](./packages/theme)   | App theme based on design tokens of brand.                            |

## 🍽️ API

The project consumes a Fake API created with [json-server](https://github.com/typicode/json-server).

API url: https://recipebook-api.vercel.app/

## 🧪 Test

### Domain test

Launch domain unit / integration test with `pnpm run test:unit` command.

```node
pnpm run test:domain
pnpm run test:domain:ci
```

### Components test

Launch components test with `pnpm run test:components` command.

```node
pnpm run test:components
pnpm run test:components:ci
```

### e2e test

Launch components test with `pnpm run test:e2e` command.

## ⚡️ Web performance

Performance metrics are measured thanks to `Vercel Analytics`, you can look at the [Vercel analytics dashboard](https://vercel.com/klaufel/recipebook/analytics).

We use [Lighthouse](https://github.com/GoogleChrome/lighthouse) metrics to evaluate how our application perform where we can see the detailed metrics along with the web vitals.

You can use tools like:

- [PageSpeed](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## 🚀 CI & deploy!

For each push and pull request, jobs are executed to ensure the delivery of our code to production. See the [repository actions](https://github.com/klaufel/recipebook/actions).

<img width="959" src="https://user-images.githubusercontent.com/1427623/223584673-f5e5de36-64d2-4092-b6f6-9732cf4efe86.png">

Automatically for each merge to `main` branch the deployment to production is done, so you don't have to worry about doing anything else.

The project is automatically deployed with Vercel, you can see an environment generated per branch in each pull request.
