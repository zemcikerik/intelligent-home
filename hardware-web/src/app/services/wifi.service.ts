import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WifiConnect, WifiNetwork, WifiStatus } from '../models';

@Injectable()
export class WifiService {

  constructor(private httpClient: HttpClient) {
  }

  getAvailableNetworks(): Observable<WifiNetwork[]> {
    return this.httpClient.get<WifiNetwork[]>('/api/wifi/networks');
  }

  getConnectionStatus(): Observable<WifiStatus> {
    return this.httpClient.get<WifiStatus>('/api/wifi');
  }

  connect(wifiConnect: WifiConnect): Observable<any> {
    return this.httpClient.post('/api/wifi', wifiConnect);
  }

  disconnect(): Observable<any> {
    return this.httpClient.delete('/api/wifi');
  }

}
