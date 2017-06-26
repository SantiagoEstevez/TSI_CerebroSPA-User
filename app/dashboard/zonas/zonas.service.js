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
var ZonasService = (function () {
    //private url = 'http://localhost:6346/api/Evento/Zona/'
    function ZonasService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = 'api/zonas'; // URL to web api
    }
    //--> Tipo de sensores <--
    ZonasService.prototype.getZonas = function () {
        return this.http.get(this.url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ZonasService.prototype.getZona = function (lat, lon) {
        var url = this.url + "/" + lat;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ZonasService.prototype.delete = function (id) {
        var url = this.url + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    ZonasService.prototype.setZona = function (nurevaZona) {
        return this.http
            .post(this.url, JSON.stringify(nurevaZona), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    ZonasService.prototype.update = function (zona) {
        var url = this.url + "/" + zona.Latitude;
        return this.http
            .put(url, JSON.stringify(zona), { headers: this.headers })
            .toPromise()
            .then(function () { return zona; })
            .catch(this.handleError);
    };
    ZonasService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ZonasService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ZonasService);
    return ZonasService;
}());
exports.ZonasService = ZonasService;
//# sourceMappingURL=zonas.service.js.map