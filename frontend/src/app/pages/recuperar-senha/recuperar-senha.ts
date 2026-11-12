import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenha {}