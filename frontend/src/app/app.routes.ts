import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import { Login } from './pages/login/login';
import { CadastroTenis } from './pages/cadastro-tenis/cadastro-tenis';


export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'cadastro-tenis', component: CadastroTenis },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
