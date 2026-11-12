import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
<<<<<<< HEAD
  imports: [RouterOutlet, Header, Footer,],
=======
  imports: [RouterOutlet, Header, Footer],
>>>>>>> feature/cadastro-usuario
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('OldShoes');
}