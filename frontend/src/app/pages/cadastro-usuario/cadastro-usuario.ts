import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css',
})
export class CadastroUsuario {
    ocultarSenha = true; // Declarando a váriavel usada no html pra fazer o olho da senha abrir e fechar 
    ocultarConfirmaSenha = true;
}