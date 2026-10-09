import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { adminLogado, logoutAdmin } from '../../shared/auth/auth';
import { excluirProduto, listaProdutos, Produto } from '../../shared/produto/produto';

@Component({
  selector: 'app-produtos-lista',
  imports: [FormsModule, RouterLink, MatIconModule],
  templateUrl: './produtos-lista.html',
  styleUrl: './produtos-lista.css',
})
export class ProdutosLista {
  produtos = listaProdutos;
  filtro = '';

  constructor(private roteador: Router) {}

  ngOnInit() {
    if (!adminLogado()) {
      this.roteador.navigate(['/admin']);
    }
  }

  produtosFiltrados() {
    const busca = this.filtro.trim().toLowerCase();
    return this.produtos.filter(
      (produto) =>
        produto.modelo.toLowerCase().includes(busca) ||
        produto.marca.toLowerCase().includes(busca),
    );
  }

  excluir(produto: Produto) {
    if (confirm(`Deseja excluir o tênis "${produto.modelo}"?`)) {
      excluirProduto(produto.id);
    }
  }

  sair() {
    logoutAdmin();
    this.roteador.navigate(['/admin']);
  }
}
