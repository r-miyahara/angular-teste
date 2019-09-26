import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'login', 'avatar', 'type', 'acao'];
  dataSource: User[];
  isLoadingResults = true;
  constructor( private _api: ApiService) { }

  ngOnInit() {
    this._api.getUsers()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
