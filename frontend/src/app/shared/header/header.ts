import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  itensMenu = [
    {label: 'Home', link: ''},
    {label: "Produtos", link: 'produtos'},
    {label: "Marcas", link: 'Marcas'},
    {label: "Contato", link: 'Contato'},
    {label: "Carrinho", link: 'carrinho'},
    
  ]
 }