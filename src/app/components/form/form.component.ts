import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CountriesWithCities } from 'src/app/models/countriesWithCities';
import { PopulationService } from 'src/app/services/population.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  countries: CountriesWithCities[] = [];
  cities: string[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';
  registerForm!: FormGroup;
  errorMessages: any = [];
  formSubmitted = false;
  private noNumbersPattern = /^[A-Za-z\s]+$/; // Allow letters (including spaces)
  private destroy$: Subject<void> = new Subject<void>();
  private phoneNumberPattern = /^(\+407\d{8})$/;
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private fb: FormBuilder, private populationService: PopulationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.noNumbersPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.noNumbersPattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      addressLine1: ['', Validators.required],
      addressLine2: '',
      country: ['', Validators.required],
      state: '',
      city: ['', Validators.required]
    });

    this.populationService.getCountries().pipe(takeUntil(this.destroy$)).subscribe((countries) => {
      this.countries = countries.data;
    });
  }

  onCountryChange(): void {
    const selectedCountryData = this.countries.find(
      (country) => country.iso3 === this.selectedCountry
    );
    this.cities = selectedCountryData ? selectedCountryData.cities : [];
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.router.navigate(['thank-you'], { queryParams: { data: JSON.stringify(formData) } });
    } else {
      const errorMessages: any = [];
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control: any = this.registerForm.get(key);
        if (control.invalid) {
          Object.keys(control.errors).forEach((errorKey) => {
            if (errorKey === 'required') {
              errorMessages.push(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
            } else if (errorKey === 'pattern') {
              if (key == "phoneNumber") {
                errorMessages.push(`Wrong phone number format (e.g +40723933319).`);
              }
              if (key == "email") {
                errorMessages.push(`Wrong email format (e.g john@doe.com).`);
              }
              if (key == "firstName" || key == "lastName") {
                errorMessages.push(`You cannot add numbers in your name.Try using only letters.`)
              }
            }
          });
        }
      });
      this.errorMessages = errorMessages;
    }
  }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.registerForm.get(field);
    return control?.hasError('required') || control?.hasError('pattern');
  }

}
