import { UserDto } from '../../dto';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const USER_STATE_KEY = 'user';

export interface UserPartialState {
  [USER_STATE_KEY]: UserState;
}

export interface UserState {
  users: UserDto[];
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: [],
  loading: false,
  error: null,
}

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.loadUsers, (state): UserState => ({ ...state, loading: true, error: null })),
  on(UserActions.loadUsersSuccess, (state, { users }): UserState => ({ users, loading: false, error: null })),
  on(UserActions.loadUsersFailure, (state, { error }): UserState => ({ ...state, loading: false, error })),

  on(UserActions.createUser, (state): UserState => ({ ...state, loading: true, error: null })),
  on(UserActions.createUserSuccess, (state, { user }): UserState => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),
  on(UserActions.createUserFailure, (state, { error }): UserState => ({ ...state, loading: false, error })),

  on(UserActions.updateUser, (state): UserState => ({ ...state, loading: true, error: null })),
  on(UserActions.updateUserSuccess, (state, { user }): UserState => ({
    ...state,
    users: state.users.map(elem => elem.id === user.id ? user : elem),
    loading: false
  })),
  on(UserActions.updateUserFailure, (state, { error }): UserState => ({ ...state, loading: false, error })),

  on(UserActions.deleteUser, (state): UserState => ({ ...state, loading: true, error: null })),
  on(UserActions.deleteUserSuccess, (state, { userId }): UserState => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
    loading: false,
  })),
  on(UserActions.deleteUserFailure, (state, { error }): UserState => ({ ...state, loading: false, error })),
);
