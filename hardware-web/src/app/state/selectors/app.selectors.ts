import { createSelector } from '@ngrx/store';
import { selectWifiError } from './wifi.selectors';
import { selectHomeError } from './home.selectors';

export const selectAppError = createSelector(selectHomeError, selectWifiError, (homeError, wifiError) => {
  if (!homeError && !wifiError) {
    return null;
  }

  let error = '';

  if (homeError) {
    error += `Home: ${homeError}`;

    if (wifiError) {
      error += '\n';
    }
  }

  if (wifiError) {
    error += `Wi-Fi ${wifiError}`;
  }

  return error;
});
