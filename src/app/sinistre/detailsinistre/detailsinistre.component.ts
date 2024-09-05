import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Sinistre } from '../../Interface/sinistre.interface';
import { SinistreService } from '../../serviceSinistre/sinistre.service';
import { PhotoService } from '../../servicephoto/photo.service';
import { Photo } from '../../Interface/photo.interface';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ContratService } from '../../servicecontrat/contrat.service';
import { Contrat } from '../../Interface/contrat.interface';
@Component({
  selector: 'app-detailsinistre',
  templateUrl: './detailsinistre.component.html',
  standalone: true,
  imports: [MatIconModule, CommonModule, DatePipe,NgFor],
  styleUrls: ['./detailsinistre.component.scss']
})
export class DetailsinistreComponent implements OnInit {
  sinistreId: string | null = null;
  SinistreFrom: FormGroup;
  formErrors: string[] = [];
  selectedFile: File | null = null;
  successMessage: string | null = null;
  photos: Photo[] = [];
  contrat:any
  contratid : any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private sinistreService: SinistreService,
    private contratservice: ContratService,
    private photoService: PhotoService
  ) {
    this.SinistreFrom = this.fb.group({
      numero_sinistre: ['', Validators.required],
      date_accident: ['', Validators.required],
      date_creation: ['', Validators.required],
      status: ['', Validators.required],
      idContrat: ['', Validators.required],
      id_sinistre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sinistreId = params.get('id');
      if (this.sinistreId) {
        this.loadContractData(this.sinistreId);
        this.loadPhotos(Number(this.sinistreId)); 
      }
    });
  }

  loadContractData(id: string): void {
    this.sinistreService.getSinistreById(Number(id)).subscribe(
      sinistre => {
        this.SinistreFrom.patchValue(sinistre);
        console.log(sinistre);
        this.contratid = sinistre.idContrat
        console.log(this.contratid)
        this.contratservice.getContratById(this.contratid).subscribe((contrat)=>{
          this.contrat = contrat
          console.log(this.contrat)
        })
      
      },
      error => {
        console.error('Error fetching contract data:', error);
      }
    );
  }

  loadPhotos(id: number): void {
    this.photoService.getPhotosBySinistre(id).subscribe(
      photos => {
        this.photos = photos; 
        console.log(photos);
      },
      error => {
        console.error('Error fetching photos:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
    console.log(file);
  }

  onSubmit(): void {
    if (this.SinistreFrom.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('id_sinistre', this.sinistreId || '');

      this.photoService.addPhotosinistre(formData).subscribe(
        () => {
          console.info('Photo uploaded successfully');
          this.loadPhotos(Number(this.sinistreId));
          this.successMessage = "Photo uploaded successfully";
          setTimeout(() => {
            this.successMessage = null;
          }, 1000);
        },
        error => {
          console.error('Error uploading photo:', error);
          this.formErrors.push('Error uploading photo');
        }
      );
    } else {
      console.error('Form is invalid or file is missing');
    }
  }

  getPhotoUrl(photoId: number): string {
    return `http://localhost:8080/api/photo/photo/${photoId}`;
  }

  deletePhoto(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.photoService.deletePhoto(id).subscribe(
          () => {
            this.photos = this.photos.filter(s => s.id_photo !== id);
            this.successMessage = "Photo Deleted successfully";
            setTimeout(() => {
              this.successMessage = null;
            }, 1000);
          },
          error => {
            console.error('Error deleting photo:', error);
            this.formErrors.push('Error deleting photo');
          }
        );
      }
    });
  }
}
