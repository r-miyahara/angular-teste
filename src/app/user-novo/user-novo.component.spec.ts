import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-user-novo',
  templateUrl: './user-novo.component.html',
  styleUrls: ['./user-novo.component.scss']
})

export class UserNovoComponent implements OnInit {
  productForm: FormGroup;
  login: String = '';
  avatar_url: String = '';
  type: String = null;
  updated_at: Date = null;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.productForm = this.formBuilder.group({
    'login' : [null, Validators.required],
    'avatar_url' : [null, Validators.required],
    'type' : [null, Validators.required]
  });
  }

  addUser(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUser(form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/user-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
