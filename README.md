# SWOL App
You will need to create a Firebase app and paste the configuration in an .env file, like this:
```
VUE_APP_API_KEY=
VUE_APP_DOMAIN=
VUE_APP_DATABASE=
VUE_APP_PROJECT_ID=
```
## Todo list
### Features
- [ ] Add new exercises
- [ ] Weight tracker
- [ ] Workout stats
- [ ] Share workout session
- [ ] Workout routines
- [x] Implement `vuex-easy-firestore`

### Bugs
- [ ] Allow workout editing.
- [x] Display `resistance` property if `true`.
- [ ] Create a reusable `sessionCard` component for the `SessionExisting` and `SessionNew` views.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
