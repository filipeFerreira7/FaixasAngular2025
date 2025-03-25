import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseUrl: string = 'http://localhost:8080/estados';

  constructor(private httpClient: HttpClient) { 
  }

  findAll(page?:number, pageSize?:number): Observable<Estado[]> {
    let params = {};
    if(page !== undefined && pageSize !== undefined){
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Estado[]>(this.baseUrl, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  countFiltrados(nome: string): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/countFilter`, {
      params: { nome }
    });
  }
    findById(id: string): Observable<Estado>{
      return this.httpClient.get<Estado>(`${this.baseUrl}/${id}`);
    }
  
  findByNome(nome: string): Observable<Estado>{
    return this.httpClient.get<Estado>(`${this.baseUrl}/${nome}`);
  }

  getEstados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.baseUrl);
  }

  salvar(estado:Estado): Observable<Estado>{
    return this.httpClient.post<Estado>(this.baseUrl, estado);
  }

  update(estado:Estado): Observable<Estado>{
    return this.httpClient.put<Estado>(`${this.baseUrl}/${estado.id}`,estado);
  }

  delete(estado:Estado): Observable<Estado>{
    return this.httpClient.delete<Estado>(`${this.baseUrl}/${estado.id}`);
  }

}
