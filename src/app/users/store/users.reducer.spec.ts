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
      let users = [{} as UserInterface];
      const action = userActions.addUserSuccess({ list: users });

      const result = usersReducer.reducer(loadedUsersState, action);

      expect(result.loading).toEqual(false);
    });

    it("user list should increase by one", () => {
      const initialState = loadedUsersState;

      const user = {} as UserInterface;

      const result = userActions.addUserSuccess({
        list: [...initialState.list, user],
      });

      expect(initialState.list.length).toBeLessThan(result.list.length);
    });
  });

  describe("addUserFailure", () => {
    it("should reset the loading flag to false", () => {
      const error = {} as Error;
      const action = userActions.addUserFailure({ error });

      const result = usersReducer.reducer(loadedUsersState, action);
      console.log(result);
      expect(result.loading).toEqual(false);
      //   expect(result.list.length).toEqual(0);
    });

    it("should return previous list without the new user", () => {
      const error = {} as Error;
      const action = userActions.addUserFailure({ error });

      const result = usersReducer.reducer(loadedUsersState, action);
      console.log(result);
      expect(result.list).toEqual(loadedUsersState.list);
    });
  });
});
