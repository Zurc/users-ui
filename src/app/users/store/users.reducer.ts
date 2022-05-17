import { Action, createReducer, on } from "@ngrx/store";
import { UsersStateInterface } from "src/app/users/types/user.interface";

import * as userActions from "src/app/users/store/users.actions";

export interface State extends UsersStateInterface {
  loading: boolean;
  error?: Error | any;
}

const initialState: State = {
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
    (state): State => ({
      ...state,
      loading: true,
    })
  ),

  on(
    userActions.loadUsersSuccess,
    (state, props): State => ({
      ...state,
      list: props.list,
      loading: false,
    })
  ),

  on(
    userActions.loadUsersFailure,
    (state): State => ({
      ...state,
      loading: false,
    })
  ),

  /**
   * ADD USER
   */

  on(
    userActions.addUser,
    (state, props): State => ({
      ...state,
      loading: true,
    })
  ),

  on(
    userActions.addUserSuccess,
    (state, props): State => ({
      ...state,
      list: [...state.list, props.user],
      loading: false,
    })
  ),

  on(
    userActions.addUserFailure,
    (state, props): State => ({
      ...state,
      loading: false,
      error: props.error,
    })
  ),

  /**
   * EDIT USER(S)
   */

  on(userActions.editUser, (state, props): State => {
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

  on(userActions.editUsers, (state): State => {
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
    (state, props): State => ({
      ...state,
      loading: true,
    })
  ),

  on(userActions.updateUserSuccess, (state, props): State => {
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
    (state, props): State => ({
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
    (state, props): State => ({
      ...state,
      loading: true,
    })
  ),

  on(userActions.deleteUserSuccess, (state, props): State => {
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
    (state, props): State => ({
      ...state,
      loading: false,
      error: props.error,
    })
  ),

  on(
    userActions.deleteUsers,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),

  on(
    userActions.deleteUsersSuccess,
    (state): State => ({
      ...state,
      list: [],
      loading: false,
    })
  ),

  on(
    userActions.deleteUsersFailure,
    (state, props): State => ({
      ...state,
      loading: false,
      error: props.error,
    })
  )
);

export function reducers(state: State, action: Action) {
  return usersReducer(state, action);
}
