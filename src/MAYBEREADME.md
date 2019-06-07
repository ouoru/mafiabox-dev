# Why Maybe?
- I started making a lot of README's among the module folders but due to the need to develop fast and change things 24/7 I wasn't able to actually update them all when I made changes. MAYBEREADME and the root level README are the only reliable sources of information. If it's not here, sorry!

## Modals
- all modals are controlled from a High-level component located in AppNavigator
- Modals have a z-index of 2 (slightly lower than Dropdowns)

### How it works
- [ModalView](./modules/modal/ModalView.js) maps the keys to render at position=relative to the window
- [ModalConnect](./modules/modal/ModalConnect.js) passes functions to every modal, with functions specific to the modal index (multiple modals can be open at once, and will stack on top of each other). If there is a path:Array prop passed to the modal, it will also pass a "slate" property, which uses the path to get state from redux.
- [ModalKeys](./modules/modal/ModalKeys.js) simply renders the Component. There are a lot of keys so we just want to keep this in a separate file as it gets hectic.

### Adding a Modal
- Add a new [type](./modules/modal/types.js)
- Create the Component
- Add the Component into ModalKeys  

## Dropdowns
- all modals are controlled from a High-level component located in AppNavigator
- Dropdowns have a z-index of 3 (slightly higher than Modals)
- everything works exactly like ModalView

## Listeners / Firebase Architecture

### Auth
- [AuthWrapper](./modules/auth/AuthWrapper.js) keeps track of the user through firebase.auth().onAuthStateChanged().

### UserProjects
- keyed by UID, set to 'true' if user is listening to this project
- [AuthWrapper](./modules/auth/AuthWrapper.js) also starts listening to userProjects when the user has been confirmed.

### ProjectUsers
- keyed by projectKey, this is where details of the project users can be found
- [AuthWrapper](./modules/auth/AuthWrapper.js) also starts listening to userProjects when the user has been confirmed.

### dev
- keyed by projectKey, this is where all the game development happens for Desktop application