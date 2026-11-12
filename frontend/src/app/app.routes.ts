import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { CadastroUsuario } from './pages/cadastro-usuario/cadastro-usuario'; 
import { Admin } from './pages/admin/admin';
import { AdminProdutosLista } from './pages/admin-produtos-lista/produtos-lista';
import { AdminCadastroTenis } from './pages/cadastro-tenis/cadastro-tenis';
import { Produtos } from './pages/produtos/produtos';
import { Carrinho } from './pages/carrinho/carrinho';
import { Categorias } from './pages/categorias/categorias';
import { ExibirProduto } from './pages/exibir-produto/exibir-produto';
import { PefilUser } from './pages/pefil-user/pefil-user';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro', component: CadastroUsuario }, 
  { path: 'admin', component: Admin },
  { path: 'admin/produtos', component: AdminProdutosLista },
  { path: 'admin/produtos/novo', component: AdminCadastroTenis },
  { path: 'admin/produtos/:id/editar', component: AdminCadastroTenis },
  { path: 'carrinho', component: Carrinho },
  { path: 'produtos', component: Produtos },
  { path: 'categorias', component: Categorias },
  { path: 'exibir/produto', component: ExibirProduto },
  { path: 'perfil', component: PefilUser },
  { path: 'recuperar-senha', component: RecuperarSenha },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];