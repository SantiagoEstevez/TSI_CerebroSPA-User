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
var tipo_sensor_service_1 = require('../tipo-sensores/tipo-sensor.service');
var ciudades_service_1 = require('../ciudades/ciudades.service');
var zonas_service_1 = require('../zonas/zonas.service');
var EventosZonasComponent = (function () {
    function EventosZonasComponent(eventosService, tipoSensoresService, CiudadesService, ZonasService) {
        this.eventosService = eventosService;
        this.tipoSensoresService = tipoSensoresService;
        this.CiudadesService = CiudadesService;
        this.ZonasService = ZonasService;
    }
    ;
    EventosZonasComponent.prototype.ngOnInit = function () {
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        this.inicializo();
    };
    //---> Funciones internas <---
    EventosZonasComponent.prototype.inicializo = function () {
        this.eventos = [];
        this.zonas = [];
        this.zonasMapa = [];
        this.getZonas();
    };
    //---> Funciones de eventos <---
    EventosZonasComponent.prototype.suscribirseEvento = function (evento) {
        alert("suscribiendo a evento");
    };
    //---> Funciones de servicios <---
    EventosZonasComponent.prototype.getEventos = function (lat, lon) {
        var _this = this;
        this.eventos = [];
        var zona = this.zonas.find(function (z) { return z.Latitude == lat && z.Longitude == lon; });
        if (zona) {
            this.eventosService.getEventosZona(zona.ID).then(function (eventos) {
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
        }
    };
    EventosZonasComponent.prototype.setSuscripcionEvento = function (nuevo) {
        //this.eventosService.setEventoZona(nuevo).then(() => {
        //    this.inicializo();
        //});
    };
    EventosZonasComponent.prototype.getZonas = function () {
        var _this = this;
        this.ZonasService.getZonas().then(function (zonas) {
            if (zonas) {
                _this.zonas = zonas;
                var _loop_1 = function(z) {
                    var zona = new google.maps.Circle({
                        radius: zonas[z].Radio,
                        center: new google.maps.LatLng(zonas[z].Latitude, zonas[z].Longitude),
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        clickable: true,
                        editable: false,
                        map: _this.map
                    });
                    //Eventos seleccion de la zona mapa.
                    zona.addListener('click', function (e) {
                        for (var c = 0; c < _this.zonasMapa.length; c++) {
                            _this.zonasMapa[c].setOptions({ fillColor: '#FF0000', strokeColor: '#FF0000' });
                        }
                        zona.setOptions({ fillColor: '#013ADF', strokeColor: '#08088A' });
                        _this.getEventos(zona.getCenter().lat(), zona.getCenter().lng());
                    });
                    _this.zonasMapa.push(zona);
                };
                for (var z = 0; z < zonas.length; z++) {
                    _loop_1(z);
                }
            }
        });
    };
    EventosZonasComponent = __decorate([
        core_1.Component({
            selector: 'eventosZonas-cmp',
            moduleId: module.id,
            templateUrl: 'eventosZonas.component.html'
        }), 
        __metadata('design:paramtypes', [eventos_service_1.EventosService, tipo_sensor_service_1.TipoSensoresService, ciudades_service_1.CiudadesService, zonas_service_1.ZonasService])
    ], EventosZonasComponent);
    return EventosZonasComponent;
}());
exports.EventosZonasComponent = EventosZonasComponent;
//# sourceMappingURL=eventosZonas.component.js.map