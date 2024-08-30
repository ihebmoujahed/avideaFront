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
  SinisterForm: FormGroup;
  contrat: Contrat[] = []
  nom_issured: any
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formErrors: string[] = [];
  isSubmitted = false;
  Submitted = false;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private sinistreService: SinistreService,
    private contratservice: ContratService,
    private router: Router

  ) {
    this.SinisterForm = this.fb.group({
      numero_sinistre: ['', Validators.required],
      date_accident: ['', Validators.required],
      date_creation: ['', Validators.required],
      status: [{ value: 'open', disabled: true }], // Disabled but will be included manually
      idContrat: [{ value: this.contractId, disabled: true }] // Disabled but will be included manually
        });
  }
  cancel() {
    this.router.navigate(['/totalSinister/']);
  }
  ngOnInit(): void {

    this.contratservice.getContrat().subscribe((c) => {
      this.contrat = c
    })

  }
  onContractChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.contractId = selectedValue
    console.log('Selected Contract Numero:', this.contractId);
    this.contratservice.getContratById(Number(this.contractId)).subscribe((c)=>{
      this.nom_issured = c.nom_assure 
    })

    if (this.contractId) {
      this.SinisterForm.patchValue({
        idContrat: Number(this.contractId),
        status: "Open"
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.SinisterForm.get(field);
    return control ? control.invalid && (control.touched || this.isSubmitted) : false;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.SinisterForm.value); // Check if values are correct
  
    if (this.SinisterForm.valid) {
      const newSinistre = {
        ...this.SinisterForm.value,
        status: 'open', // Ensure status is correct
        idContrat: this.contractId // Ensure idContrat is correct
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
