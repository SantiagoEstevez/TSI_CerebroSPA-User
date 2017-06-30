import { Component, OnInit } from '@angular/core';

//Clases.
import { Ciudad } from '../ciudades/ciudad';
import { Sensor } from '../sensores/sensor';
import { Zona } from '../zonas/zona';

//Servicios.
import { CiudadesService } from '../ciudades/ciudades.service';
import { SensoresService } from '../sensores/sensores.service';
import { ZonasService } from '../zonas/zonas.service';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {
    constructor(
        private ciudadesService: CiudadesService,
        private SensoresService: SensoresService,
        private ZonasService: ZonasService
    ) { };

    public lat: number = -34.9114282;
    public lon: number = -56.1725558;
    public map: any;

    nombreCampoCiudad: string = 'Mis ciudades';

    CampoCiudad: string = '';
    ciudades: Ciudad[] = [];
    sensores: Sensor[] = [];
    zonas: Zona[] = [];
    ciudadActual: Ciudad;

    ngOnInit() {
        this.inicializo();

        var myLatlng = new google.maps.LatLng(this.lat, this.lon);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [
              //{
              //    "featureType": "water", "stylers":
              //        [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }]
              //},
              //{
              //    "featureType": "road", "elementType": "geometry.fill", "stylers":
              //    [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }]
              //},
              //{
              //    "featureType": "road", "elementType": "geometry.stroke", "stylers":
              //    [{ "color": "#808080" }, { "lightness": 54 }]
              //},
              //{
              //    "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }]
              //},
              //{
              //    "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }]
              //},
              //{
              //    "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }]
              //},
              //{
              //    "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }]
              //},
              //{
              //    "featureType": "poi", "stylers": [{ "visibility": "off" }]
              //},
              //{
              //    "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }]
              //},
              //{
              //    "featureType": "poi.park", "stylers": [{ "visibility": "on" }]
              //},
              //{
              //    "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }]
              //},
              //{
              //    "featureType": "poi.medical", "stylers": [{ "visibility": "on" }]
              //},
              //{
              //    "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }]
              //}
          ]
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    //---> Funciones internas <---
    inicializo() {
        this.CampoCiudad = this.nombreCampoCiudad;

        this.getCiudades();
    }

    cargoCiudad(ciudad: Ciudad) {
        this.getSensores(ciudad);
        this.getZonas(ciudad);
    }


    //---> Funciones de eventos <---
    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.ciudadActual = ciudad;
        this.cargoCiudad(ciudad);

        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => this.ciudades = ciudades);
    }

    getSensores(ciudad: Ciudad): void {
        this.SensoresService.getSensores(ciudad.Latitud, ciudad.Longitud).subscribe(sensores => {
            this.sensores = sensores

            for (var i = 0; i < this.sensores.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.sensores[i].Latitude, this.sensores[i].Longitude),
                    title: this.sensores[i].Tipo,
                    map: this.map
                });
            }
        });
    }

    getZonas(ciudad: Ciudad): void {
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
    }
}
