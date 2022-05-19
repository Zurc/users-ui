import { TestBed } from "@angular/core/testing";
import { MockStore } from "@ngrx/store/testing";
import marbles from "jasmine-marbles";
import { UsersService } from "../services/users.service";
import { UserEffects } from "./users.effects";

describe("usersService.getAll is successful", () => {
  let service: UsersService;
  let effects: UserEffects;
  // let actions: UserActions;
  let store: MockStore;
  const initialState = {
    users: {
      list: [{ id: 1, name: "Coco", isEditing: false }],
      loading: false,
    },
  };

  beforeEach(
    async () =>
      await TestBed.configureTestingModule({
        providers: [
          UserEffects,
          {
            provide: UsersService,
            useValue: {
              getAll: jest.fn(),
              addUser: jest.fn(),
              updateUser: jest.fn(),
              deleteUserById: jest.fn(),
              deleteAll: jest.fn(),
            },
          },
          {
            provide: MockStore,
            useValue: initialState,
          },
        ],
      })
  );

  beforeEach(() => {
    // actions$ = TestBed.get(Actions);
    effects = TestBed.get(UserEffects);
    service = TestBed.get(UsersService);
    store = TestBed.get(store);
  });

  // it('should return an action of type LOAD_USERS', marbles(m => {
  //   const payload = {}

  // }))

  it("should expect true to be true", () => {
    expect(true).toBe(true);
  });
});

// loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ActionTypes.LOAD_USERS),
//       switchMap(() =>
//         this.usersService.getAll().pipe(
//           map((users: UserInterface[]) =>
//             userActions.loadUsersSuccess({ list: users })
//           ),
//           catchError((error: Error) =>
//             of(userActions.loadUsersFailure({ error }))
//           )
//         )
//       )
//     )
//   );
