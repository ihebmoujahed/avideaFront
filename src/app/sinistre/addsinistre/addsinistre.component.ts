import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SinistreService } from '../../serviceSinistre/sinistre.service';
import { Router } from '@angular/router';
import { Contrat } from '../../Interface/contrat.interface';
import { ContratService } from '../../servicecontrat/contrat.service';
@Component({
  selector: 'app-addsinistre',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './addsinistre.component.html',
  styleUrls: ['./addsinistre.component.css']
})
export class AddsinistreComponent implements OnInit {
  contractId: string | null = null;
  currentDate: string;
  SinisterForm: FormGroup;
  contrat: Contrat[] = []
  nom_issured: any
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formErrors: string[] = [];
  isSubmitted = false;
  Submitted = false;
  
  datetoday: any
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private sinistreService: SinistreService,
    private contratservice: ContratService,
    private router: Router

  ) {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.SinisterForm = this.fb.group({
      numero_sinistre: ['', Validators.required],
      date_accident: [this.currentDate, Validators.required],
      date_creation: [this.currentDate, Validators.required],
      status: [{ value: 'Open', disabled: true }],
      idContrat: [{ value: this.contractId, disabled: true }]
    });
  }
  cancel() {
    this.router.navigate(['/totalSinister/']);
  }
  ngOnInit(): void {

    this.contratservice.getContrat().subscribe((c) => {
      this.contrat = c
    })
    this.getDate()
  }
  onContractChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.contractId = selectedValue
    console.log('Selected Contract Numero:', this.contractId);
    this.contratservice.getContratById(Number(this.contractId)).subscribe((c) => {
      this.nom_issured = c.nom_assure
    })

    if (this.contractId) {
      this.SinisterForm.patchValue({
        idContrat: Number(this.contractId),
        status: "Open"
      });
    }
  }
  getDate() {
    var today = new Date();
    this.datetoday = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.SinisterForm.get(field);
    return control ? control.invalid && (control.touched || this.isSubmitted) : false;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.SinisterForm.value);

    if (this.SinisterForm.valid) {
      const newSinistre = {
        ...this.SinisterForm.value,
        status: 'Open',
        idContrat: this.contractId
      };
      this.sinistreService.addSinistre(newSinistre).subscribe(
        response => {
          this.successMessage = 'Sinistre added successfully';
          this.errorMessage = null;
          this.formErrors = [];
        },
        error => {
          this.successMessage = null;
          this.errorMessage = 'Error adding Sinistre, Please try again.';
          this.formErrors = [];
        }
      );
    } else {
      this.formErrors = [];
      Object.keys(this.SinisterForm.controls).forEach(key => {
        const control = this.SinisterForm.get(key);
        if (control && control.invalid) {
          this.formErrors.push(`${key} is invalid`);
        }
      });
    }
    window.scrollTo(0, 0);
  }
}
