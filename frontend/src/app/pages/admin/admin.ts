import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { adminLogado, loginAdmin } from '../../shared/auth/auth';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, MatIconModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  protected readonly mostrarSenha = signal(false);

  email = '';
  senha = '';

  constructor(private roteador: Router) {}

  ngOnInit() {
    if (adminLogado()) {
      this.roteador.navigate(['/admin/produtos']);
    }
  }

  botaoDesabilitado() {
    return this.email.trim() === '' || this.senha.trim() === '';
  }

  alternarSenha() {
    this.mostrarSenha.update((valor) => !valor);
  }

  enviar() {
    if (loginAdmin(this.email, this.senha)) {
      this.roteador.navigate(['/admin/produtos']);
    } else {
      alert('Credenciais inválidas!');
    }
  }
}
