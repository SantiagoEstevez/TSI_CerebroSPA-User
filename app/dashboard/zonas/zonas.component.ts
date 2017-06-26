import { Component, OnInit, NgZone } from '@angular/core';
import { CiudadesService } from '../ciudades/ciudades.service';
import { Ciudad } from '../ciudades/ciudad';
import { Zona } from './zona';
import { ZonasService } from './zonas.service';

declare var google: any;

@Component({
    selector: 'zonas-cmp',
    moduleId: module.id,
    templateUrl: 'zonas.component.html'
})

export class ZonasComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private zonasService: ZonasService
    ) { };

    nombreCampoCiudad: string = 'Ciudad de la zona';

    CampoCiudad: string = '';
    map: any;
    capaZonas: any;
    circle: any;
    editar: boolean = false;

    ciudades: Ciudad[];
    zonas: Zona[];
    nuevaZona: Zona;

    ngOnInit() {

        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Cargo controlador de zonas.
        //this.capaZonas = new google.maps.drawing.DrawingManager({
        //    drawingMode: google.maps.drawing.OverlayType.CIRCLE,
        //    drawingControl: true,
        //    drawingControlOptions: {
        //        position: google.maps.ControlPosition.TOP_CENTER,
        //        drawingModes: ['circle']
        //        //drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        //    },
        //    circleOptions: {
        //        //fillColor: '#ffff00',
        //        //fillOpacity: 1,
        //        //strokeWeight: 5,
        //        clickable: true,
        //        editable: true,
        //        zIndex: 1
        //    }
        //});
        //this.capaZonas.setMap(this.map);

        //this.capaZonas.addListener('circlecomplete', (e) => {
        //    e.addListener('click', (r) => {
        //        alert("pos old" + e.getCenter().lat());
        //    });

        //    e.addListener('center_changed', (c) => {
        //        alert(e.getCenter().lat());
        //        var a = this.zonas.find(z => z.lat == e.getCenter().lat() && z.lon == e.getCenter().lng());
        //        console.log(a);
        //        //this.zonas.push(a);
        //    });
        //    this.nuevaZona.lat = e.getCenter().lat();
        //    this.nuevaZona.lon = e.getCenter().lng();
        //    this.nuevaZona.radio = e.getRadius();
        //    this.zonas.push(this.nuevaZona);
        //});

        //Cargo unico circulo.
        this.circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            radius: 1000,
            clickable: true,
            editable: true,
        });

        //Eventos del circulo
        //this.circle.addListener('center_changed', (c) => {
        //    this.nuevaZona.lat = this.circle.;
        //    //this.nuevaZona.lon = c.latLng.lng();
        //});

        //this.circle.addListener('radius_changed', (r) => {
        //    this.nuevaZona.radio = r.getRadius.lat();
        //});

        //Agregar evento click del mapa
        this.map.addListener('click', (e) => {
            this.circle.setCenter(e.latLng);
            //this.nuevaZona.Latitude = e.latLng.lat();
            //this.nuevaZona.Longitude = e.latLng.lng();
        });

        this.inicializo();
    }


    //---> Funciones internas <---
    inicializo() {
        this.CampoCiudad = this.nombreCampoCiudad;
        this.nuevaZona = new Zona();
        this.zonas = [];

        this.circle.setCenter(null);
        this.circle.setRadius(1000);
        this.editar = false;

        this.getCiudades();
    }


    //---> Funciones de eventos <---
    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.nuevaZona.ciudad = ciudad.Nombre;
        this.nuevaZona.cLatitude = ciudad.Latitud;
        this.nuevaZona.cLongitude = ciudad.Longitud;
        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
    }

    agregarZona() {
        this.nuevaZona.Latitude = this.circle.getCenter().lat();
        this.nuevaZona.Longitude = this.circle.getCenter().lng();
        this.nuevaZona.Radio = this.circle.getRadius();

        if (this.nuevaZona.ciudad != '' && this.nuevaZona.Latitude != 0 && this.nuevaZona.Longitude != 0) {
            if (this.editar) {
                this.updateZona(this.nuevaZona);
            } else {
                this.setZona(this.nuevaZona);
            }
        }
    }

    editarZona(zona: Zona) {
        alert("editar");
        //this.CampoCiudad = zona.ciudad;
        //this.circle.setCenter(new google.maps.LatLng(zona.Latitude, zona.Longitude));
        //this.circle.setRadius(zona.Radio);

        //this.nuevaZona.Latitude = zona.Latitude;
        //this.nuevaZona.Longitude = zona.Longitude;
        //this.nuevaZona.Radio = zona.Radio;

        //this.editar = true;
    }

    eliminarZona(zona) {
        alert("eliminar");
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
            this.getZonas();
        });
    }

    getZonas(): void {
        for (var i = 0; i < this.ciudades.length; i++) {
            let nombre = this.ciudades[i].Nombre;

            this.zonasService.getZonas(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(z => {
                for (var s = 0; s < z.length; s++) {
                    z[s].ciudad = nombre;
                    this.zonas.push(z[s]);
                }
            });
        }
    }

    setZona(nueva: Zona): void {
        nueva.Nombre = "Zona";
        this.zonasService.setZona(nueva).then(() => {
            this.inicializo();
        });
    }

    updateZona(zona: Zona): void {
        this.zonasService.update(zona).then(() => {
            this.inicializo();
        });
    }
}
