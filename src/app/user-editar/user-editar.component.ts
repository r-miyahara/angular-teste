import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-user-editar',
  templateUrl: './user-editar.component.html',
  styleUrls: ['./user-editar.component.scss']
})
export class UserEditarComponent implements OnInit {
  id: String = '';
  productForm: FormGroup;
  login: String = '';
  avatar_url: String = '';
  type: String = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
   'login' : [null, Validators.required],
   'avatar_url' : [null, Validators.required],
   'type' : [null, Validators.required]
 });
 }

 getUser(id) {
  this.api.getUser(id).subscribe(data => {
    this.id = data.id;
    this.productForm.setValue({
      login: data.login,
      avatar_url: data.avatar_url,
      type: data.type
    });
  });
}

updateUser(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateUser(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/user-detalhe/' + this.id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}
