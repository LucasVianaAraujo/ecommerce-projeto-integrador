import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { ProdutosLista } from './pages/produtos-lista/produtos-lista';
import { CadastroTenis } from './pages/cadastro-tenis/cadastro-tenis';
import { Carrinho } from './pages/carrinho/carrinho';


export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'admin', component: Admin },
    { path: 'admin/produtos', component: ProdutosLista },
    { path: 'admin/produtos/novo', component: CadastroTenis },
    { path: 'admin/produtos/:id/editar', component: CadastroTenis },
    {path: 'carrinho', component: Carrinho},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
