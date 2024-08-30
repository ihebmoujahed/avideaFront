import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SinistreService } from '../serviceSinistre/sinistre.service';
import { Sinistre } from '../Interface/sinistre.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PhotoService } from '../servicephoto/photo.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sinistre',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgFor,NgIf,MatIconModule,FormsModule,DatePipe,CommonModule ],
  templateUrl: './sinistre.component.html',
  styleUrls: ['./sinistre.component.css']
})
export class SinistreComponent implements OnInit {
  sinistre : Sinistre[] = []
  contractId: string | null = null;
  numerocontract : string| null = null;
  filteredsinistre: Sinistre[] = [];
  paginatedSinister: Sinistre[] = [];
  searchTerm: string = '';
  fileName= 'Sinistre.xlsx';
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sinistreService : SinistreService,
    public dialog: MatDialog,
    private photoService: PhotoService

  ) {}
  exportexcel(): void
  {
    let element = document.getElementById('excel');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     XLSX.writeFile(wb, this.fileName);
 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contractId = params.get('id');
      this.numerocontract = params.get('numero_contrat');
      console.log('Contract ID:', this.contractId);
    });
    this.getSinistreByid()
  }
  getContratByid() {
    this.router.navigate(['sinistre/AddSinister', this.contractId]);
  }
  updateContrat(id: any) {
    this.router.navigate(['/Sinistre/updatesinistre', id]);
  }
  detail(id: any) {
    this.router.navigate(['/Sinistre/detailsinistre', id]);
  }

  getSinistreByid(){
    this.sinistreService.getSinistreById_Contrat(Number(this.contractId)).subscribe((sinistre)=>{
      this.sinistre = sinistre
      this.filteredsinistre = sinistre
      console.log(this.sinistre)
      this.filterSinistre()

    })

  }
  filterSinistre(): void {
    if (this.searchTerm) {
      this.filteredsinistre = this.sinistre.filter(s =>
        s.numero_sinistre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredsinistre = this.sinistre;
    }
    this.currentPage = 1 
    this.updatePagination()
  }
  handlePageChange(pageNumber:any){
    this.currentPage = pageNumber
    this.updatePagination()
  }
  updatePagination(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = this.currentPage * this.itemsPerPage
    this.paginatedSinister = this.filteredsinistre.slice(startIndex,endIndex)
    this.totalPages = Math.ceil(this.filteredsinistre.length / this.itemsPerPage)
  }
  deleteSinsitre(id :any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.photoService.deletePhotoByidsinistre(id).subscribe(() => {
          this.filteredsinistre = this.filteredsinistre.filter(s => s.id_sinistre !== id);
        });
        this.sinistreService.deleteSinistre(id).subscribe(() => {
          this.filteredsinistre = this.filteredsinistre.filter(s => s.id_sinistre !== id);
        });
      }
    });

  }
}
