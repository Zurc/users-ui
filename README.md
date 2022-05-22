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

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
