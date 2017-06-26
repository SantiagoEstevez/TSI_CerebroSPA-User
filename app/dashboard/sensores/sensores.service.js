"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var SensoresService = (function () {
    function SensoresService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        //private url = 'api/sensores';  // URL to web api
        this.Url = 'http://localhost:6346/api/Sensor/';
    }
    //--> Tipo de sensores <--
    SensoresService.prototype.getSensores = function (lat, lon) {
        var Url = this.Url + "CiudadLatitud/" + lat + "/CiudadLongitud/" + lon + "/";
        return this.http.get(Url)
            .map(function (response) { return response.json(); });
    };
    SensoresService.prototype.getTipoSensor = function (id) {
        var url = this.Url + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    SensoresService.prototype.delete = function (id) {
        var url = this.Url + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    SensoresService.prototype.setSensor = function (nuevoSensor) {
        return this.http
            .post(this.Url, JSON.stringify(nuevoSensor), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //update(sensor: Sensor): Promise<Sensor> {
    //    const url = `${this.heroesUrl}/${hero.id}`;
    //    return this.http
    //        .put(url, JSON.stringify(hero), { headers: this.headers })
    //        .toPromise()
    //        .then(() => hero)
    //        .catch(this.handleError);
    //}
    SensoresService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SensoresService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SensoresService);
    return SensoresService;
}());
exports.SensoresService = SensoresService;
//# sourceMappingURL=sensores.service.js.map