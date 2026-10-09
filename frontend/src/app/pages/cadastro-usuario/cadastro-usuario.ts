import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterLink],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css',
})
export class CadastroUsuario {
  private readonly router = inject(Router);
  protected readonly mostrarSenha = signal(false);

  nome = '';
  emailOuCpf = '';
  senha = '';
  confirmarSenha = '';
  botaoDesabilitado = true;

  validarFormulario() {
    const preenchido = 
      this.nome.trim() !== '' && 
      this.emailOuCpf.trim() !== '' && 
      this.senha.trim() !== '' && 
      this.confirmarSenha.trim() !== '';
      
    const senhasIguais = this.senha === this.confirmarSenha;
    
    this.botaoDesabilitado = !(preenchido && senhasIguais);
  }

  alternarSenha() {
    this.mostrarSenha.update((valor) => !valor);
  }

  cadastrar() {
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}