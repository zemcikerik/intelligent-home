import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { WifiEncryptionType, WifiNetwork, WifiStatus } from '../models';

@Injectable()
export class WifiService {

  constructor(private httpClient: HttpClient) {
  }

  getAvailableNetworks(): Observable<WifiNetwork[]> {
    return this.ofWithDelay([
      { ssid: 'Network 1', rssi: -70, channel: 3, type: WifiEncryptionType.OPEN },
      { ssid: 'Network 2', rssi: -70, channel: 3, type: WifiEncryptionType.OPEN },
      { ssid: 'Network 3', rssi: -70, channel: 3, type: WifiEncryptionType.WPA2_PSK },
    ]);
  }

  getConnectionStatus(): Observable<WifiStatus> {
    return this.ofWithDelay({
      connected: true,
      ssid: 'Hello, World!',
      bssid: '07-C5-D5-8A-98-BB',
      rssi: -70,
      ip: '192.168.0.100',
    });
  }

  connect(): Observable<any> {
    return this.ofWithDelay(null);
  }

  disconnect(): Observable<any> {
    return this.ofWithDelay(null);
  }

  ofWithDelay<T>(value: T, delayMs: number = 3000): Observable<T> {
    return of(value).pipe(
      delay(delayMs)
    );
  }

}
