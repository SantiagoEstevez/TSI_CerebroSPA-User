import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Sensor } from './sensor';
import { Ciudad } from '../ciudades/ciudad';
import { LecturaSensor } from './lecturasensor';

@Injectable()
export class SensoresService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    //private url = 'api/sensores';  // URL to web api
    private Url = 'http://localhost:6346/api/Sensor/'

    constructor(private http: Http) { }

    //--> Tipo de sensores <--
    getSensores(lat: number, lon: number): Observable<Sensor[]> {
        const Url = `${this.Url}CiudadLatitud/${lat}/CiudadLongitud/${lon}/`;
        return this.http.get(Url)
            .map(response => response.json() as Sensor[]);
    }

    getSensoresByCityName(nombreCiudad: string): Observable<Sensor[]> {
        const Url = `${this.Url}${nombreCiudad}/`;
        return this.http.get(Url)
            .map(response => response.json() as Sensor[]);
    }

    getTipoSensor(id: number): Promise<Sensor> {
        const url = `${this.Url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Sensor)
            .catch(this.handleError);
    }

    getDatosSenores(nombreCiudad: string): Promise<LecturaSensor[]> {
        const url = `${this.Url}Tabla/${nombreCiudad}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as LecturaSensor[])
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.Url}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setSensor(nuevoSensor: Sensor): Promise<Sensor> {
        return this.http
            .post(this.Url, JSON.stringify(nuevoSensor), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Sensor)
            .catch(this.handleError);
    }

    //update(sensor: Sensor): Promise<Sensor> {
    //    const url = `${this.heroesUrl}/${hero.id}`;
    //    return this.http
    //        .put(url, JSON.stringify(hero), { headers: this.headers })
    //        .toPromise()
    //        .then(() => hero)
    //        .catch(this.handleError);
    //}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}