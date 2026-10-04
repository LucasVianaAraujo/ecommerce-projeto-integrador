import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
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