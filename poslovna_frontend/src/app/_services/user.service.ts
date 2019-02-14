import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  getById(id: number) {
    return this.http.get(`/users/` + id);
  }

  register(email: string, password: string, name: string, address: string, pib: string, type: string, telephone: string, isBank: boolean, web: string) {
    return this.http.post<any>(`http://localhost:1337/auth/register`, { email , password , name , address , pib , type , telephone , isBank , web })
  }

  update(user: User) {
    return this.http.put(`/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/` + id);
  }
}
