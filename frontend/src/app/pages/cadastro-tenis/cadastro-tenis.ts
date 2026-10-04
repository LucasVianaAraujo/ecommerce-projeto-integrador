import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-tenis',
  imports: [FormsModule],
  templateUrl: './cadastro-tenis.html',
  styleUrl: './cadastro-tenis.css',
})
export class CadastroTenis {
  modelo = '';
  marca = '';
  preco: number | null = null;
  descricao = '';

  cadastrar() {
    if (!this.modelo.trim() || !this.marca.trim() || !this.descricao.trim() || !this.preco || this.preco <= 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    console.log({
      modelo: this.modelo,
      marca: this.marca,
      preco: this.preco,
      descricao: this.descricao,
    });
    alert('Tênis cadastrado com sucesso!');

    this.modelo = '';
    this.marca = '';
    this.preco = null;
    this.descricao = '';
  }
}
