import { TestBed } from "@angular/core/testing";
import { mockProvider, SpyObject } from "@ngneat/spectator/jest";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Actions } from "@ngrx/effects";
import { Observable, throwError } from "rxjs";

import { UsersService } from "../services/users.service";
import { UserInterface } from "../types/user.interface";
import { UserEffects } from "./users.effects";
import * as userActions from "src/app/users/store/users.actions";

describe("usersService.getAll is successful", () => {
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
});
