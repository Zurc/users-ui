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
    return of(user);
  }

  updateUser(updatedUser: UserInterface) {
    return of(updatedUser);
  }

  deleteAll() {
    return of([]);
  }

  deleteUser(id: string) {
    return of(id);
  }
}
