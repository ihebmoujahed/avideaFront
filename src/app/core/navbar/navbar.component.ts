import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouteService } from '../../route.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public routeService: RouteService){
  }
  logout(){
    localStorage.removeItem('userToken')
  }
}
