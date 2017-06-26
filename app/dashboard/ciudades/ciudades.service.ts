import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Ciudad } from './ciudad';
import { MemoriaService } from './memoria.service'

@Injectable()
export class CiudadesService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    //private Url = 'api/ciudad';  // URL to web api
    private Url = 'http://localhost:6346/api/ciudad/'

    constructor(private http: Http) { }

    getUsuarios(): Promise<Ciudad[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json() as Ciudad[])
            .catch(this.handleError);
    }

    getAll(): Promise<Ciudad[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getUsuarios()), 4000);
        });
    }    

    getCiudades(): Promise<Ciudad[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json() as Ciudad[])
            .catch(this.handleError);
    }

    getCiudad(lat: string): Promise<Ciudad> {
        const url = `${this.Url}/'Monte'`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Ciudad)
            .catch(this.handleError);
    }

    delete(lat: number): Promise<void> {
        const url = `${this.Url}/"${lat}"`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setCiudad(nuevaCiudad: Ciudad): Promise<Ciudad> {
        return this.http
            .post(this.Url, JSON.stringify(nuevaCiudad), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Ciudad)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}