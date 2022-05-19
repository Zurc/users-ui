import { TestBed } from "@angular/core/testing";
// import { MockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import {
  getTestActions,
  TestActions,
} from "src/app/helpers/test-helpers/test-action";
import { UsersService } from "../services/users.service";
import { UserInterface } from "../types/user.interface";
import { UserEffects } from "./users.effects";
import * as userActions from "src/app/users/store/users.actions";
import * as userSelectors from "src/app/users/store/users.selectors";
import { MockStore } from "src/app/helpers/mock-store";

describe("usersService.getAll is successful", () => {
  // let actions$: TestActions;

  let actions$: Observable<Actions>;
  let effects: UserEffects;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        // mockProvider
      ],
    })
  );

  // beforeEach(() => {
  //   actions$ = TestBed.inject(Actions);
  //   effects = TestBed.inject(UserEffects);
  //   service = TestBed.inject(UsersService);
  //   store = TestBed.inject(MockStore);
  // });

  describe("loadUsers$", () => {
    it("should return a list of users, when userActions.loadUsersSuccess", () => {
      const mockReturnValue = [
        {} as UserInterface,
        {} as UserInterface,
        {} as UserInterface,
      ];

      const action = userActions.loadUsers();
      const completion = userActions.loadUsersSuccess({
        list: mockReturnValue,
      });

      const mockService = jest.fn();
      mockService.mockReturnValue(of(mockReturnValue));
      // service.getAll.mockReturnValue(of(mockReturnValue));

      // store.mockState(userSelectors.getUsersListSelector, mockReturnValue);
      // store.mockReturnValue(userSelectors.getUsersListSelector, users);
      // store.refreshState();

      // Act
      // actions$.stream = hot("-a", { a: action });

      // Assert
      const expected = cold("-b", { b: completion });

      expect(effects.loadUsers$).toBeObservable(expected);
      // expect(service.getAll).toHaveBeenCalled();
    });
  });

  it("should expect true to be true", () => {
    expect(true).toBe(true);
  });
});
