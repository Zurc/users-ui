import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { UserInterface } from "../../types/user.interface";
import { addUser } from "src/app/users/store/users.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(private store: Store) {}

  addUser(name: string): void {
    const user: UserInterface = {
      name,
      isEditing: false,
      id: Math.random().toString(16),
    };

    this.store.dispatch(addUser({ user }));
  }
}
