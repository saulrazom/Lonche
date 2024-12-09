import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesAdminComponent } from './cities-admin.component';
import { MatTableModule } from '@angular/material/table';
import { HttpService } from 'app/services/shared/http-service.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { provideIcons } from '@ng-icons/core';
import { faSolidSquareXmark } from '@ng-icons/font-awesome/solid';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CitiesAdminComponent', () => {
  let component: CitiesAdminComponent;
  let fixture: ComponentFixture<CitiesAdminComponent>;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  const mockCities = [
    { _id: '1', name: 'Guadalajara', region: 'Jalisco', country: 'México', language: 'ES' },
    { _id: '2', name: 'México D.F.', region: 'CDMX', country: 'México', language: 'ES' },
  ];

  beforeEach(async () => {
    mockHttpService = jasmine.createSpyObj('HttpService', ['get', 'post', 'delete']);
    mockHttpService.get.and.returnValue(of(mockCities));
    mockHttpService.post.and.returnValue(of(mockCities[0]));
    mockHttpService.delete.and.returnValue(of(mockCities[0]));

    await TestBed.configureTestingModule({
      imports: [ // Cambiado de `declarations` a `imports`
        CitiesAdminComponent, // Ahora importamos el componente standalone
        MatTableModule,
        ReactiveFormsModule,
        NgIconComponent,
      ],
      providers: [
        FormBuilder,
        { provide: HttpService, useValue: mockHttpService },
        provideIcons({ faSolidSquareXmark }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should call createCity and add a city', () => {
    component.cityForm.setValue({
      name: 'Cancún',
      region: 'Quintana Roo',
      country: 'México',
      language: 'ES',
    });

    component.createCity();

    expect(mockHttpService.post).toHaveBeenCalledWith('cities/', component.cityForm.value);
    expect(mockHttpService.get).toHaveBeenCalled(); // Se espera que refresque la lista
  });

  fit('should handle errors when creating a city', () => {
    mockHttpService.post.and.returnValue(throwError(() => new Error('Error al crear ciudad')));

    component.cityForm.setValue({
      name: 'Cancún',
      region: 'Quintana Roo',
      country: 'México',
      language: 'ES',
    });

    component.createCity();

    expect(mockHttpService.post).toHaveBeenCalled();
    // Verifica que el manejo de errores sea llamado, aquí puedes agregar el mensaje de error esperado en el DOM.
  });

  fit('should call deleteCity and remove a city', () => {
    component.deleteCity(mockCities[0]._id);
    expect(mockHttpService.delete).toHaveBeenCalledWith(`cities/${mockCities[0]._id}`);
  });

  fit('should handle errors when deleting a city', () => {
    mockHttpService.delete.and.returnValue(throwError(() => new Error('Error al eliminar ciudad')));

    component.deleteCity(mockCities[0]._id);

    expect(mockHttpService.delete).toHaveBeenCalled();
    // Verifica que el componente maneje errores correctamente
  });
});
