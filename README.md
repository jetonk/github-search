# Vue 3 + Vite

- Project is bootstraped using Vite

## Main npm packages
- `vue`,
- `vuex` for state management,
- `vue-router` for routing,
- `primevue` for UI components,
- `@vuelidate/core` and `@vuelidate/validators` for Form Validation


### Steps to run the project
- First step is to create a `.env.local` file by copying `env-sample`,
- Second step is to set `VITE_GITHUB_PAT` token into the `.env.local`, which is used for authorization with GitHub API,
#### Then we can execute the following commands:
- `npm install`
- `npm run dev`

### Run tests
- `npm run test`

### Notes:
- I wrote some tests, but the code is not fully covered in tests.
- There might be some bugs or unexpected UI/UX experience