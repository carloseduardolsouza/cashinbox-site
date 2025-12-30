import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  imports: [RouterModule],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.css',
})
export class NavHeader {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}