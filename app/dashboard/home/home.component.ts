import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import initDemo = require('../../../assets/js/charts.js');
import { SensoresService } from '../sensores/sensores.service';
import { LecturaSensor } from '../sensores/lecturasensor';

declare var $:any;

@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{

    lecturas: LecturaSensor[];
    
    constructor(
        private SensoresService: SensoresService
    ) { }

    ngOnInit(){
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        this.inicializo();
    }

    inicializo() {
        console.log(localStorage.getItem('ciudad'));
        this.SensoresService.getDatosSenores(localStorage.getItem('ciudad')).then(resp => {
            this.lecturas = resp;

            let ids: string[] = [];
            let valores: number[] = [];
            for (var i = 0; i < this.lecturas.length; i++) {
                ids.push(this.lecturas[i].Latitude.toString());
                valores.push(this.lecturas[i].dato);
            }

            initDemo(ids, valores);
        });
    }
}
