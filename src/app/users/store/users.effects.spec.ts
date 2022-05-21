import { TestBed } from "@angular/core/testing";
import { mockProvider, SpyObject } from "@ngneat/spectator/jest";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Actions } from "@ngrx/effects";
import { Observable, of, throwError } from "rxjs";

import { UsersService } from "../services/users.service";
import { UserInterface } from "../types/user.interface";
import { UserEffects } from "./users.effects";
import * as userActions from "src/app/users/store/users.actions";
import { type } from "os";
import { ActionTypes } from "./actionTypes";

describe("usersEffects", () => {
  let actions$: Observable<Actions>;
  let effects: UserEffects;
  let usersStub: SpyObject<UsersService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        mockProvider(UsersService),
      ],
    });

    effects = TestBed.inject(UserEffects);
    usersStub = TestBed.inject(UsersService) as SpyObject<UsersService>;
  });

  describe("loadUsers$", () => {
    it("should return userActions.loadUsersSuccess on success", () => {
      const userList: UserInterface[] = [
        {} as UserInterface,
        {} as UserInterface,
      ];
      const action = userActions.loadUsers();
      const completion = userActions.loadUsersSuccess({ list: userList });

      actions$ = hot("-a", { a: action });
      const response = cold("-a|", { a: userList });
      usersStub.getAll.andReturn(response);

      const expected = cold("--b", { b: completion });
      expect(effects.loadUsers$).toBeObservable(expected);
      expect(usersStub.getAll).toHaveBeenCalled();
    });

    it("should return userActions.loadUsersFailure on failure", () => {
      const action = userActions.loadUsers();
      const error = {} as Error;
      const completion = userActions.loadUsersFailure({ error });

      usersStub.getAll.andReturn(throwError(() => new Error()));

      actions$ = hot("-a", { a: action });
      const response = cold("-#|", {}, error);
      usersStub.getAll.andReturn(response);

      const expected = cold("--(b|)", { b: completion });

      expect(effects.loadUsers$).toBeObservable(expected);
      expect(usersStub.getAll).toHaveBeenCalled();
    });
  });

  describe("addUsers$", () => {
    it("should return userActions.addUserSuccess on success", () => {
      const userList: UserInterface[] = [
        {} as UserInterface,
        {} as UserInterface,
      ];
      const newUser = {} as UserInterface;

      const actions = new Actions(
        hot("-a", {
          a: {
            type: ActionTypes.ADD_USER,
            user: newUser,
          },
        })
      );

      usersStub.addUser.andReturn(of(newUser));

      effects.addUser$.subscribe((action) => {
        expect(action).toEqual({
          type: ActionTypes.ADD_USER_SUCCESS,
          user: newUser,
        });
      });
    });

    it("should return userActions.addUserFailure on failure", () => {
      const newUser = {} as UserInterface;
      const error = {} as Error;

      const actions = new Actions(
        hot("-a", {
          a: {
            type: ActionTypes.ADD_USER,
            user: newUser,
          },
        })
      );

      usersStub.addUser.andReturn(of({ error }));

      effects.addUser$.subscribe((action) => {
        expect(action).toEqual({
          type: ActionTypes.ADD_USER_FAILURE,
          error: { error },
        });
      });
    });
  });

  describe("updateUsers$", () => {
    it("should return userActions.updateUserSuccess on success", () => {
      const userList: UserInterface[] = [
        {} as UserInterface,
        {} as UserInterface,
      ];
      const newUser = {} as UserInterface;

      const actions = new Actions(
        hot("-a", {
          a: {
            type: ActionTypes.UPDATE_USER,
            user: newUser,
          },
        })
      );

      usersStub.updateUser.andReturn(of([...userList, newUser]));

      effects.updateUser$.subscribe((action) => {
        expect(action).toEqual({
          type: ActionTypes.UPDATE_USER_SUCCESS,
          users: [...userList, newUser],
        });
      });
    });

    it("should return userActions.updateUserFailure on failure", () => {
      const newUser = {} as UserInterface;
      const error = {} as Error;

      const actions = new Actions(
        hot("-a", {
          a: {
            type: ActionTypes.UPDATE_USER,
            user: newUser,
          },
        })
      );

      usersStub.updateUser.andReturn(of({ error }));

      effects.updateUser$.subscribe((action) => {
        expect(action).toEqual({
          type: ActionTypes.UPDATE_USER_FAILURE,
          error: { error },
        });
      });
    });
  });

  describe("deleteUsers$", () => {
    it("should return userActions.deleteUserSuccess on success", () => {
      const userId = 1;

      const actions = new Actions(
        hot("-a", {
          a: {
            type: ActionTypes.DELETE_USER,
            userId,
          },
        })
      );

      usersStub.deleteUser.andReturn(of(userId));

      effects.deleteUser$.subscribe((action) => {
        expect(action).toEqual({
          type: ActionTypes.DELETE_USER_SUCCESS,
          userId,
        });
      });
    });

    it("should return userActions.deleteUserFailure on failure", () => {
      const userId = 1;
      const error = {} as Error;

      const actions = new Actions(
        hot("-a", {
          a: {
            type: ActionTypes.DELETE_USER,
            userId,
          },
        })
      );

      usersStub.deleteUser.andReturn(of({ error }));

      effects.deleteUser$.subscribe((action) => {
        expect(action).toEqual({
          type: ActionTypes.DELETE_USER_FAILURE,
          error: { error },
        });
      });
    });
  });
});
