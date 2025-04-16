import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {

  users: any[] = [];

  myForm: FormGroup = new FormGroup({
    "userName": new FormControl('', Validators.required),
    "userSurname": new FormControl('', Validators.required)
  });;

  constructor() {
    this.onreInitForm();
  }

  onSubmit() {
    this.users.push(this.myForm.getRawValue());
  }

  onreInitForm() {
    this.myForm = new FormGroup({
      "userName": new FormControl('', Validators.required),
      "userSurname": new FormControl('', Validators.required)
    });
  }
}
