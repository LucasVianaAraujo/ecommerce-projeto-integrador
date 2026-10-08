import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, MatIconModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  private readonly router = inject(Router);

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  protected readonly mostrarSenha = signal(false);
  protected readonly mostrarConfirmarSenha = signal(false);

  botaoDesabilitado: boolean = true;
  mensagemErro = '';

  alternarSenha() {
    this.mostrarSenha.update((valor) => !valor);
  }

  alternarConfirmarSenha() {
    this.mostrarConfirmarSenha.update((valor) => !valor);
  }

  validarFormulario() {
    const nomeValido = this.nome.trim() !== '';
    const emailValido = this.email.trim() !== '' && this.email.includes('@');
    const senhaValida = this.senha.trim().length >= 4;
    const confirmacaoValida = this.confirmarSenha.trim() !== '';

    if (this.confirmarSenha && this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem!';
    } else {
      this.mensagemErro = '';
    }

    if (nomeValido && emailValido && senhaValida && confirmacaoValida && this.senha === this.confirmarSenha) {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  cadastrar() {
    if (this.botaoDesabilitado) return;

    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem!';
      return;
    }

    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}
