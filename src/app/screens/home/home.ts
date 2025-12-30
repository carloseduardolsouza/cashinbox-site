import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { Footer } from '../../components/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavHeader, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  startFreeTrial() {
    this.router.navigate(['/cadastro']);
  }

  seeDemo() {
    this.router.navigate(['/plataforma']);
  }
}