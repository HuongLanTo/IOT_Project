import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userList: any;
  public filter = {}
  public currentUser = 'lan';
  private currentPage: number = 1;
  private show
  
  constructor() { }

  ngOnInit(): void {
  }

}
