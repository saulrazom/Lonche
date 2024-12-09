import { Component} from '@angular/core';
import { MaterialModule } from '@modules/material/material.module';
import { LoaderComponent } from '@components/shared/loader/loader.component';
import { AuthService } from '../../../../../services/shared/auth.service';
import { HttpService } from '../../../../../services/shared/http-service.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'], 
})
export class ProfileDataComponent{
  profileDataForm: FormGroup;
  id_user = '';
  display_name = '';
  display_lastname = '';
  display_bio = '';
  displayImageUrl = '';
  isLoading = false;

  selectedFile: File | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.id_user = this.authService.getUserID()?.toString() || '';
    this.getCurrentUserData();

    this.profileDataForm = formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  getCurrentUserData() {
    const endpoint = 'users/' + this.id_user;

    this.httpService.get<{ name: string; lastname: string; bio: string, profilePic: string }>(
      endpoint
    ).subscribe({
      next: (response) => {
        this.display_name = response.name;
        this.display_lastname = response.lastname;
        this.display_bio = response.bio;
        this.displayImageUrl = response.profilePic;

        this.profileDataForm.setValue({
          name: this.display_name || '',
          lastname: this.display_lastname || '',
          bio: this.display_bio || '',
        });
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      },
    });
  }

  updateUserData() {
    if (this.profileDataForm.valid) {
      this.isLoading = true; 
      const formValues = this.profileDataForm.value;
  
      const formData = new FormData();
  
      formData.append('name', formValues.name);
      formData.append('lastname', formValues.lastname);
      formData.append('bio', formValues.bio);
  
      if (this.selectedFile) {
        formData.append('profilePic', this.selectedFile);
      }
  
      const endpoint = 'users/' + this.id_user;
  
      this.httpService.put<FormData, { _id: string }>(endpoint, formData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.isLoading = false; 
          alert('Datos actualizados correctamente');
          window.location.reload(); 
        },
        error: (error) => {
          this.isLoading = false; 
          alert('Error al actualizar los datos del usuario: ' + error.message);
        },
      });
    }
  }
  

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.selectedFile = null;
      }
      // else if (file.size > 5 * 1024 * 1024) {
      //   this.selectedFile = null;
      // } 
      else {
        this.selectedFile = file;
      }
    } else {
      this.selectedFile = null;
    }
  }
}
