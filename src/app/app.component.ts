import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'forms';

  myform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myform = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(6)]),
      DOB: this.fb.control(''),
      passwordvisibility: this.fb.control(''),
      address: this.fb.array([
        this.fb.group({
          doorno: ['', Validators.required],
          street: ['', Validators.required]
        })
      ])
    });

  }

  // myform = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(6)]),
  //   DOB: new FormControl(''),
  //   passwordvisibility: new FormControl(''),

  //   address: new FormArray([
  //     new FormControl('add1'),
  //     new FormControl('add2')
  //   ]),
  // });


  getAddressFormArray() {
    return this.myform.get('address') as FormArray;

  }

  addForm() {
    this.getAddressFormArray().push(this.fb.group({
      doorno: ['', Validators.required],
      street: ['', Validators.required]
    }));
    // this.getAddressFormArray().push(new FormControl('add'))
    this.myform.valueChanges.subscribe((res) => {
      console.log(res);
    })
  }
  removeForm(index: number) {
    this.getAddressFormArray().removeAt(index, {
      emitEvent: true
    })
  }
  submitform() {
    if (this.myform.invalid) {
      window.alert('pls fill this field')
    };
    console.log((this.myform.valid));
    console.log(this.myform.value);


  }

  // .................Template Driven Forms...............

  mydata = {
    FirstName: '',
    password1: '',
    PhoneNumber: '',
    pwd: '',
    skill: [{
      writing: ''
    }]
  };

  addSkill() {
    this.mydata.skill.push({ writing: '' });
  };
  removeSkill(index: any) {
    this.mydata.skill.splice(index);
  };
  show: boolean = false;
  password() {
    this.show = !this.show

  };
  submitdata() {
    window.alert('submission completed')

  }


}
