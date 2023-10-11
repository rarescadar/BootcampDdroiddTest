import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterForm } from 'src/app/models/registerForm';

@Component({
  selector: 'app-finalpage',
  templateUrl: './finalpage.component.html',
  styleUrls: ['./finalpage.component.scss']
})
export class FinalpageComponent {
  formData!: RegisterForm;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.formData = JSON.parse(params.data);
      }
    });
  }
}
