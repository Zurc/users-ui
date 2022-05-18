import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

import { UserInterface } from "src/app/users/types/user.interface";
import fakeUsers from "src/assets/mock-data";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  loadedUsers = fakeUsers.data;

  constructor(private store: Store, private http: HttpClient) {}

  getAll() {
    return of(this.loadedUsers);
  }

  addUser(user: UserInterface) {
    const newList = [...this.loadedUsers, user];
    return of(newList);
  }

  updateUser(user: UserInterface) {
    const updatedList = [...this.loadedUsers].map((user) =>
      user.id === user.id
        ? {
            ...user,
            name: user.name,
            isEditing: false,
          }
        : user
    );
    return of(updatedList);
  }

  deleteAll() {
    return of([]);
  }

  deleteUserById(id: string) {
    const newList = [...this.loadedUsers].filter((user) => user.id !== id);
    return of(newList);
  }
}
