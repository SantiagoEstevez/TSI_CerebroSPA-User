import { Component, OnInit, NgZone } from '@angular/core';
import { CiudadesService } from '../ciudades/ciudades.service';
import { TipoSensoresService } from '../tipo-sensores/tipo-sensor.service';
import { TipoSensor } from '../tipo-sensores/tipo-sensor';
import { Ciudad } from '../ciudades/ciudad';
import { Sensor } from './sensor';
import { TipoBaseSensor } from '../tipo-sensores/tipo-base-sensor';
import { SensoresService } from './sensores.service';

declare var google: any;

@Component({
    selector: 'sensores-cmp',
    moduleId: module.id,
    templateUrl: 'sensores.component.html'
})

export class SensoresComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private tipoSensoresService: TipoSensoresService,
        private SensoresService: SensoresService
    ) { };

    nombreCampoTS: string = 'Tipo sensor';
    nombreCampoCiudad: string = 'Ciudad del sensor';

    CampoTS: string = '';
    CampoCiudad: string = '';
    map: any;
    marker: any;
    nuevoSensor: Sensor;

    ciudades: Ciudad[];
    //tipoSensores: TipoSensor[];
    tipoSensores: TipoBaseSensor[];
    sensores: Sensor[];

    ngOnInit() {
        this.inicializo();

        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Cargo unico marcador
        this.marker = new google.maps.Marker({
            map: this.map
        });

        //Agregar evento al mapa
        this.map.addListener('click', (e) => {
            this.nuevoSensor.Latitude = e.latLng.lat();
            this.nuevoSensor.Longitude = e.latLng.lng();
            this.marker.setPosition(e.latLng);
        });
    }


    //---> Funciones internas <---
    inicializo() {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;
        this.nuevoSensor = new Sensor();
        this.sensores = [];

        this.getCiudades();
        this.getTipoSensores();
    }


    //---> Funciones de eventos <---
    changeTipoSensor(tipoSensor: TipoBaseSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.nuevoSensor.Tipo = tipoSensor.nombre;
    }

    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.nuevoSensor.ciudad = ciudad.Nombre;
        this.nuevoSensor.cLatitude = ciudad.Latitud;
        this.nuevoSensor.cLongitude = ciudad.Longitud;

        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
    }

    editarSensor(sensor: Sensor) {
        alert("editando");
    }

    eliminarSensor(sensor: Sensor) {
        alert("eliminando");
    }

    agregarSensor() {
        var ciudad = this.nuevoSensor.ciudad;
        var tipo = this.nuevoSensor.Tipo;
        var lat = this.nuevoSensor.Latitude;
        var lon = this.nuevoSensor.Longitude;

        if (ciudad != '' && tipo != '' && lat != 0 && lon != 0) {
            this.setSensor(this.nuevoSensor);
        }
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
            this.getSensores();
        });
    }

    getTipoSensores(): void {
        //this.tipoSensoresService.getTipoSensores().then(tipoSensores => this.tipoSensores = tipoSensores);
        this.tipoSensoresService.getTipoBaseSensor().then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    getSensores(): void {
        for (var i = 0; i < this.ciudades.length; i++) {
            let nombre = this.ciudades[i].Nombre;

            this.SensoresService.getSensores(this.ciudades[i].Latitud, this.ciudades[i].Longitud).subscribe(sensores => {
                for (var s = 0; s < sensores.length; s++) {
                    sensores[s].ciudad = nombre;
                    this.sensores.push(sensores[s]);
                }
            });            
        }
    }

    setSensor(nuevo: Sensor): void {
        this.SensoresService.setSensor(nuevo).then(() => {
            this.inicializo();
        });
    }
}
