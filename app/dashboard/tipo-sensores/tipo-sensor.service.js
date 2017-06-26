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
var TipoSensoresService = (function () {
    function TipoSensoresService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.UrlSB = 'http://localhost:6346/api/Sensor/Tipos';
        this.url = 'api/tiposensores'; // URL to web api
    }
    //--> Tipo de sensores <--
    TipoSensoresService.prototype.getTipoSensores = function () {
        return this.http.get(this.url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    TipoSensoresService.prototype.getTipoSensor = function (id) {
        var url = this.url + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    TipoSensoresService.prototype.delete = function (nombre) {
        var url = this.url + "/" + nombre;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    TipoSensoresService.prototype.setTipoSensor = function (nurevoTipoSensor) {
        return this.http
            .post(this.url, JSON.stringify(nurevoTipoSensor), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    TipoSensoresService.prototype.updateTipoBaseSensor = function (tiposensor) {
        var url = this.url + "/" + tiposensor.nombre;
        return this.http
            .put(url, JSON.stringify(tiposensor), { headers: this.headers })
            .toPromise()
            .then(function () { return tiposensor; })
            .catch(this.handleError);
    };
    //---> Tipo base de sensores <---
    TipoSensoresService.prototype.getTipoBaseSensor = function () {
        return this.http.get(this.UrlSB)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TipoSensoresService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TipoSensoresService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TipoSensoresService);
    return TipoSensoresService;
}());
exports.TipoSensoresService = TipoSensoresService;
//# sourceMappingURL=tipo-sensor.service.js.map