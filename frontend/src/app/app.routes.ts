import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { CadastroUsuario } from './pages/cadastro-usuario/cadastro-usuario'; 
import { Admin } from './pages/admin/admin';
import { ProdutosLista } from './pages/produtos-lista/produtos-lista';
import { CadastroTenis } from './pages/cadastro-tenis/cadastro-tenis';
import { Produtos } from './pages/produtos/produtos';
import { Carrinho } from './pages/carrinho/carrinho';
import { Categorias } from './pages/categorias/categorias';
import { ExibirProduto } from './pages/exibir-produto/exibir-produto';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro', component: CadastroUsuario }, 
  { path: 'admin', component: Admin },
  { path: 'admin/produtos', component: ProdutosLista },
  { path: 'admin/produtos/novo', component: CadastroTenis },
  { path: 'admin/produtos/:id/editar', component: CadastroTenis },
  { path: 'carrinho', component: Carrinho },
  { path: 'produtos', component: Produtos },
  {path: 'categorias', component: Categorias},
  {path: 'exibir/produto', component: ExibirProduto},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];