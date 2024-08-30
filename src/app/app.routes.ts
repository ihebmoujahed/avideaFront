import { Routes } from '@angular/router';
import { ContratComponent } from './contrat/contrat.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AddcontratComponent } from './contrat/addcontrat/addcontrat.component';
import { SinistreComponent } from './sinistre/sinistre.component';
import { AddsinistreComponent } from './sinistre/addsinistre/addsinistre.component';
import { UpdatecontratComponent } from './contrat/updatecontrat/updatecontrat.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UpdatesinistreComponent } from './sinistre/updatesinistre/updatesinistre.component';
import { DetailsinistreComponent } from './sinistre/detailsinistre/detailsinistre.component';
import { LoginComponent } from './Account/login/login.component';
import { AuthGuard } from './auth.guard'; // Make sure the path is correct
import { TotalSinistreComponent } from './sinistre/total-sinistre/total-sinistre.component';

export const routes: Routes = [
    {
        path: 'contrat',
        component: ContratComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'AddContrat',
        component: AddcontratComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'Dashboard',
        component: DashbordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sinistre/AddSinister/:id',
        component: AddsinistreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'AddSinister',
        component: AddsinistreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Contrat/updatecontrat/:id',
        component: UpdatecontratComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Sinistre/updatesinistre/:id',
        component: UpdatesinistreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Sinistre/detailsinistre/:id',
        component: DetailsinistreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'totalSinister',
        component: TotalSinistreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sinistre/:id/:numero_contrat',
        component: SinistreComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'addSinistre', component: AddsinistreComponent }
        ]
    },
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    {
        path: '**', component: PagenotfoundComponent, canActivate: [AuthGuard],
    }
];
