import { Component } from "@angular/core";
import { UsersService } from "src/app/users/services/users.service";
import { UserInterface } from "../../types/user.interface";
import {
  addUser,
  editUser,
  editUsers,
} from "src/app/users/store/users.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(private usersService: UsersService, private store: Store) {}

  addUser(name: string): void {
    const user: UserInterface = {
      name,
      isEditing: false,
      id: Math.random().toString(16),
    };

    this.store.dispatch(addUser({ user }));

    // if (newUser) {
    //   this.usersService.addUser(newUser);
    // }
  }
}
