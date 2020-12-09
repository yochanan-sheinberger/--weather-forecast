import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): any {
    return this.http.post('http://localhost:3000/authenticate', {
      username,
      password,
    }).toPromise();
  }

  public isAuthenticated(): boolean {
    const userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user: any): void {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public unSetUserInfo(): void {
    localStorage.removeItem('userInfo');
  }

}
