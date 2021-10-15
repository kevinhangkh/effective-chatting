# ChatApp

Effective Angular chat app with user authentication and message posting. 
Responsive design. Effective on mobile devices.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Login page

The login page allows an existing user to sign in with email and password.

## Signup page

A new user can create an account with an email, username and password.

## Chat page

Once logged in, the user can interact with other users via the instant messaging feature.

## Backend

For backend I used Google's Firebase:
* FireAuth for user authentication [https://firebase.google.com/docs/auth](https://firebase.google.com/docs/auth)
* RealTime Database to store user data [https://firebase.google.com/docs/database](https://firebase.google.com/docs/database)
* Firestore for message storing [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore)

## External libraries

* Font Awesome [https://fontawesome.com/](https://fontawesome.com/)
* NgDatePipesModule [https://github.com/danrevah/ngx-pipes](https://github.com/danrevah/ngx-pipes)

## Demo

Check out the demo here: [https://chat-app-fawn-ten.vercel.app/](https://chat-app-fawn-ten.vercel.app/)

## Todo

* [ ] Manage z-index of date tooltip with flex-direction: reverse-column;
* [ ] Reduce font size for mobile devices with vw < 361px 
* [ ] README.md add some screenshots, maybe some gifs
