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
var Ciudad_1 = require('./Ciudad');
var ciudades_service_1 = require('./ciudades.service');
var sensores_service_1 = require('../sensores/sensores.service');
var zonas_service_1 = require('../zonas/zonas.service');
var CiudadesComponent = (function () {
    function CiudadesComponent(ciudadesService, sensoresService, zonasService) {
        this.ciudadesService = ciudadesService;
        this.sensoresService = sensoresService;
        this.zonasService = zonasService;
        this.ciudades = [];
        this.nuevaCiudad = new Ciudad_1.Ciudad();
    }
    ;
    CiudadesComponent.prototype.ngOnInit = function () {
        //this.getUsuarios();
        var _this = this;
        //Cargo autocompletar del search
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: 'uy' }
        };
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById("mapsearch"), options);
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Agrega evento - posicionamiento mapa
        this.autocomplete.addListener('place_changed', function (e) {
            var place = _this.autocomplete.getPlace();
            if (place.name != '') {
                var lat = place.geometry.location.lat();
                var lon = place.geometry.location.lng();
                var latlng = new google.maps.LatLng(lat, lon);
                _this.map.setCenter(latlng);
            }
        });
        this.inicializar();
    };
    //---> Funciones de uso interno <---
    CiudadesComponent.prototype.inicializar = function () {
        this.nuevaCiudad.Latitud = 0;
        this.nuevaCiudad.Longitud = 0;
        this.nuevaCiudad.Nombre = '';
        this.map.setCenter(new google.maps.LatLng(-34.9114282, -56.1725558));
        this.getCiudades();
        this.getUsuarios();
    };
    //---> Funciones de eventos <---
    CiudadesComponent.prototype.agregarCiudad = function () {
        var place = this.autocomplete.getPlace();
        if (place.name != '') {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();
            if (!this.ciudades.find(function (item) { return item.Latitud == lat && item.Longitud == lon; })) {
                this.nuevaCiudad.Nombre = place.name;
                this.nuevaCiudad.Longitud = lon;
                this.nuevaCiudad.Latitud = lat;
                this.setCiudad(this.nuevaCiudad);
                this.inicializar();
            }
            else {
                alert("Esta ciudad ya esta en uso.");
            }
        }
    };
    CiudadesComponent.prototype.eliminarCiudad = function (ciudad) {
        var cantSensores = 0;
        var cantZonas = 0;
        this.sensoresService.getSensores(ciudad.Latitud, ciudad.Longitud).subscribe(function (s) { return cantSensores = s.length; });
        //this.zonasService.getZonas(ciudad.Latitud, ciudad.Longitud).then(z => cantZonas = z.length);
        if (cantSensores > 0 || cantZonas > 0) {
            alert("No se puede borrar la ciudad ya que hay zonas y/o sensores asociada a ella");
        }
        else {
            //this.ciudadesService.delete(ciudad.Latitud);
            this.inicializar();
        }
    };
    //---> Funciones de servicios <---
    CiudadesComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService.getCiudades().then(function (ciudades) {
            if (ciudades) {
                _this.ciudades = ciudades;
            }
        });
    };
    CiudadesComponent.prototype.getUsuarios = function () {
        //this.ciudadesService
        //    .getAll()
        //    .then(ciudades => this.ciudades = ciudades);
        //this.ciudadesService.getUsuarios().then(ciudades => this.ciudades = ciudades);
    };
    CiudadesComponent.prototype.setCiudad = function (nueva) {
        this.ciudadesService.setCiudad(nueva)
            .then(function (ciudad) {
            //this.ciudades.push(ciudad);
        });
    };
    CiudadesComponent = __decorate([
        core_1.Component({
            selector: 'ciudades-cmp',
            moduleId: module.id,
            templateUrl: 'ciudades.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService, sensores_service_1.SensoresService, zonas_service_1.ZonasService])
    ], CiudadesComponent);
    return CiudadesComponent;
}());
exports.CiudadesComponent = CiudadesComponent;
//# sourceMappingURL=ciudades.component.js.map