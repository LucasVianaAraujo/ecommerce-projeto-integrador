
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-admin-produtos-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produtos-lista.html',
  styleUrl: './produtos-lista.css'
})
export class AdminProdutosLista implements OnInit {

  private service = inject(ProdutoService);

  private cdr = inject(ChangeDetectorRef);

  listaProdutos: Produto[] = [];

  ngOnInit(): void {

    this.service.listar().subscribe({

      next: (produtos) => {

        this.listaProdutos = produtos;

        this.cdr.markForCheck();

      },

      error: (erro) => {

        console.error('Erro ao buscar produtos:', erro);

      }

    });

  }

  excluir(id: number) {

    if (
      id !== undefined &&
      confirm('Deseja realmente excluir o produto?')
    ) {

      this.service.excluir(id.toString()).subscribe({

        next: () => {

          this.listaProdutos = this.listaProdutos.filter(
            produto => produto.id !== id
          );

          this.cdr.markForCheck();

        }

      });

    }

  }

}
