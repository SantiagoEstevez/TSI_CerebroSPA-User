"use strict";
var zona_1 = require('../zonas/zona');
var MemoriaService = (function () {
    function MemoriaService() {
    }
    MemoriaService.prototype.createDb = function () {
        var ciudad = [{ Nombre: "Monte", Latitud: 1, Longitud: 1 }];
        var tiposensores = [];
        var tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        var sensores = [];
        var zonas = [
            {
                ID: 1,
                Nombre: zona_1.Zona,
                Latitude: -34.908739401299641,
                Longitude: -56.1785888671875,
                Radio: 1000,
                ciudad: 'x',
                cLatitude: 1,
                cLongitude: 1
            },
            {
                ID: 2,
                Nombre: zona_1.Zona,
                Latitude: -34.877059273606314,
                Longitude: -56.286048889160156,
                Radio: 2505.0172620698436,
                ciudad: 'x',
                cLatitude: 1,
                cLongitude: 1
            }
        ];
        var evento = [
            {
                ID: 1,
                Nombre: "Evento chingon"
            },
            {
                ID: 2,
                Nombre: "Evento fuego"
            }
        ];
        return { ciudad: ciudad, tiposensores: tiposensores, tiposbaseensores: tiposbaseensores, sensores: sensores, zonas: zonas, evento: evento };
    };
    return MemoriaService;
}());
exports.MemoriaService = MemoriaService;
//# sourceMappingURL=memoria.service.js.map