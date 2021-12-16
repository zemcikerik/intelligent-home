import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL_TOKEN } from './server-url.token';

@Injectable({
  providedIn: 'root'
})
export class AddDeviceService {

  constructor(
    private httpClient: HttpClient,
    @Inject(SERVER_URL_TOKEN) private serverUrl: string
  ) { }

  requestDeviceAddition(requestId: string) {
    const url = `${this.serverUrl}/device/request-add/?requestId="${requestId}"`;
    return this.httpClient.post(url, null);
  }
}
