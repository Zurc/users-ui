import { Action, createReducer, on } from "@ngrx/store";
import { UsersStateInterface } from "src/app/users/types/user.interface";

import * as userActions from "src/app/users/store/users.actions";

export interface UsersState extends UsersStateInterface {
  loading: boolean;
  error?: Error | null;
}

export const initialState: UsersState = {
  list: [],
  loading: false,
};

const usersReducer = createReducer(
  initialState,

  /**
   * LOAD USERS
   */

  on(
    userActions.loadUsers,
    (state): UsersState => ({
      ...state,
      loading: true,
    })
  ),

  on(
    userActions.loadUsersSuccess,
    (state, props): UsersState => ({
      ...state,
      list: props.list,
      loading: false,
    })
  ),

  on(
    userActions.loadUsersFailure,
    (state): UsersState => ({
      ...state,
      loading: false,
    })
  ),

  /**
   * ADD USER
   */

  on(
    userActions.addUser,
    (state): UsersState => ({
      ...state,
      loading: true,
    })
  ),

  on(
    userActions.addUserSuccess,
    (state, props): UsersState => ({
      ...state,
      list: [...state.list, props.user],
      loading: false,
    })
  ),

  on(
    userActions.addUserFailure,
    (state, props): UsersState => ({
      ...state,
      loading: false,
      error: props.error,
    })
  ),

  /**
   * EDIT USER(S)
   */

  on(userActions.editUser, (state, props): UsersState => {
    const newList = [...state.list].map((user) =>
      user.id === props.userId
        ? {
            ...user,
            isEditing: true,
          }
        : user
    );
    return {
      ...state,
      list: newList,
    };
  }),

  on(userActions.editUsers, (state): UsersState => {
    const newList = [...state.list].map((user) => ({
      ...user,
      isEditing: true,
    }));
    return {
      ...state,
      list: newList,
    };
  }),

  /**
   * UPDATE USER
   */

  on(
    userActions.updateUser,
    (state): UsersState => ({
      ...state,
      loading: true,
    })
  ),

  on(userActions.updateUserSuccess, (state, props): UsersState => {
    const newList = [...state.list].map((user) =>
      user.id === props.user.id
        ? {
            ...user,
            name: props.user.name,
            isEditing: false,
          }
        : user
    );
    return {
      ...state,
      list: newList,
      loading: false,
    };
  }),

  on(
    userActions.updateUserFailure,
    (state, props): UsersState => ({
      ...state,
      loading: false,
      error: props.error,
    })
  ),

  /**
   * DELETE USERS(S)
   */

  on(
    userActions.deleteUser,
    (state): UsersState => ({
      ...state,
      loading: true,
    })
  ),

  on(userActions.deleteUserSuccess, (state, props): UsersState => {
    const index = [...state.list].findIndex((user) => user.id === props.userId);
    const newList = [
      ...state.list.slice(0, index),
      ...state.list.slice(index + 1),
    ];
    return {
      ...state,
      list: newList,
      loading: false,
    };
  }),

  on(
    userActions.deleteUserFailure,
    (state, props): UsersState => ({
      ...state,
      loading: false,
      error: props.error,
    })
  ),

  on(
    userActions.deleteUsers,
    (state): UsersState => ({
      ...state,
      loading: true,
    })
  ),

  on(
    userActions.deleteUsersSuccess,
    (state): UsersState => ({
      ...state,
      list: [],
      loading: false,
    })
  ),

  on(
    userActions.deleteUsersFailure,
    (state, props): UsersState => ({
      ...state,
      loading: false,
      error: props.error,
    })
  )
);

export function reducer(state: UsersState, action: Action) {
  return usersReducer(state, action);
}
