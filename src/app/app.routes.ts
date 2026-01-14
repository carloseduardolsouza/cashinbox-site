import { Routes } from '@angular/router';
import { Home } from './screens/home/home';
import { Login } from './screens/login/login';
import { Cadastro } from './screens/cadastro/cadastro';
import { Plataforma } from './screens/plataforma/plataforma';
import { Download } from './screens/download/download';
import { Precos } from './screens/precos/precos';
import { Contato } from './screens/contato/contato';
import { Modulos } from './screens/modulos/modulos';
import { Dashboard } from './screens/dashboard/dashboard';
import { DashboardAdmin } from './screens/dashboard-admin/dashboard-admin';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Cash in Box - Gestão Financeira Empresarial + CRM Inteligente',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login - Cash in Box',
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Cadastro - Cash in Box',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Meu Painel - Cash in Box',
  },
  {
    path: 'admin-dashboard',
    component: DashboardAdmin,
    title: 'Meu Painel - Cash in Box',
  },
  {
    path: 'plataforma',
    component: Plataforma,
    title: 'Plataforma - Cash in Box',
  },
  {
    path: 'download',
    component: Download,
    title: 'Download - Cash in Box',
  },
  {
    path: 'precos',
    component: Precos,
    title: 'Preços - Cash in Box',
  },
  {
    path: 'contato',
    component: Contato,
    title: 'Contato - Cash in Box',
  },
  {
    path: 'modulos',
    component: Modulos,
    title: 'Módulos - Cash in Box',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
