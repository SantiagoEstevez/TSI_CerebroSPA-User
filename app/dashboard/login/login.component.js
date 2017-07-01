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
var router_1 = require('@angular/router');
var authentication_service_1 = require('../authentication.service');
var usuario_1 = require('../../usuarios/usuario');
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.error = '';
        FB.init({
            appId: '1465232330164930',
            cookie: false,
            // the session
            xfbml: true,
            version: 'v2.8' // use graph api version 2.5
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // reset login status
        this.authenticationService.logout();
        FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response);
        });
    };
    //---> Funciones internas <---
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        console.log(resp);
        if (resp.status === 'connected') {
        }
        else if (resp.status === 'not_authorized') {
        }
        else {
        }
    };
    ;
    //---> Funciones de eventos <---
    LoginComponent.prototype.login = function () {
        var _this = this;
        var usuario = new usuario_1.Usuario();
        usuario.CI = "477";
        usuario.Name = "santiago";
        usuario.Lastname = "estevez";
        usuario.Username = this.user;
        usuario.Password = this.password;
        this.loading = true;
        this.authenticationService.login(usuario).subscribe(function (result) {
            if (result == true) {
                // login successful
                _this.router.navigate(['/']);
            }
            else {
                // login failed
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.onFacebookLoginClick = function () {
        FB.login();
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map