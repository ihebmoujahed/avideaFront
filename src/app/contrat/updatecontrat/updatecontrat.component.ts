import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContratService } from '../../servicecontrat/contrat.service';
import { Contrat } from '../../Interface/contrat.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-updatecontrat',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './updatecontrat.component.html',
  styleUrls: ['./updatecontrat.component.css']
})
export class UpdatecontratComponent implements OnInit {
  onCancel() {
    this.router.navigate(['contrat'])
  }
  contractId: string | null = null;
  contratForm: FormGroup;
  isSubmitted = false;
  Submitted = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formErrors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contratService: ContratService
  ) {
    this.contratForm = this.fb.group({
      id_contrat: ['', Validators.required],
      nom_assure: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      numero_contrat: ['', Validators.required],
      numero_immatriculation: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contractId = params.get('id');
      if (this.contractId) {
        this.loadContractData(this.contractId);
      }
    });
  }

  loadContractData(id: string): void {
    this.contratService.getContratById(Number(id)).subscribe(
      contrat => {
        this.contratForm.patchValue(contrat);
        console.log(contrat);
      },
      error => {
        console.error('Error fetching contract data:', error);
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contratForm.get(field);
    return control ? control.invalid && (control.touched || this.isSubmitted) : false;
  }

  onSubmit(): void {
    if (this.contratForm.invalid) {
      this.isSubmitted = true;
      return;
    }

    const updatedContrat: Contrat = this.contratForm.value;
    this.contratService.PutContrat(updatedContrat).subscribe(
      response => {
        this.successMessage = 'Contrat Updated successfully!';
        this.errorMessage = null;
        this.formErrors = [];
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Error Update Contrat. Please try again.';
        this.formErrors = [];
      }
    );
  }
}
