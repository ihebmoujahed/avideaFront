import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SinistreService } from '../../serviceSinistre/sinistre.service';
import { Sinistre } from '../../Interface/sinistre.interface';
@Component({
  selector: 'app-updatesinistre',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NgFor],
  templateUrl: './updatesinistre.component.html',
  styleUrl: './updatesinistre.component.css'
})
export class UpdatesinistreComponent {
  onCancel() {
    this.router.navigate(['/contrat'])
  }
  sinistreId: string | null = null;
  SinistreFrom: FormGroup;
  isSubmitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formErrors: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sinistreService: SinistreService
  ) {

  this.SinistreFrom = this.fb.group({
      numero_sinistre: ['', Validators.required],
      date_accident: ['', Validators.required],
      date_creation: ['', Validators.required],
      status: ['', Validators.required],
      idContrat: ['', Validators.required],
      id_sinistre:  ['', Validators.required]

  })
}
isFieldInvalid(field: string): boolean {
  const control = this.SinistreFrom.get(field);
  return control ? control.invalid && (control.touched || this.isSubmitted) : false;
}


ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.sinistreId = params.get('id');
    if (this.sinistreId) {
      this.loadContractData(this.sinistreId);
    }
  });
}
loadContractData(id: string): void {
  this.sinistreService.getSinistreById(Number(id)).subscribe(
    sinistre => {
      this.SinistreFrom.patchValue(sinistre);
      console.log(sinistre);
    },
    error => {
      console.error('Error fetching contract data:', error);
    }
  );
}
onSubmit(): void {
  if (this.SinistreFrom.invalid) {
    this.isSubmitted = true;
    return;
  }
  
  const updatesinistre: Sinistre = this.SinistreFrom.value;
  this.sinistreService.PutSinistre(updatesinistre).subscribe(
    response => {
      this.successMessage = 'Sinistre Updated successfully!';
      this.errorMessage = null;
      this.formErrors = [];
  },
    error => {
      this.successMessage = null;
      this.errorMessage = 'Error Update Sinistre. Please try again.';
      this.formErrors = [];
  }
  );
}

}

