import { HomeState } from './home-state.model';
import { ServerInfo } from './server-info.model';

export interface HomeStatusWithServerInfo {
  state: HomeState;
  hasServerInfo: true;
  serverInfo: ServerInfo;
}

export interface HomeStatusWithoutServerInfo {
  state: HomeState;
  hasServerInfo: false;
}

export type HomeStatus = HomeStatusWithServerInfo | HomeStatusWithoutServerInfo;
