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
var ciudades_service_1 = require('../ciudades/ciudades.service');
var sensores_service_1 = require('../sensores/sensores.service');
var zonas_service_1 = require('../zonas/zonas.service');
var MapsComponent = (function () {
    function MapsComponent(ciudadesService, SensoresService, ZonasService) {
        this.ciudadesService = ciudadesService;
        this.SensoresService = SensoresService;
        this.ZonasService = ZonasService;
        this.lat = -34.9114282;
        this.lon = -56.1725558;
        this.nombreCampoCiudad = 'Mis ciudades';
        this.CampoCiudad = '';
        this.ciudades = [];
        this.sensores = [];
        this.zonas = [];
    }
    ;
    MapsComponent.prototype.ngOnInit = function () {
        this.inicializo();
        var myLatlng = new google.maps.LatLng(this.lat, this.lon);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    };
    //---> Funciones internas <---
    MapsComponent.prototype.inicializo = function () {
        this.CampoCiudad = this.nombreCampoCiudad;
        this.getCiudades();
    };
    MapsComponent.prototype.cargoCiudad = function (ciudad) {
        this.getSensores(ciudad);
        this.getZonas(ciudad);
    };
    //---> Funciones de eventos <---
    MapsComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.ciudadActual = ciudad;
        this.cargoCiudad(ciudad);
        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
    };
    //---> Funciones de servicios <---
    MapsComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService.getCiudades().then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    MapsComponent.prototype.getSensores = function (ciudad) {
        var _this = this;
        this.SensoresService.getSensores(ciudad.Latitud, ciudad.Longitud).subscribe(function (sensores) {
            _this.sensores = sensores;
            for (var i = 0; i < _this.sensores.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(_this.sensores[i].Latitude, _this.sensores[i].Longitude),
                    title: _this.sensores[i].Tipo,
                    map: _this.map
                });
            }
        });
    };
    MapsComponent.prototype.getZonas = function (ciudad) {
        //this.ZonasService.getZonas(ciudad.Latitud, ciudad.Longitud).then(zonas => {
        //    if (zonas) {
        //        this.zonas = zonas;
        //        for (var z = 0; z < zonas.length; z++) {
        //            new google.maps.Circle({
        //                radius: zonas[z].Radio,
        //                center: new google.maps.LatLng(zonas[z].Latitude, zonas[z].Longitude),
        //                strokeColor: '#FF0000',
        //                strokeOpacity: 0.8,
        //                strokeWeight: 2,
        //                fillColor: '#FF0000',
        //                fillOpacity: 0.35,
        //                map: this.map,
        //                clickable: true,
        //                editable: false,
        //            });
        //        }
        //    }
        //});
    };
    MapsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'maps-cmp',
            templateUrl: 'maps.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService, sensores_service_1.SensoresService, zonas_service_1.ZonasService])
    ], MapsComponent);
    return MapsComponent;
}());
exports.MapsComponent = MapsComponent;
//# sourceMappingURL=maps.component.js.map