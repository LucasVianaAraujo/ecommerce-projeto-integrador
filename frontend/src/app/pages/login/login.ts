import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  protected readonly mostrarSenha = signal(false);

  email = '';
  senha = '';
  botaoDesabilitado:boolean = true;

  validarFormulario() {
    if(this.email.trim() !== '' && this.senha.trim() != ''){
      this.botaoDesabilitado = false;
     } else {
      this.botaoDesabilitado = true;
     }
    }

  alternarSenha() {
    this.mostrarSenha.update((valor) => !valor);
  }

  enviar() {
    if (this.email == 'admin@gmail.com' && this.senha == '1234') {
      alert('Credenciais Corretas!')
    } else {
      alert('Credenciais inválidas!');
    }
  }
}
