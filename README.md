# UsersUi

<img src="https://github.com/Zurc/users-ui/blob/main/src/assets/images/users-ui.png" width=50% heigh=50% alt="users-ui">

## Requirements

Create a single page angular app which manages a list of usernames, using NGRX. Below it the UX mock up screen and requirement specifications for this page. Do unit test for at least NGRX selectors, reducers, and effects. There is no time limit, but please do your best and submit the test as quick as you can.

- On page load, fetch mock data, which is a list of usernames, from an angular service method.

- Then store the data in memory on client side and use in-memory data to implement following features.

- Create a grid, listing usernames as the UX screen shown below.
 
- This page will enable user to edit and delete names.
 
- User should be able to delete or edit all names in one go using “Delete All” and “Edit All” buttons.
 
- User also should be able to add new user.
 
- As for page styling, header and footer need to have 100px height and the middle content area should grow
or shrink as the browser window height is changed. Other than that, you have freedom to style rest of the
page.

<img src="https://github.com/Zurc/users-ui/blob/main/src/assets/images/users-ui_mock.png" width=50% heigh=50% alt="users-ui mock">


## Start

Clone this repo to your machine and `cd` into it. 

`npm i` to install packages and dependencies.

Run the project: `ng serve`

## NGRX - Redux DevTools

If you have [Redux DevTools](https://github.com/reduxjs/redux-devtools) you'll be able to see how the state of the app changes.

## Running unit tests

Run `yarn test` or `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).
