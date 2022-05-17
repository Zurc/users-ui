import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, mergeMap } from "rxjs";
import {
  map,
  switchMap,
  catchError,
  take,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";

import { UsersService } from "src/app/users/services/users.service";
import { ActionTypes } from "src/app/users/store/actionTypes";
import * as userActions from "src/app/users/store/users.actions";
import { UserInterface } from "../types/user.interface";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LOAD_USERS),
      switchMap(() =>
        this.usersService.getAll().pipe(
          map((users: UserInterface[]) =>
            userActions.loadUsersSuccess({ list: users })
          ),
          catchError((error: Error) =>
            of(userActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.DELETE_USER),
      switchMap(({ userId }) =>
        this.usersService.deleteUserById(userId).pipe(
          map((users: UserInterface[]) =>
            userActions.deleteUserSuccess({ userId, list: users })
          ),
          catchError((error: Error) =>
            of(userActions.deleteUserFailure({ error }))
          )
        )
      )
    )
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.DELETE_USERS),
      switchMap(() =>
        this.usersService.deleteAll().pipe(
          map(() => userActions.deleteUsersSuccess()),
          catchError((error: Error) =>
            of(userActions.deleteUsersFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
