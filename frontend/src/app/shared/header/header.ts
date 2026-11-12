<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
>>>>>>> feature/cadastro-usuario
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
<<<<<<< HEAD
  imports: [MatIconModule],
=======
  imports: [CommonModule, RouterModule, MatIconModule],
>>>>>>> feature/cadastro-usuario
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isSearchOpen = false;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  openSearch(): void {
    this.isSearchOpen = true;
  }

  closeSearch(): void {
    const input = this.searchInput?.nativeElement;
    if (document.activeElement === input || input?.value.trim() !== '') {
      return;
    }
    this.isSearchOpen = false;
  }
}