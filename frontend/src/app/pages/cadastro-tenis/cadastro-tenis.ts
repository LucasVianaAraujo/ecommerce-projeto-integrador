import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-admin-cadastro-tenis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-tenis.html',
  styleUrl: './cadastro-tenis.css'
})
export class AdminCadastroTenis implements OnInit {

  produto: Produto = {} as Produto;

  private service = inject(ProdutoService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  produtoId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit() {

    if (this.produtoId) {

      this.service.buscarPorId(this.produtoId).subscribe({

        next: (produto) => this.produto = produto,

        error: () => alert('Produto não encontrado.')

      });

    }

  }

  salvar() {
    if (this.produtoId) {

      this.service.editar(this.produto).subscribe({

        next: (produto) => {

          this.produto = produto;

          this.router.navigate(['/admin/produtos']);

        },

        error: () => alert('Erro ao alterar o produto.')

      });

    } else {
      this.service.incluir(this.produto).subscribe({

        next: (produto) => {

          this.produto = produto;

          alert(`Produto ${this.produto.nome} cadastrado com sucesso!`);

          this.router.navigate(['/admin/produtos']);

        },

        error: () => alert('Erro ao cadastrar o produto.')

      });

    }

  }

}