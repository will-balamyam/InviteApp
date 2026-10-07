import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiInvitationsService} from '../../../../shared/services/api-invitations.service';
import {FamilyAccessModel, InvitationModel} from '../../../../shared/models/invitation-model';
import {CountryISO, NgxIntlTelInputModule, SearchCountryField} from 'ngx-intl-tel-input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-families-add-edit',
  standalone: true,
  imports: [
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './families-add-edit.component.html',
  styleUrl: './families-add-edit.component.scss'
})
export class FamiliesAddEditComponent {
  familyForm: FormGroup;
  isEditMode: boolean = false;
  familyId: number | null = null;
  invitations: InvitationModel[] = [];
  familyAccessesToDelete: number[] = []; // Para manejar eliminaciones lógicas
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiInvitationsService,
    private toastr: ToastrService
  ) {
    this.loadInvitations();
    this.familyForm = this.fb.group({
      familyName: ['', Validators.required],
      familyCode: [''],
      contactEmail: ['', [Validators.email]],
      contactPhone: [''],
      invitation: ['', Validators.required],
      familyAccesses: this.fb.array([]) // FormArray para los accesos de familia
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.familyId = +id;
        this.loadFamilyData(this.familyId);
      }
    });
  }

  loadInvitations(): void {
    this.apiService.getInvitations().subscribe({
      next: (response) => {
        this.invitations = response.data;
      },
      error: (err) => {
        this.toastr.error('Error fetching invitations', 'Error');
        console.error(err);
      }
    });
  }

  loadFamilyData(id: number): void {
    this.apiService.getFamilyById(id).subscribe({
      next: (data) => {
        this.familyForm.patchValue(data.data);
        this.familyForm.get('invitation')?.setValue(data.data.invitation?.id);

        // Cargar familyAccesses existentes
        const familyAccessesArray = this.familyForm.get('familyAccesses') as FormArray;
        familyAccessesArray.clear(); // Limpiar array actual

        if (data.data.familyAccesses && data.data.familyAccesses.length > 0) {
          data.data.familyAccesses.forEach((access: FamilyAccessModel) => {
            familyAccessesArray.push(this.createFamilyAccessFormGroup(access));
          });
        }
      },
      error: (err) => {
        this.toastr.error('Error loading family data', 'Error');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    console.log(this.familyForm.errors);
    if (this.familyForm.invalid) {
      this.toastr.error('Please fill in all required fields', 'Error');
      return;
    }

    const formData = this.familyForm.value;
    formData.familyCode = this.normalizeString(formData.familyName);
    formData.contactPhone = formData.contactPhone ? formData.contactPhone.e164Number : null;

    // Limpiar tempId de los familyAccesses antes de enviar
    if (formData.familyAccesses) {
      formData.familyAccesses = formData.familyAccesses.map((access: any) => {
        const { tempId, ...cleanAccess } = access;
        return cleanAccess;
      });
    }

    // Agregar IDs de familyAccesses a eliminar
    if (this.familyAccessesToDelete.length > 0) {
      formData.familyAccessesToDelete = this.familyAccessesToDelete;
    }

    if (this.isEditMode && this.familyId) {
      this.apiService.updateFamily(this.familyId, formData).subscribe({
        next: () => {
          this.toastr.success('Family updated successfully', 'Success');
          this.router.navigate(['/admin/families']);
        },
        error: (err) => {
          this.toastr.error('Error updating family', 'Error');
          console.error(err);
        }
      });
    } else {
      this.apiService.createFamily(formData).subscribe({
        next: () => {
          this.toastr.success('Family created successfully', 'Success');
          this.router.navigate(['/admin/families']);
        },
        error: (err) => {
          this.toastr.error('Error creating family', 'Error');
          console.error(err);
        }
      });
    }
  }

  private normalizeString(text: string): string {
    if (!text) return '';

    return text
      .trim() // "  José María & Pérez  " → "José María & Pérez"
      .toLowerCase() // "José María & Pérez" → "josé maría & pérez"
      .normalize('NFD') // "josé maría" → "jose maría" (descompone acentos)
      .replace(/[\u0300-\u036f]/g, '') // Elimina marcas de acentos
      .replace(/[^a-z0-9\s]/g, '') // "josé maría & pérez" → "jose maria  perez"
      .replace(/\s+/g, '-') // "jose maria  perez" → "jose-maria-perez"
      .replace(/-+/g, '-') // Evita múltiples guiones consecutivos
      .replace(/^-|-$/g, ''); // Elimina guiones al inicio/final
  }

  // Getters para facilitar el acceso al FormArray
  get familyAccesses(): FormArray {
    return this.familyForm.get('familyAccesses') as FormArray;
  }

  // Crear FormGroup para un familyAccess
  createFamilyAccessFormGroup(access?: FamilyAccessModel): FormGroup {
    return this.fb.group({
      id: [access?.id || null],
      tempId: [Date.now() + Math.random()], // ID temporal único para tracking
      memberName: [access?.memberName || '', Validators.required],
      confirmed: [access?.confirmed !== undefined ? access.confirmed : null]
    });
  }

  // Agregar nuevo familyAccess
  addFamilyAccess(): void {
    this.familyAccesses.push(this.createFamilyAccessFormGroup());
  }

  // Remover familyAccess
  removeFamilyAccess(index: number): void {
    const familyAccess = this.familyAccesses.at(index);
    const accessId = familyAccess.get('id')?.value;

    // Si tiene ID, agregar a la lista de eliminaciones para el backend
    if (accessId) {
      this.familyAccessesToDelete.push(accessId);
    }

    // Remover del FormArray
    this.familyAccesses.removeAt(index);
  }

  // Método helper para obtener tempId de forma segura (trackBy function)
  getTempId(index: number, control: any): string {
    return control.get('tempId')?.value || index.toString();
  }

  protected readonly SearchCountryField = SearchCountryField;
  protected readonly CountryISO = CountryISO;
}
