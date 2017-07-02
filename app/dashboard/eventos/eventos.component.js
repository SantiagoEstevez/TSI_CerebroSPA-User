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
var core_1 = require('@angular/core');
//Servicios.
var eventos_service_1 = require('./eventos.service');
var EventosComponent = (function () {
    function EventosComponent(eventosService) {
        this.eventosService = eventosService;
    }
    ;
    EventosComponent.prototype.ngOnInit = function () {
        this.inicializo();
        alert(localStorage.getItem('ciudad'));
    };
    //---> Funciones internas <---
    EventosComponent.prototype.inicializo = function () {
        this.eventos = [];
        this.getEventos();
    };
    //---> Funciones de eventos <---
    EventosComponent.prototype.suscribirseEvento = function (evento) {
        this.setSuscripcionEvento(evento);
    };
    //---> Funciones de servicios <---
    EventosComponent.prototype.getEventos = function () {
        var _this = this;
        this.eventosService.getEventos().then(function (eventos) {
            if (eventos) {
                for (var e = 0; e < eventos.length; e++) {
                    if (!eventos[e].SendoresAsociados) {
                        eventos[e].SendoresAsociados = [];
                    }
                    _this.eventos.push(eventos[e]);
                }
                console.log(_this.eventos);
            }
        });
    };
    EventosComponent.prototype.setSuscripcionEvento = function (nuevo) {
        alert("suscribiendo a evento");
        //this.eventosService.setEventoZona(nuevo).then(() => {
        //    this.inicializo();
        //});
    };
    EventosComponent = __decorate([
        core_1.Component({
            selector: 'eventos-cmp',
            moduleId: module.id,
            templateUrl: 'eventos.component.html'
        }), 
        __metadata('design:paramtypes', [eventos_service_1.EventosService])
    ], EventosComponent);
    return EventosComponent;
}());
exports.EventosComponent = EventosComponent;
//# sourceMappingURL=eventos.component.js.map