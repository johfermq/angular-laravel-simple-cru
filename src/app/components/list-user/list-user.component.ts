import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

/** Servicios */
import { UserService } from './../../services/user.service';

/** Interfaces */
import { UserI, UserStoredI, UserStoredType } from './../../interfaces/user.interface';
import { MessageI, MessageType } from './../../interfaces/message.interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, OnDestroy {

  users: UserI[];
  subscription: Subscription;
  loading: boolean;
  message: MessageI|null;
  @Output() userEdit = new EventEmitter<UserI>();
  @Input('userStored') set userStored(userStored: UserStoredI) {
    this.updateUsers(userStored);
  }

  constructor(public userService: UserService)
  {
    this.users = [];
    this.loading = true;
    this.subscription = this.userService.index().subscribe(
      (users: UserI[]) => {
        this.users = users;
        this.message = null;
      },
      error => {
        console.error(error)
        this.message = {
          body: `¡Error al cargar los usuarios!`,
          type: MessageType.error,
        }
      },
      () => this.loading = false,
    );
  }

  ngOnInit() {}

  edit(user: UserI) {
    this.userEdit.emit(user);
  }

  updateUsers(userStored: UserStoredI) {
    if (userStored) {
      const { user, type } = userStored;

      if (type === UserStoredType.created) {
        this.users = [...this.users, user].sort((a, b) => a.nombres.localeCompare(b.nombres));
      } else {
        const index = this.users.findIndex(item => item.id == user.id);
        this.users[index] = user;
      };
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
