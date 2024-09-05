import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable, tap } from 'rxjs';
import { Contrat } from '../Interface/contrat.interface';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getContrat(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/contrats`);
  }
  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.baseUrl}/contrats/${id}`);
  }
  addContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.baseUrl}/contrats/addcontrat`, contrat);
  }
  deleteContrat(id: number): Observable<Contrat>{
    return this.http.delete<Contrat>(`${this.baseUrl}/contrats/deleteContrat/${id}`);
  }
  PutContrat(contrat:Contrat): Observable <Contrat>{
    return this.http.put<Contrat>(`${this.baseUrl}/contrats/updateContrat`, contrat);
  }
}
function cacheError(arg0: void): import("rxjs").OperatorFunction<Contrat, Contrat> {
  throw new Error('Function not implemented.');
}