import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  map,
  switchMap,
  catchError,
  mergeMap,
  exhaustMap,
} from "rxjs/operators";

import { UsersService } from "src/app/users/services/users.service";
import { ActionTypes } from "src/app/users/store/actionTypes";
import * as userActions from "src/app/users/store/users.actions";
import { UserInterface } from "src/app/users/types/user.interface";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      exhaustMap(() => this.usersService.getAll()),
      map((users: UserInterface[]) =>
        userActions.loadUsersSuccess({ list: users })
      ),
      catchError((error: Error) => of(userActions.loadUsersFailure({ error })))
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addUser),
      switchMap(({ user }) =>
        this.usersService.addUser(user).pipe(
          map((user: UserInterface) => userActions.addUserSuccess({ user })),
          catchError((error: Error) =>
            of(userActions.addUserFailure({ error }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.UPDATE_USER),
      switchMap(({ user }) =>
        this.usersService.updateUser(user).pipe(
          map((updatedUser: UserInterface) =>
            userActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error: Error) =>
            of(userActions.updateUserFailure({ error }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.DELETE_USER),
      switchMap(({ userId }) =>
        this.usersService.deleteUser(userId).pipe(
          map((userId: string) => userActions.deleteUserSuccess({ userId })),
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
        this.usersService.deleteUsers().pipe(
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
