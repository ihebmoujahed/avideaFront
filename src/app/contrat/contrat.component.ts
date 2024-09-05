import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contrat } from '../Interface/contrat.interface';
import { ContratService } from '../servicecontrat/contrat.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe,CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Sinistre } from '../Interface/sinistre.interface';
import { SinistreService } from '../serviceSinistre/sinistre.service';
import { PhotoService } from '../servicephoto/photo.service';
import { catchError, concatMap, lastValueFrom, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-contrat',
  standalone: true,
  imports: [NgFor, RouterLink, RouterModule, FormsModule, DatePipe, NgIf, MatIconModule, CommonModule],
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  successMessage: string | null = null;
  sinistreByidContrat: Sinistre[] = [];
  contrat: Contrat[] = [];
  filteredContrats: Contrat[] = [];
  paginatedContrat: Contrat[] = [];
  searchTerm: string = '';
  contratid: any;
  fileName = 'Contract.xlsx';
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  isLoading: boolean = false;

  constructor(
    private contratService: ContratService,
    private router: Router,
    public dialog: MatDialog,
    private sinistreService: SinistreService,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    
    this.contratService.getContrat().subscribe((contrat) => {
      this.contrat = contrat;
      this.filterContrats(); 
    });
  }

  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log("its start",startIndex)
    const endIndex = this.currentPage * this.itemsPerPage;
    console.log(endIndex)
    this.paginatedContrat = this.filteredContrats.slice(startIndex, endIndex);
    console.log(this.filteredContrats)
    this.totalPages = Math.ceil(this.filteredContrats.length / this.itemsPerPage);
    console.log(this.totalPages)
  }

  filterContrats(): void {
    if (this.searchTerm) {
      this.filteredContrats = this.contrat.filter(c =>
        c.numero_contrat.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredContrats = this.contrat;
    }
    this.currentPage = 1; 
    this.updatePagination();
  }

  exportexcel(): void {
    let element = document.getElementById('excel');
    if (!element) return;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  getContratByid(id: any,numero_contrat:any) {
    this.router.navigate(['/sinistre', id ,numero_contrat]);
  }

  updateContrat(id: any) {
    this.router.navigate(['/Contrat/updatecontrat', id]);
  }

  checkSinistre(id: any) {
    this.sinistreService.getSinistreById_Contrat(id).subscribe((sinistre) => {
      this.sinistreByidContrat = sinistre;
    });
    this.contratService.getContratById(id).subscribe((result) => {
      const id = result.id_contrat;
      localStorage.setItem("ContratID", JSON.stringify(id));
    });
  }

  async deletecontrat(): Promise<void> {
    this.contratid = localStorage.getItem("ContratID");
    if (!this.contratid) {
      console.error('No contract ID found');
      return;
    }
    try {
      const numero = this.contrat.find(item => item.id_contrat === Number(this.contratid));
      console.log(numero?.numero_contrat) 
      await lastValueFrom(this.sinistreService.deleteSinistreByidContrat(this.contratid));
      const result = await lastValueFrom(this.contratService.deleteContrat(this.contratid)); 
      console.log('Contract deleted successfully:', this.contratid);
      this.successMessage = `Contract '${numero?.numero_contrat}' deleted  successfully`
      this.contratService.getContrat().subscribe((contrat) => {
        this.contrat = contrat;
        this.filterContrats(); 
      });
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Error during deletion:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
}