import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Agrupacion } from './agrupacion';
import { Chat } from './chat';

@Injectable()
export class ChatService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:6346/api/Evento/Global/';

    constructor(private http: Http) { }

    getAgrupaciones(nombreCiudad: string): Observable<Agrupacion[]> {
        const url = `${this.url}${nombreCiudad}/`;
        return this.http.get(url)
            .map(response => response.json() as Agrupacion[])
            .catch(this.handleError);
    }

    //setEvento(nurevoEvento: Evento): Promise<Evento> {
    //    return this.http
    //        .post(this.url, JSON.stringify(nurevoEvento), { headers: this.headers })
    //        .toPromise()
    //        .then(res => res.json() as Evento)
    //        .catch(this.handleError);
    //}

    setAgrupaciones(agrupacion: Agrupacion): Promise<Agrupacion> {
        const url = 'http://localhost:6346/api/Chat/CrearAgrupacion/'
        return this.http
            .post(url, JSON.stringify(agrupacion), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Agrupacion)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}