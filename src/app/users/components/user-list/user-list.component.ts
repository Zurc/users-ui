import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { map, Observable, tap } from "rxjs";
import { UsersService } from "src/app/users/services/users.service";
import { UserInterface } from "src/app/users/types/user.interface";
import { ActionTypes } from "../../store/actionTypes";
import { getUsersListSelector } from "../../store/users.selectors";
import {
  loadUsers,
  editUsers,
  deleteUsers,
} from "src/app/users/store/users.actions";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  noUsers$!: Observable<boolean>;
  usersLength: number = 0;

  userList$: Observable<UserInterface[]> = this.store.pipe(
    select(getUsersListSelector)
  );

  constructor(private usersService: UsersService, private store: Store) {}

  ngOnInit(): void {
    this.noUsers$ = this.userList$.pipe(map((users) => users.length === 0));

    this.store.dispatch(loadUsers());
  }

  editAll(): void {
    this.store.dispatch(editUsers());
  }

  deleteAll(): void {
    this.store.dispatch(deleteUsers());
  }
}
