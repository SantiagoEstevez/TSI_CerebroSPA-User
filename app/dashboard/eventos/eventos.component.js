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
//Clases
var evento_1 = require('./evento');
var dispositivo_1 = require('./dispositivo');
//Servicios.
var eventos_service_1 = require('./eventos.service');
var tipo_sensor_service_1 = require('../tipo-sensores/tipo-sensor.service');
var ciudades_service_1 = require('../ciudades/ciudades.service');
var EventosComponent = (function () {
    function EventosComponent(eventosService, tipoSensoresService, CiudadesService) {
        this.eventosService = eventosService;
        this.tipoSensoresService = tipoSensoresService;
        this.CiudadesService = CiudadesService;
        //Nombres
        this.nombreCampoCiudad = 'Ciudad del evento';
        this.nombreCampoTS = 'Tipo sensor';
        this.nombreCampoRegla = "Regla";
        this.CampoCiudad = this.nombreCampoCiudad;
        this.CampoTS = '';
        this.CampoRegla = '';
        this.reglas = [">=", "<="];
    }
    ;
    EventosComponent.prototype.ngOnInit = function () {
        this.inicializo();
    };
    //---> Funciones internas <---
    EventosComponent.prototype.inicializo = function () {
        this.CampoCiudad = this.nombreCampoCiudad;
        this.oEvento = new evento_1.Evento();
        this.eventos = [];
        this.dispositivos = [];
        this.inicializoDispositivo();
        this.getCiudades();
        this.getTipoSensores();
    };
    EventosComponent.prototype.inicializoDispositivo = function () {
        this.CampoTS = this.nombreCampoTS;
        this.CampoRegla = this.nombreCampoRegla;
        this.oDispositivo = new dispositivo_1.Dispositivo();
    };
    //---> Funciones de eventos <---
    EventosComponent.prototype.agregarEvento = function () {
        if (this.oEvento.ciudad != undefined) {
            if (this.dispositivos.length > 0) {
                if (this.oEvento.Nombre != "") {
                    //this.oEvento.SendoresAsociados = this.dispositivos;
                    this.oEvento.SendoresAsociados.push({ ID: 1, Tipo: "Agua", Latitude: 1, Longitude: 1, Umbral: "> 900" });
                    this.setEvento(this.oEvento);
                }
                else {
                    alert("Debe asignarle un nombre al evento.");
                }
            }
            else {
                alert("El evento debe tener por lo menos un tipo de sensor asociado.");
            }
        }
        else {
            alert("Debe seleccionar la ciudad del evento.");
        }
    };
    EventosComponent.prototype.editarEvento = function () {
        alert("editando evento");
    };
    EventosComponent.prototype.eliminarEvento = function () {
        alert("eliminando evento");
    };
    EventosComponent.prototype.agregarDispositivo = function () {
        if (this.oDispositivo.Regla == ">=" || this.oDispositivo.Regla == "<=") {
            if (!isNaN(this.oDispositivo.Medida)) {
                if (this.oDispositivo.Tipo != undefined && this.oDispositivo.Tipo != this.nombreCampoTS) {
                    this.oDispositivo.Umbral = this.oDispositivo.Regla + " " + this.oDispositivo.Medida;
                    this.dispositivos.push(this.oDispositivo);
                    this.inicializoDispositivo();
                }
                else {
                    alert("Debe seleccionar un tipo de sensor.");
                }
            }
            else {
                alert("La medida debe ser numerica.");
            }
        }
        else {
            alert("La regla debe ser >= o <=");
        }
    };
    EventosComponent.prototype.eliminarDispositivo = function (dispositivo) {
        var index = this.dispositivos.indexOf(dispositivo);
        if (index !== -1) {
            this.dispositivos.splice(index, 1);
        }
    };
    EventosComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.oEvento.ciudad = ciudad.Nombre;
        this.oEvento.cLatitude = ciudad.Latitud;
        this.oEvento.cLongitude = ciudad.Longitud;
    };
    EventosComponent.prototype.changeTipoSensor = function (tipoSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.Tipo = tipoSensor.nombre;
    };
    EventosComponent.prototype.changeRegla = function (regla) {
        this.CampoRegla = regla;
        this.oDispositivo.Regla = regla;
    };
    //---> Funciones de servicios <---
    EventosComponent.prototype.getCiudades = function () {
        var _this = this;
        this.CiudadesService.getCiudades().then(function (ciudades) {
            _this.ciudades = ciudades;
            _this.getEventos();
        });
    };
    EventosComponent.prototype.getEventos = function () {
        var _this = this;
        for (var i = 0; i < this.ciudades.length; i++) {
            var nombre = this.ciudades[i].Nombre;
            this.eventosService.getEventos(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(function (eventos) {
                if (eventos) {
                    for (var e = 0; e < eventos.length; e++) {
                        if (!eventos[e].SendoresAsociados) {
                            eventos[e].SendoresAsociados = [];
                        }
                        _this.eventos.push(eventos[e]);
                    }
                }
            });
        }
    };
    EventosComponent.prototype.getTipoSensores = function () {
        var _this = this;
        this.tipoSensoresService.getTipoBaseSensor().then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    EventosComponent.prototype.setEvento = function (nuevo) {
        var _this = this;
        var latitudgenerada = Math.floor((Math.random() * 10) + 1);
        nuevo.Longitude = latitudgenerada;
        console.log(latitudgenerada);
        this.eventosService.setEvento(nuevo).then(function () {
            _this.inicializo();
        });
    };
    EventosComponent = __decorate([
        core_1.Component({
            selector: 'eventos-cmp',
            moduleId: module.id,
            templateUrl: 'eventos.component.html'
        }), 
        __metadata('design:paramtypes', [eventos_service_1.EventosService, tipo_sensor_service_1.TipoSensoresService, ciudades_service_1.CiudadesService])
    ], EventosComponent);
    return EventosComponent;
}());
exports.EventosComponent = EventosComponent;
//# sourceMappingURL=eventos.component.js.map