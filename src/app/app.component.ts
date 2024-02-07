import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'forms';

  myform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(6)]),
    DOB: new FormControl(''),
    passwordvisibility: new FormControl(''),
    // skills: new FormArray([
    //   new FormControl('add1'),
    //   new FormControl('add2'),
    // ]),
    address: new FormArray([
      new FormControl('add1'),
      new FormControl('add2')
    ]),
  });

  // getSkillsFromArray(){
  //  return this.myform.get('skills') as FormArray;
  // }
  getAddressFormArray() {
    return this.myform.get('address') as FormArray;

  }
  // addform(){
  //   this.getSkillsFromArray().push(new FormControl('add'))
  // }
  addForm() {
    this.getAddressFormArray().push(new FormControl('add'))
    this.myform.valueChanges.subscribe((res) => {
      console.log(res);
    })
  }
  // removeForm(index:number){
  //   this.getSkillsFromArray().removeAt(index)
  // }
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
