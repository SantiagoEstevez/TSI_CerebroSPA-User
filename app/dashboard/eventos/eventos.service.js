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
var EventosService = (function () {
    function EventosService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = 'api/evento'; // URL to web api
        //private url = 'http://localhost:6346/api/Evento/Global/';
        this.urlZona = 'http://localhost:6346/api/Evento/Zone/';
    }
    EventosService.prototype.getEventos = function () {
        //const url = `${this.url}cityLat/${lat}/cityLon/${lon}/`;
        return this.http.get(this.url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventosService.prototype.getEventosZona = function (idZona) {
        var url = this.urlZona + "cityLat/" + idZona + "/";
        return this.http.get(this.url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    //getEvento(id: number): Promise<Evento> {
    //    const url = `${this.url}/${id}`;
    //    return this.http.get(url)
    //        .toPromise()
    //        .then(response => response.json().data as Evento)
    //        .catch(this.handleError);
    //}
    //delete(id: number): Promise<void> {
    //    const url = `${this.url}/${id}`;
    //    return this.http.delete(url, { headers: this.headers })
    //        .toPromise()
    //        .then(() => null)
    //        .catch(this.handleError);
    //}
    EventosService.prototype.setEvento = function (nurevoEvento) {
        return this.http
            .post(this.url, JSON.stringify(nurevoEvento), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventosService.prototype.setEventoZona = function (nurevoEvento) {
        return this.http
            .post(this.urlZona, JSON.stringify(nurevoEvento), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //update(evento: Evento): Promise<Evento> {
    //    const url = `${this.url}/${evento.Name}`;
    //    return this.http
    //        .put(url, JSON.stringify(evento), { headers: this.headers })
    //        .toPromise()
    //        .then(() => evento)
    //        .catch(this.handleError);
    //}
    EventosService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    EventosService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EventosService);
    return EventosService;
}());
exports.EventosService = EventosService;
//# sourceMappingURL=eventos.service.js.map