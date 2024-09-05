import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratService } from '../../servicecontrat/contrat.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-addcontrat',
  templateUrl: './addcontrat.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  styleUrls: ['./addcontrat.component.css']
})
export class AddcontratComponent {
  contratForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formErrors: string[] = [];
  isSubmitted = false;
  currentDate: string;

  constructor(
    private fb: FormBuilder,
    private contratService: ContratService,
    private router: Router
  ) {
    this.currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    this.contratForm = this.fb.group({
      numero_contrat: ['', Validators.required],
      datedebut: [this.currentDate, Validators.required],
      datefin: [this.currentDate, Validators.required],
      nom_assure: ['', Validators.required],
      numero_immatriculation: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contratForm.get(field);
    return control ? control.invalid && (control.touched || this.isSubmitted) : false;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.contratForm.valid) {
      const newContrat = this.contratForm.value;
      this.contratService.addContrat(newContrat).subscribe(
        response => {
          this.successMessage = 'Contract added successfully!';
          this.errorMessage = null;
          this.formErrors = [];
        },
        error => {
          this.successMessage = null;
          this.errorMessage = 'Error adding contract. Please try again.';
          this.formErrors = [];
        }
      );
    } else {
      this.errorMessage = null;
      this.successMessage = null;
      this.formErrors = this.getFormErrors();
    }
    window.scrollTo(0, 0);
  }

  cancel() {
    this.router.navigate(['/contrat']);
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    Object.keys(this.contratForm.controls).forEach(key => {
      const control = this.contratForm.get(key);
      if (control?.invalid) {
        errors.push(`The ${key.replace('_', ' ')} field is required.`);
      }
    });
    return errors;
  }
}
