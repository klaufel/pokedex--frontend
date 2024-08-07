# 🎱 Pokédex GO!

Repository to easily manage all the dependencies and packages and the tools we use within the project.

## 💡 About the project

Project to obtain a list of pokemons and filter them by type, color and gender. You can also search by name.

👉 View project on production: [pokedex-go-frontend.vercel.app](https://pokedex-go-frontend.vercel.app/)

https://user-images.githubusercontent.com/1427623/223583541-32ec05b3-ff22-4f42-b769-e2ad6b816374.mp4

## 👋 Getting started!

To start the project you’ll need to use `Node.js 20` and `pnpm 8` on your machine.

You can use [nvm (Node Version Manager)](https://github.com/creationix/nvm) to easily switch Node versions between different projects.

To make managing between versions much easier, you can use this little script and automatically change the version when entering your project.

⚙️ [Calling 'nvm use' automatically in a directory with a `.nvmrc` file](https://gist.github.com/klaufel/9db737b8896f21b533bd0c0d5a612cea#file-zshrc)

### Start the project

Clone the repository in your machine and install the dependencies `pnpm install`.

**Initializes the server in development mode:**

```node
pnpm run dev
```

**Compile statics chunks and generate a build of application.**

```node
pnpm run build
```

Another scripts allocated in root package but they can be thrown by the different packages:

```node
pnpm run lint // Lint all files

pnpm run ts:check // Check validation of types (TypeScript)

```

> Look more in the documentation of each package inside our workspace!

## 🍽️ API

The project consumes a [PokéAPI](https://pokeapi.co/).

## 🧪 Test

### Services test

Launch services unit / integration test with `pnpm run test` command.

```node
pnpm run test
pnpm run test:ci
pnpm run test:watch
```

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
