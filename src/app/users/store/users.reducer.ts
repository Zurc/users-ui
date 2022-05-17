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

  on(
    userActions.addUser,
    (state, props): State => ({
      ...state,
      list: [...state.list, props.user],
      loading: true,
    })
  ),

  on(
    userActions.addUserSuccess,
    (state, props): State => ({
      ...state,
      list: props.list,
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
