import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseUrl: string = 'http://localhost:8080/cidades';

  constructor(private httpClient: HttpClient) { 
  }

    findAll(page?:number, pageSize?:number): Observable<Cidade[]> {
      let params = {};
      if(page !== undefined && pageSize !== undefined){
        params = {
          page: page.toString()
        }
      }
      return this.httpClient.get<Cidade[]>(this.baseUrl, {params});
    }
  
    count(): Observable<number> {
      return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

  getCidades(): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(this.baseUrl);
  }

  salvar(cidade:Cidade): Observable<Cidade>{
    return this.httpClient.post<Cidade>(this.baseUrl, cidade);
  }

  findById(id: string): Observable<Cidade>{
    return this.httpClient.get<Cidade>(`${this.baseUrl}/${id}`);
  }

  update(cidade:Cidade): Observable<Cidade>{
    return this.httpClient.put<Cidade>(`${this.baseUrl}/${cidade.id}`,cidade);
  }

  delete(cidade:Cidade): Observable<Cidade>{
    return this.httpClient.delete<Cidade>(`${this.baseUrl}/${cidade.id}`);
  }

}
