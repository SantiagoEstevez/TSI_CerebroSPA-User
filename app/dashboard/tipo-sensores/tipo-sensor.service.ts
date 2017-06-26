import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { TipoSensor } from './tipo-sensor';
import { TipoBaseSensor } from './tipo-base-sensor';

@Injectable()
export class TipoSensoresService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private UrlSB = 'http://localhost:6346/api/Sensor/Tipos';
    private url = 'api/tiposensores';  // URL to web api

    constructor(private http: Http) { }

    //--> Tipo de sensores <--
    getTipoSensores(): Promise<TipoSensor[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as TipoSensor[])
            .catch(this.handleError);
    }

    getTipoSensor(id: number): Promise<TipoSensor> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as TipoSensor)
            .catch(this.handleError);
    }

    delete(nombre: string): Promise<void> {
        const url = `${this.url}/${nombre}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setTipoSensor(nurevoTipoSensor: TipoSensor): Promise<TipoSensor> {
        return this.http
            .post(this.url, JSON.stringify(nurevoTipoSensor), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as TipoSensor)
            .catch(this.handleError);
    }

    updateTipoBaseSensor(tiposensor: TipoSensor): Promise<TipoSensor> {
        const url = `${this.url}/${tiposensor.nombre}`;
        return this.http
            .put(url, JSON.stringify(tiposensor), { headers: this.headers })
            .toPromise()
            .then(() => tiposensor)
            .catch(this.handleError);
    }


    //---> Tipo base de sensores <---
    getTipoBaseSensor(): Promise<TipoBaseSensor[]> {
        return this.http.get(this.UrlSB)
            .toPromise()
            .then(response => response.json() as TipoBaseSensor[] )
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}