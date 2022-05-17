import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { UserInterface } from "src/app/users/types/user.interface";
import {
  editUser,
  deleteUser,
  updateUser,
} from "src/app/users/store/users.actions";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent {
  @Input("user") userProps!: UserInterface;
  name: string = "";

  constructor(private store: Store) {}

  onUserChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.name = target.value;
  }

  onSave(user: UserInterface) {
    const nameValue = this.name ? this.name : user.name;
    const updatedUser = {
      ...user,
      name: nameValue,
      isEditing: false,
    };

    this.store.dispatch(updateUser({ user: updatedUser }));
  }

  onEdit(id: string) {
    this.store.dispatch(editUser({ userId: id }));
  }

  onDelete(id: string) {
    this.store.dispatch(deleteUser({ userId: id }));
  }
}
