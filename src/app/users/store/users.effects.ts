import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

import { UsersService } from "src/app/users/services/users.service";
import { ActionTypes } from "src/app/users/store/actionTypes";
import * as userActions from "src/app/users/store/users.actions";
import { UserInterface } from "src/app/users/types/user.interface";

@Injectable()
export class UserEffects {
  /**
   * LOAD USERS
   */

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

  /**
   * ADD USER
   */

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.ADD_USER),
      switchMap(({ user }) =>
        this.usersService.addUser(user).pipe(
          map((users: UserInterface[]) =>
            userActions.addUserSuccess({ user, list: users })
          ),
          catchError((error: Error) =>
            of(userActions.addUserFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * UPDATE USER
   */

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.UPDATE_USER),
      switchMap(({ user }) =>
        this.usersService.updateUser(user).pipe(
          map((users: UserInterface[]) =>
            userActions.updateUserSuccess({ user, list: users })
          ),
          catchError((error: Error) =>
            of(userActions.updateUserFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * DELETE USER(S)
   */

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
