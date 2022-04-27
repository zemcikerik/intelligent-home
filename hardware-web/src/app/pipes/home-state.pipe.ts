import { Pipe, PipeTransform } from '@angular/core';
import { HomeState } from '../models';

@Pipe({
  name: 'homeState'
})
export class HomeStatePipe implements PipeTransform {

  readonly STATE_TO_TEXT: { [K in HomeState]: string } = {
    [HomeState.WAITING_FOR_NETWORK]: 'Waiting for network',
    [HomeState.WAITING_FOR_SERVER_INFO]: 'Waiting for server info',
    [HomeState.CONNECTING]: 'Connecting',
    [HomeState.AUTH]: 'Authenticating',
    [HomeState.READY]: 'READY',
  };

  transform(value: HomeState): string {
    return this.STATE_TO_TEXT[value];
  }

}
