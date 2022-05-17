import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersStateInterface } from "../types/user.interface";

export const getUsersState =
  createFeatureSelector<UsersStateInterface>("users");

export const getUsersListSelector = createSelector(
  getUsersState,
  (state: UsersStateInterface) => state.list
);
