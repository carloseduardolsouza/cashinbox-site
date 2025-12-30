import { Routes } from '@angular/router';
import { Home } from './screens/home/home';
import { Login } from './screens/login/login';
import { Cadastro } from './screens/cadastro/cadastro';
import { Plataforma } from './screens/plataforma/plataforma';
import { Download } from './screens/download/download';
import { Precos } from './screens/precos/precos';
import { Contato } from './screens/contato/contato';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastro,
  },
  {
    path: 'plataforma',
    component: Plataforma,
  },
  {
    path: 'download',
    component: Download,
  },
  {
    path: 'precos',
    component: Precos,
  },
  {
    path: 'contato',
    component: Contato,
  },
];