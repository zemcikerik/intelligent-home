import { Action } from '@ngrx/store';
import { appReducer, AppState, initialAppState } from './app.reducer';
import { appLoadingFailure, appLoadingSuccess } from '../actions';

describe('AppReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const action: Action = { type: 'Unknown' };

      // when
      const result = appReducer(undefined, action);

      // then
      expect(result).toBe(initialAppState);
    });
  });

  describe('AppLoadingSuccess action', () => {
    it('should update the state in an immutable way', () => {
      // given
      const state = initialAppState;
      const action = appLoadingSuccess();

      // when
      const result = appReducer(state, action);

      // then
      expect(result).not.toBe(state);
    });

    it('should set loading to false', () => {
      // given
      const state: AppState = { loading: true, error: null };
      const action = appLoadingSuccess();

      // when
      const result = appReducer(state, action);

      // then
      expect(result.loading).toEqual(false);
    });
  });

  describe('AppLoadingFailure action', () => {
    it('should update the state in an immutable way', () => {
      // given
      const state = initialAppState;
      const action = appLoadingFailure({ error: 'Test Error' });

      // when
      const result = appReducer(state, action);

      // then
      expect(result).not.toBe(state);
    });

    it('should set loading to false', () => {
      // given
      const state: AppState = { loading: true, error: null };
      const action = appLoadingFailure({ error: 'Test Error' });

      // when
      const result = appReducer(state, action);

      // then
      expect(result.loading).toEqual(false);
    });

    it('should set error to error from action', () => {
      // given
      const state: AppState = { loading: true, error: null };
      const action = appLoadingFailure({ error: 'Test Error' });

      // when
      const result = appReducer(state, action);

      // then
      expect(result.error).toEqual('Test Error');
    });
  });
});
