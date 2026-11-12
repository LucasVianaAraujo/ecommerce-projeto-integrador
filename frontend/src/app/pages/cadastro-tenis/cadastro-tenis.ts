import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { adminLogado } from '../../shared/auth/auth';
import { buscarProduto, cadastrarProduto, editarProduto } from '../../shared/produto/produto';

@Component({
  selector: 'app-cadastro-tenis',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-tenis.html',
  styleUrl: './cadastro-tenis.css',
})
export class CadastroTenis {
  id = 0;
  editando = false;

  modelo = '';
  marca = '';
  preco: number | null = null;
  descricao = '';

  constructor(private roteador: Router, private rota: ActivatedRoute) {}

  ngOnInit() {
    if (!adminLogado()) {
      this.roteador.navigate(['/admin']);
      return;
    }

    const idDaRota = this.rota.snapshot.paramMap.get('id');
    if (!idDaRota) {
      return;
    }

    const produto = buscarProduto(Number(idDaRota));
    if (!produto) {
      this.roteador.navigate(['/admin/produtos']);
      return;
    }

    this.id = produto.id;
    this.editando = true;
    this.modelo = produto.modelo;
    this.marca = produto.marca;
    this.preco = produto.preco;
    this.descricao = produto.descricao;
  }

  cadastrar() {
    if (!this.modelo.trim() || !this.marca.trim() || !this.descricao.trim() || !this.preco || this.preco <= 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    if (this.editando) {
      editarProduto(this.id, this.modelo.trim(), this.marca.trim(), this.preco, this.descricao.trim());
      alert('Tênis atualizado com sucesso!');
    } else {
      cadastrarProduto(this.modelo.trim(), this.marca.trim(), this.preco, this.descricao.trim());
      alert('Tênis cadastrado com sucesso!');
    }
    this.roteador.navigate(['/admin/produtos']);
  }
}
