import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { SinistreService } from '../serviceSinistre/sinistre.service';
import { ContratService } from '../servicecontrat/contrat.service';
import { Sinistre } from '../Interface/sinistre.interface';
import { Router } from '@angular/router';
import { Contrat } from '../Interface/contrat.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

interface Contract {
[x: string]: any;
  numero_contrat: string;
  datedebut: string;
  datefin: string;
  nom_assure: string;
  numero_immatriculation: string;
}

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [NgIf,NgFor,NgFor,NgIf,MatIconModule,FormsModule,DatePipe,CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {
  constructor(
    private contratService: ContratService, 
    private router: Router,
    private sinistreService : SinistreService
  ) { }

  sinistre : Sinistre[] = [];
  contrat: Contrat[] = [];
  totalContrats: number = 0;
  totalSinistres: number  = 0;

  displayedColumns: string[] = ['numero_contrat', 'datedebut', 'datefin', 'nom_assure', 'numero_immatriculation'];
  dataSource: Contract[] = [
    { numero_contrat: '1234', datedebut: '2024-01-01', datefin: '2024-12-31', nom_assure: 'John Doe', numero_immatriculation: 'AB123CD' },
  ];


  ngOnInit(): void {
    this.contratService.getContrat().subscribe((contrat) => {
      this.totalContrats = contrat.length;
    });
    this.sinistreService.getAllSinistre().subscribe((sinistre)=>{
      this.totalSinistres = sinistre.length
      this.sinistre = sinistre
      console.log(this.totalSinistres)
    })
  }
}
