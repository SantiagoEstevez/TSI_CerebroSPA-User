import { Component, OnInit, NgZone } from '@angular/core';
import { Ciudad } from './Ciudad';
import { CiudadesService } from './ciudades.service';
import { SensoresService } from '../sensores/sensores.service';
import { ZonasService } from '../zonas/zonas.service';

declare var google: any;

@Component({
    selector: 'ciudades-cmp',
    moduleId: module.id,
    templateUrl: 'ciudades.component.html'
})

export class CiudadesComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private sensoresService: SensoresService,
        private zonasService: ZonasService
        //private nuevaCiudad: Ciudad
    ) { };

    autocomplete: any;
    map: any;
    ciudades: Ciudad[] = [];
    usuarios: any[];
    nuevaCiudad = new Ciudad();

    ngOnInit() {
        //this.getUsuarios();

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
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Agrega evento - posicionamiento mapa
        this.autocomplete.addListener('place_changed', (e) => {
            var place = this.autocomplete.getPlace();

            if (place.name != '') {
                var lat = place.geometry.location.lat();
                var lon = place.geometry.location.lng();

                var latlng = new google.maps.LatLng(lat, lon);
                this.map.setCenter(latlng);
            }
        });

        this.inicializar();
    }


    //---> Funciones de uso interno <---
    inicializar() {
        this.nuevaCiudad.Latitud = 0;
        this.nuevaCiudad.Longitud = 0;
        this.nuevaCiudad.Nombre = '';

        this.map.setCenter(new google.maps.LatLng(-34.9114282, -56.1725558));
        this.getCiudades();
        this.getUsuarios();
    }


    //---> Funciones de eventos <---
    agregarCiudad() {
        var place = this.autocomplete.getPlace();   

        if (place.name != '') {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();

            if (!this.ciudades.find(item => item.Latitud == lat && item.Longitud == lon)) {
                this.nuevaCiudad.Nombre = place.name;
                this.nuevaCiudad.Longitud = lon;
                this.nuevaCiudad.Latitud = lat;

                this.setCiudad(this.nuevaCiudad);
                this.inicializar();
            } else {
                alert("Esta ciudad ya esta en uso.");
            }
        }
    }    

    eliminarCiudad(ciudad: Ciudad) {
        var cantSensores: number = 0;
        var cantZonas: number = 0;

        this.sensoresService.getSensores(ciudad.Latitud, ciudad.Longitud).subscribe(s => cantSensores = s.length);
        this.zonasService.getZonas(ciudad.Latitud, ciudad.Longitud).then(z => cantZonas = z.length);

        if (cantSensores > 0 || cantZonas > 0) {
            alert("No se puede borrar la ciudad ya que hay zonas y/o sensores asociada a ella");
        } else {
            this.ciudadesService.delete(ciudad.Latitud);
            this.inicializar();
        }
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => {
            if (ciudades) {
                this.ciudades = ciudades
            }
        });
    }

    getUsuarios(): void {
        //this.ciudadesService
        //    .getAll()
        //    .then(ciudades => this.ciudades = ciudades);
        //this.ciudadesService.getUsuarios().then(ciudades => this.ciudades = ciudades);
    }

    setCiudad(nueva: Ciudad): void {
        this.ciudadesService.setCiudad(nueva)
            .then(ciudad => {
                //this.ciudades.push(ciudad);
            });
    }
}
