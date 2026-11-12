<<<<<<< HEAD
import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
=======
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
>>>>>>> feature/cadastro-usuario
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
<<<<<<< HEAD
  imports: [FormsModule, MatIconModule],
=======
  standalone: true,
  imports: [RouterLink, MatIconModule],
>>>>>>> feature/cadastro-usuario
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
<<<<<<< HEAD
  private readonly router = inject(Router);
  protected readonly mostrarSenha = signal(false);

  email = '';
  senha = '';
  botaoDesabilitado = true;

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
=======
  ocultarSenha = true; // Declarando a váriavel usada no html pra fazer o olho da senha abrir e fechar 
}
>>>>>>> feature/cadastro-usuario
