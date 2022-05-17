import { createAction, props } from "@ngrx/store";
import { UserInterface } from "../types/user.interface";
import { ActionTypes } from "./actionTypes";

export const loadUsers = createAction(ActionTypes.LOAD_USERS);

export const loadUsersSuccess = createAction(
  ActionTypes.LOAD_USERS_SUCCESS,
  props<{
    list: UserInterface[];
  }>()
);

export const loadUsersFailure = createAction(
  ActionTypes.LOAD_USERS_FAILURE,
  props<{
    error: Error;
  }>()
);

export const addUser = createAction(
  ActionTypes.ADD_USER,
  props<{ user: UserInterface }>()
);

export const addUserSuccess = createAction(
  ActionTypes.ADD_USER_SUCCESS,
  props<{ list: UserInterface[] }>()
);

export const addUserFailure = createAction(
  ActionTypes.ADD_USER_FAILURE,
  props<{ error: Error }>()
);

export const deleteUser = createAction(
  ActionTypes.DELETE_USER,
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  ActionTypes.DELETE_USER_SUCCESS,
  props<{
    userId: string;
    list: UserInterface[];
  }>()
);

export const deleteUserFailure = createAction(
  ActionTypes.DELETE_USER_FAILURE,
  props<{
    error: Error;
  }>()
);

export const deleteUsers = createAction(ActionTypes.DELETE_USERS);

export const deleteUsersSuccess = createAction(
  ActionTypes.DELETE_USERS_SUCCESS
);

export const deleteUsersFailure = createAction(
  ActionTypes.DELETE_USERS_FAILURE,
  props<{
    error: Error;
  }>()
);
