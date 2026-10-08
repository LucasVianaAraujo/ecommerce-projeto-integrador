import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
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
}
