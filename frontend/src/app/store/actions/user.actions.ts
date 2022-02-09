import { createAction, props } from '@ngrx/store';
import { UserCreateDto, UserDto, UserUpdateDto } from '../../dto';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: UserDto[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

export const createUser = createAction('[User] Create User', props<{ userCreationDto: UserCreateDto }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ user: UserDto }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ error: string }>());

export const updateUser = createAction('[User] Update User', props<{ userId: number, userUpdateDto: UserUpdateDto }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: UserDto }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());

export const resetUsers = createAction('[User] Reset Users');
