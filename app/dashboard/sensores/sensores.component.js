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
var ciudades_service_1 = require('../ciudades/ciudades.service');
var tipo_sensor_service_1 = require('../tipo-sensores/tipo-sensor.service');
var sensor_1 = require('./sensor');
var sensores_service_1 = require('./sensores.service');
var SensoresComponent = (function () {
    function SensoresComponent(ciudadesService, tipoSensoresService, SensoresService) {
        this.ciudadesService = ciudadesService;
        this.tipoSensoresService = tipoSensoresService;
        this.SensoresService = SensoresService;
        this.nombreCampoTS = 'Tipo sensor';
        this.nombreCampoCiudad = 'Ciudad del sensor';
        this.CampoTS = '';
        this.CampoCiudad = '';
    }
    ;
    SensoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inicializo();
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Cargo unico marcador
        this.marker = new google.maps.Marker({
            map: this.map
        });
        //Agregar evento al mapa
        this.map.addListener('click', function (e) {
            _this.nuevoSensor.Latitude = e.latLng.lat();
            _this.nuevoSensor.Longitude = e.latLng.lng();
            _this.marker.setPosition(e.latLng);
        });
    };
    //---> Funciones internas <---
    SensoresComponent.prototype.inicializo = function () {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;
        this.nuevoSensor = new sensor_1.Sensor();
        this.sensores = [];
        this.getCiudades();
        this.getTipoSensores();
    };
    //---> Funciones de eventos <---
    SensoresComponent.prototype.changeTipoSensor = function (tipoSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.nuevoSensor.Tipo = tipoSensor.nombre;
    };
    SensoresComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.nuevoSensor.ciudad = ciudad.Nombre;
        this.nuevoSensor.cLatitude = ciudad.Latitud;
        this.nuevoSensor.cLongitude = ciudad.Longitud;
        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
    };
    SensoresComponent.prototype.editarSensor = function (sensor) {
        alert("editando");
    };
    SensoresComponent.prototype.eliminarSensor = function (sensor) {
        alert("eliminando");
    };
    SensoresComponent.prototype.agregarSensor = function () {
        var ciudad = this.nuevoSensor.ciudad;
        var tipo = this.nuevoSensor.Tipo;
        var lat = this.nuevoSensor.Latitude;
        var lon = this.nuevoSensor.Longitude;
        if (ciudad != '' && tipo != '' && lat != 0 && lon != 0) {
            this.setSensor(this.nuevoSensor);
        }
    };
    //---> Funciones de servicios <---
    SensoresComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService.getCiudades().then(function (ciudades) {
            _this.ciudades = ciudades;
            _this.getSensores();
        });
    };
    SensoresComponent.prototype.getTipoSensores = function () {
        var _this = this;
        //this.tipoSensoresService.getTipoSensores().then(tipoSensores => this.tipoSensores = tipoSensores);
        this.tipoSensoresService.getTipoBaseSensor().then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    SensoresComponent.prototype.getSensores = function () {
        var _this = this;
        var _loop_1 = function() {
            var nombre = this_1.ciudades[i].Nombre;
            this_1.SensoresService.getSensores(this_1.ciudades[i].Latitud, this_1.ciudades[i].Longitud).subscribe(function (sensores) {
                for (var s = 0; s < sensores.length; s++) {
                    sensores[s].ciudad = nombre;
                    _this.sensores.push(sensores[s]);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.ciudades.length; i++) {
            _loop_1();
        }
    };
    SensoresComponent.prototype.setSensor = function (nuevo) {
        var _this = this;
        this.SensoresService.setSensor(nuevo).then(function () {
            _this.inicializo();
        });
    };
    SensoresComponent = __decorate([
        core_1.Component({
            selector: 'sensores-cmp',
            moduleId: module.id,
            templateUrl: 'sensores.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService, tipo_sensor_service_1.TipoSensoresService, sensores_service_1.SensoresService])
    ], SensoresComponent);
    return SensoresComponent;
}());
exports.SensoresComponent = SensoresComponent;
//# sourceMappingURL=sensores.component.js.map