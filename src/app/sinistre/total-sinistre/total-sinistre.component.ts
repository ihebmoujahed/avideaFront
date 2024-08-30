import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe,CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { catchError, concatMap, lastValueFrom, of } from 'rxjs';
import { Sinistre } from '../../Interface/sinistre.interface';
import { SinistreService } from '../../serviceSinistre/sinistre.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-total-sinistre',
  standalone: true,
  imports: [NgFor, RouterLink, RouterModule, FormsModule, DatePipe, NgIf, MatIconModule, CommonModule],
  templateUrl: './total-sinistre.component.html',
  styleUrl: './total-sinistre.component.css'
})
export class TotalSinistreComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sinistreService: SinistreService,
  ) { }


  successMessage: string | null = null;
  sinistreByidContrat: Sinistre[] = [];
  sinister: Sinistre[] = [];
  filteredSinister: Sinistre[] = [];
  paginatedSinister: Sinistre[] = [];
  searchTerm: string = '';
  contratid: any;
  fileName = 'Sinistre.xlsx';
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  ngOnInit(): void {
    this.sinistreService.getAllSinistre().subscribe((sinistre) => {
      this.sinister = sinistre;
      this.filterSinister(); 
    });
  }
  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
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

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log("its start",startIndex)
    const endIndex = this.currentPage * this.itemsPerPage;
    console.log(endIndex)
    this.paginatedSinister = this.filteredSinister.slice(startIndex, endIndex);
    console.log(this.filteredSinister)
    this.totalPages = Math.ceil(this.filteredSinister.length / this.itemsPerPage);
    console.log(this.totalPages)
  }
  filterSinister(): void {
    if (this.searchTerm) {
      this.filteredSinister = this.sinister.filter(c =>
        c.numero_sinistre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredSinister = this.sinister;
    };
    this.currentPage = 1; 
    this.updatePagination();
  }
  detail(id: any) {
    this.router.navigate(['/Sinistre/detailsinistre', id]);
  }
}