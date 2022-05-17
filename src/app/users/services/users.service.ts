import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

import { UserInterface } from "src/app/users/types/user.interface";
import * as userActions from "src/app/users/store/users.actions";
import fakeUsers from "src/assets/mock-data";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  // users$ = new BehaviorSubject<UserInterface[]>([]);
  // filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.editAll);
  // stateUsers$ = new BehaviorSubject<UserInterface[]>([]);
  loadedUsers = fakeUsers.data;

  constructor(private store: Store, private http: HttpClient) {}

  getAll() {
    // this.users$.next(loadedUsers);
    return of(this.loadedUsers);
    // this.stateUsers$.next(loadedUsers);
  }

  addUser(name: string) {
    const newUser: UserInterface = {
      name,
      isEditing: false,
      id: Math.random().toString(16),
    };

    this.store.dispatch(userActions.addUser({ user: newUser }));

    // const updatedUsers = [...this.users$.getValue(), newUser];
    // this.users$.next(updatedUsers);
  }

  editAll() {
    this.store.dispatch(userActions.editUsers());
    // const editedUsers = this.users$.getValue().map((user) => {
    //   return {
    //     ...user,
    //     isEditing: true,
    //   };
    // });
    // console.log(editedUsers);
    // this.users$.next(editedUsers);
  }

  deleteAll() {
    return of([]);
  }

  deleteUserById(id: string) {
    const userIndex = [...this.loadedUsers].findIndex((user) => user.id === id);

    const fakeDeletion = [
      ...this.loadedUsers.slice(0, userIndex),
      ...this.loadedUsers.slice(userIndex + 1),
    ];
    return of(fakeDeletion);
  }

  editUserById(id: string) {
    // const newUserIndex = this.users$
    //   .getValue()
    //   .findIndex((user) => user.id === id);
    // if (newUserIndex > -1) {
    //   const changedUser = {
    //     ...this.users$.getValue()[newUserIndex],
    //     isEditing: true,
    //   };
    //   const newUsers = [
    //     ...this.users$.getValue().slice(0, newUserIndex),
    //     changedUser,
    //     ...this.users$.getValue().slice(newUserIndex + 1),
    //   ];
    //   return this.users$.next(newUsers);
    // }
    // return;
  }

  saveUser(newUser: UserInterface) {
    // const newUsers = this.users$
    //   .getValue()
    //   .map((user) => (user.id === newUser.id ? newUser : user));
    // return this.users$.next(newUsers);
  }
}
