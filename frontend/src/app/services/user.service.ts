import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL_TOKEN } from './server-url.token';
import { Observable } from 'rxjs';
import { UserCreationDto, UserDto, UserUpdateDto } from '../dto';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
    @Inject(SERVER_URL_TOKEN) private serverUrl: string,
  ) { }

  getUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${this.serverUrl}/user`);
  }

  createUser(userCreationDto: UserCreationDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.serverUrl}/user`, userCreationDto);
  }

  updateUser(id: number, userUpdate: UserUpdateDto): Observable<UserDto> {
    return this.httpClient.put<UserDto>(`${this.serverUrl}/user/${id}`, userUpdate);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/user/${id}`);
  }

}
