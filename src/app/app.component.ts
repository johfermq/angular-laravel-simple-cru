import { Component } from '@angular/core';

/** Interfaces */
import { UserI, UserStoredI } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Insoftar Angular';
  userEdit: UserI;
  userStored: UserStoredI;

  constructor() {}

  userUpdate(user: UserI) {
    this.userEdit = user;
  }

  userSaved(user: UserStoredI) {
    this.userStored = user;
  }
}
