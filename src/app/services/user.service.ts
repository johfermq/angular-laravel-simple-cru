import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Interfaces */
import { UserI } from './../interfaces/user.interface';

/** Environment */
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  index(): Observable<UserI[]>
  {
    return this.http.get<UserI[]>(`${environment.api}/usuarios`)
             .pipe(
                map(response => response['data'])
              );
  }

  store(user: UserI): Observable<UserI>
  {
    return this.http.post<UserI>(`${environment.api}/usuarios`, user)
             .pipe(
                map(response => response['data'])
              );
  }

  update(user: UserI, id: number): Observable<UserI>
  {
    return this.http.put<UserI>(`${environment.api}/usuarios/${id}`, user)
             .pipe(
                map(response => response['data'])
              );
  }

}
