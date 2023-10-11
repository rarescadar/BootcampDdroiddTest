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
  phoneNumberPattern = /^(\+407\d{8})$/;
  countries: CountriesWithCities[] = [];
  cities: string[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private populationService: PopulationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      email: ['', [Validators.required, Validators.email]],
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
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.router.navigate(['thank-you'], { queryParams: { data: JSON.stringify(formData) } });
    } else {
      alert('Form cannot be submitted. Fix all the errors and try again.')
    }
  }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.registerForm.get(field);
    return control?.touched && (control?.hasError('required') || control?.hasError('pattern'));
  }


}
