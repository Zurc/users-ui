import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { UsersService } from "src/app/users/services/users.service";
import { UserInterface } from "src/app/users/types/user.interface";
import { ActionTypes } from "../../store/actionTypes";
import { getUsersListSelector } from "../../store/users.selectors";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  users$!: Observable<UserInterface[]>;
  noUsers$!: Observable<boolean>;

  userList$: Observable<UserInterface[]> = this.store.pipe(
    select(getUsersListSelector)
  );

  constructor(private usersService: UsersService, private store: Store) {}

  ngOnInit(): void {
    // this.noUsers$! = this.usersService.users$.pipe(
    //   map((users) => users.length === 0)
    // );
    // this.users$! = this.usersService.users$;
    // this.usersService.getAll();

    this.store.dispatch({ type: ActionTypes.LOAD_USERS });
  }

  editAll(): void {
    this.usersService.editAll();
  }

  deleteAll(): void {
    // this.usersService.deleteAll();

    this.store.dispatch({ type: ActionTypes.DELETE_USERS });
  }
}
