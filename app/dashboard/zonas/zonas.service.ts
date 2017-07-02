import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Zona } from './zona';

@Injectable()
export class ZonasService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    //private url = 'api/zonas';  // URL to web api
    private url = 'http://localhost:6346/api/Evento/Zona/'

    constructor(private http: Http) { }

    //--> Tipo de sensores <--
    getZonas(): Promise<Zona[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json() as Zona[])
            .catch(this.handleError);
    }

    getZona(lat: string, lon: string): Promise<Zona> {
        const url = `${this.url}/${lat}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Zona)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setZona(nurevaZona: Zona): Promise<Zona> {
        return this.http
            .post(this.url, JSON.stringify(nurevaZona), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Zona)
            .catch(this.handleError);
    }

    getZonasByCityName(nombreCiudad: string): Promise<Zona[]> {
        const url = `${this.url}${nombreCiudad}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Zona[])
            .catch(this.handleError);
    }

    update(zona: Zona): Promise<Zona> {
        const url = `${this.url}/${zona.Latitude}`;
        return this.http
            .put(url, JSON.stringify(zona), { headers: this.headers })
            .toPromise()
            .then(() => zona)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}