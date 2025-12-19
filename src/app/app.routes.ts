import { Routes } from '@angular/router';
import { Home } from './screens/home/home';
import { Cadastro } from './screens/cadastro/cadastro';
import { Login } from './screens/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: '/cadastro',
    component: Cadastro,
  },
  {
    path: '/login',
    component: Login,
  },
];
