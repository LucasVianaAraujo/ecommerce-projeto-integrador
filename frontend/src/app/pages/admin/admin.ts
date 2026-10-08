import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, MatIconModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
