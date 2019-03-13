import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Bank } from '../_models';

@Injectable({ providedIn: 'root' })
export class BankService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Bank[]>(`http://localhost:1337/banks`);
  }

  getById(id: number) {
    return this.http.get(`/banks/` + id);
  }

  register(pib: number, name: string, address: string, country: string, city: string, email: string, web:string, telephone: string, fax: string, isCentral: boolean) {
    return this.http.post<any>(`http://localhost:1337/bank/registerBank`, { pib, name, address, country, city, email, web, telephone, fax, isCentral })
  }

  update(bank: Bank) {
    return this.http.put(`/banks/` + bank.id, bank);
  }

  delete(id: number) {
    return this.http.delete(`/banks/` + id);
  }
}