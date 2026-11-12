import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  ocultarSenha = true; // Declarando a váriavel usada no html pra fazer o olho da senha abrir e fechar 
}