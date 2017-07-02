import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventosZonasComponent } from './eventos/eventosZonas.component';
import { TipoSensoresComponent } from './tipo-sensores/tipo-sensores.component';
import { SensoresComponent } from './sensores/sensores.component';
import { ZonasComponent } from './zonas/zonas.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './login/registro.component';
import { AuthGuard } from './auth.guard';
import { ChatComponent }   from './chat/chat.component';

export const MODULE_ROUTES: Route[] = [
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    //{ path: 'maps', component: MapsComponent },
    //{ path: 'Ciudades', component: CiudadesComponent },
    //{ path: 'TipoSensores', component: TipoSensoresComponent },
    //{ path: 'Sensores', component: SensoresComponent },
    //{ path: 'Zonas', component: ZonasComponent },
    { path: 'Eventos', component: EventosComponent, canActivate: [AuthGuard] },
    { path: 'EventosZonas', component: EventosZonasComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    //{ path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: 'icons', component: IconsComponent },
    //{ path: 'typography', component: TypographyComponent },
    //{ path: 'upgrade', component: UpgradeComponent },
    { path: '', redirectTo: 'notifications', pathMatch: 'full' }
    //{ path: '', redirectTo: 'login', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    ChatComponent, 
    LoginComponent,
    HomeComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    MapsComponent,
    UpgradeComponent,
    CiudadesComponent,
    EventosComponent,
    EventosZonasComponent,
    TipoSensoresComponent,
    SensoresComponent,
    ZonasComponent,
    RegistroComponent
]
