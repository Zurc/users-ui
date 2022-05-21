import { UsersState } from "./users.reducer";
import * as usersReducer from "src/app/users/store/users.reducer";
import * as userActions from "src/app/users/store/users.actions";
import { UserInterface } from "../types/user.interface";

describe("Users reducers", () => {
  const initialState: UsersState = {
    list: [],
    loading: false,
  };

  const loadingState: UsersState = {
    ...initialState,
    loading: true,
  };

  const loadedUsersState: UsersState = {
    ...initialState,
    list: [{} as UserInterface, {} as UserInterface],
    loading: false,
  };

  describe("initial state", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = usersReducer.reducer(initialState, action);

      expect(result).toEqual(usersReducer.initialState);
    });
  });

  describe("loading Users", () => {
    describe("loadUsers", () => {
      it("should set the loading flag to true", () => {
        const action = userActions.loadUsers();

        const result = usersReducer.reducer(initialState, action);

        expect(result).toEqual(loadingState);
      });
    });

    describe("loadUsersSuccess", () => {
      it("should reset the loading flag", () => {
        let users = [{} as UserInterface, {} as UserInterface];
        const action = userActions.loadUsersSuccess({ list: users });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.loading).toEqual(false);
      });

      it("user list should increase when loading users", () => {
        let users = [{} as UserInterface, {} as UserInterface];
        const action = userActions.loadUsersSuccess({ list: users });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.list.length).toBeGreaterThan(initialState.list.length);
      });
    });

    describe("loadUsersFailure", () => {
      it("should reset the loading flag to false and empty list", () => {
        const error = {} as Error;
        const action = userActions.loadUsersFailure({ error });

        const result = usersReducer.reducer(loadingState, action);

        expect(result.loading).toEqual(false);
        expect(result.list.length).toEqual(0);
      });
    });
  });

  describe("adding Users", () => {
    describe("addUser", () => {
      it("should set the loading flag to true", () => {
        const user = {} as UserInterface;
        const action = userActions.addUser({ user });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.loading).toEqual(true);
      });
    });

    describe("addUserSuccess", () => {
      it("should reset the loading flag to false", () => {
        let user = {} as UserInterface;
        const action = userActions.addUserSuccess({ user });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.loading).toEqual(false);
      });

      it("user list should increase", () => {
        const initialState = loadedUsersState;
        let user = {} as UserInterface;
        const action = userActions.addUserSuccess({ user });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(initialState.list.length).toBeLessThan(result.list.length);
      });
    });

    describe("addUserFailure", () => {
      it("should reset the loading flag to false", () => {
        const error = {} as Error;
        const action = userActions.addUserFailure({ error });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.loading).toEqual(false);
      });

      it("should return previous list without the new user", () => {
        const error = {} as Error;
        const action = userActions.addUserFailure({ error });

        const result = usersReducer.reducer(loadedUsersState, action);
        expect(result.list).toEqual(loadedUsersState.list);
      });
    });
  });

  describe("editing users", () => {
    describe("editUser", () => {
      it("should set isEditing flag to true for that user", () => {
        const initialUser = { id: "a", name: "Coco", isEditing: false };
        const initialState: UsersState = {
          list: [initialUser],
          loading: true,
        };
        const action = userActions.editUser({ userId: initialUser.id });

        const result = usersReducer.reducer(initialState, action);

        expect(result.list.find((u) => u.id === "a")?.isEditing).toBe(true);
      });
    });

    describe("editUsers", () => {
      it("should set isEditing flag to true for all user", () => {
        const initialList = [
          { id: "a", name: "Coco", isEditing: false },
          { id: "b", name: "John", isEditing: false },
        ];
        const initialState: UsersState = {
          list: [...initialList],
          loading: true,
        };
        const action = userActions.editUsers();

        const result = usersReducer.reducer(initialState, action);

        expect(result.list.filter((u) => u.isEditing).length).toEqual(
          initialState.list.length
        );
      });
    });
  });

  describe("updating Users", () => {
    describe("updateUser", () => {
      it("should set the loading flag to true", () => {
        const user = {} as UserInterface;
        const action = userActions.updateUser({ user });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.loading).toEqual(true);
      });
    });

    describe("updateUserSuccess", () => {
      it("should reset the loading flag to false", () => {
        let user = {} as UserInterface;
        const action = userActions.updateUserSuccess({ user });

        const result = usersReducer.reducer(loadedUsersState, action);

        expect(result.loading).toEqual(false);
      });

      it("user should be updated on the list", () => {
        const initialUser = { id: "a", name: "Coco", isEditing: true };
        const updatedUser = { id: "a", name: "Coconuts", isEditing: false };
        const initialState: UsersState = {
          list: [initialUser],
          loading: true,
        };
        const expectedState: UsersState = {
          list: [updatedUser],
          loading: false,
        };
        const action = userActions.updateUserSuccess({ user: updatedUser });

        const result = usersReducer.reducer(initialState, action);

        expect(initialState.list.find((u) => u.id === "a")).not.toBe(
          result.list.find((u) => u.id === "a")
        );
      });
    });

    describe("updateUserFailure", () => {
      const initialState: UsersState = {
        list: [{ id: "a", name: "Coco", isEditing: true }],
        loading: true,
      };
      const expectedState: UsersState = {
        list: [{ id: "a", name: "Coco", isEditing: false }],
        loading: false,
      };

      it("should reset the loading flag to false", () => {
        const error = {} as Error;
        const action = userActions.updateUserFailure({ error });

        const result = usersReducer.reducer(initialState, action);

        expect(result.loading).toEqual(false);
      });

      it("should return previous list without the updated user", () => {
        const error = {} as Error;
        const action = userActions.updateUserFailure({ error });

        const result = usersReducer.reducer(initialState, action);

        expect(result.list).toEqual(initialState.list);
      });
    });
  });

  describe("deleting Users", () => {
    describe("delete Individual User", () => {
      describe("deleteUser", () => {
        it("should set the loading flag to true", () => {
          const userId = "a";
          const action = userActions.deleteUser({ userId });

          const result = usersReducer.reducer(loadedUsersState, action);

          expect(result.loading).toEqual(true);
        });
      });
      describe("deleteUserSuccess", () => {
        it("user should be deleted from the list", () => {
          const initialUser = { id: "a", name: "Coco", isEditing: true };
          const initialState: UsersState = {
            list: [initialUser],
            loading: true,
          };
          const action = userActions.deleteUserSuccess({
            userId: initialUser.id,
          });

          const result = usersReducer.reducer(initialState, action);

          expect(result.list.find((u) => u.id === "a")).toBe(undefined);
        });
      });
      describe("deleteUserFailure", () => {
        const initialState: UsersState = {
          list: [{ id: "a", name: "Coco", isEditing: true }],
          loading: true,
        };

        it("should reset the loading flag to false", () => {
          const error = {} as Error;
          const action = userActions.deleteUserFailure({ error });

          const result = usersReducer.reducer(initialState, action);

          expect(result.loading).toEqual(false);
        });

        it("should return previous list", () => {
          const error = {} as Error;
          const action = userActions.deleteUserFailure({ error });

          const result = usersReducer.reducer(initialState, action);

          expect(result.list).toEqual(initialState.list);
        });
      });
    });

    describe("delete All Users", () => {
      describe("deleteUsers", () => {
        it("should set the loading flag to true", () => {
          const userId = "a";
          const action = userActions.deleteUsers();

          const result = usersReducer.reducer(loadedUsersState, action);

          expect(result.loading).toEqual(true);
        });
      });
      describe("deleteUsersSuccess", () => {
        it("user list should be empty", () => {
          const initialUser = { id: "a", name: "Coco", isEditing: true };
          const initialState: UsersState = {
            list: [initialUser],
            loading: true,
          };
          const action = userActions.deleteUsersSuccess();

          const result = usersReducer.reducer(initialState, action);

          expect(result.list.length).toBe(0);
        });
      });
      describe("deleteUsersFailure", () => {
        const initialState: UsersState = {
          list: [{ id: "a", name: "Coco", isEditing: true }],
          loading: true,
        };

        it("should reset the loading flag to false", () => {
          const error = {} as Error;
          const action = userActions.deleteUsersFailure({ error });

          const result = usersReducer.reducer(initialState, action);

          expect(result.loading).toEqual(false);
        });

        it("should return previous list", () => {
          const error = {} as Error;
          const action = userActions.deleteUsersFailure({ error });

          const result = usersReducer.reducer(initialState, action);

          expect(result.list).toEqual(initialState.list);
        });
      });
    });
  });
});
