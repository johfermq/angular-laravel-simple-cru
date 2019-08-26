import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

/** Servicios */
import { UserService } from './../../services/user.service';

/** Interfaces */
import { UserI, UserStoredI, UserStoredType } from './../../interfaces/user.interface';
import { MessageI, MessageType } from './../../interfaces/message.interface';

/** Class */
import { Errors } from './../../class/errors';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  subscription: Subscription;
  loading: boolean;
  message: MessageI|null;
  errors: Errors;
  userIdEdit: number|null;
  @Output() userSaved = new EventEmitter<UserStoredI>();
  @Input('userEdit') set userEdit(userEdit: UserI) {
    if (userEdit) {
      this.reset();
      this.userIdEdit = userEdit.id;
      this.userForm.patchValue(userEdit);
    }
  }

  constructor(public userService: UserService)
  {
    this.subscription = new Subscription();
    this.loading = false;
    this.userIdEdit = null;
    this.errors = new Errors();
    this.newForm();
  }

  ngOnInit() {}

  newForm() {
    this.userForm = new FormGroup({
      cedula: new FormControl('', [
        Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('[0-9]*')
      ]),
      nombres: new FormControl('', [
        Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')
      ]),
      apellidos: new FormControl('', [
        Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')
      ]),
      correo: new FormControl('', [
        Validators.required, Validators.email, Validators.maxLength(50)
      ]),
      telefono: new FormControl('', [
        Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('[0-9]*')
      ])
    });
  }

  save() {
    if (this.userForm.valid) {
      this.loading = true;

      if (this.userIdEdit) {
        this.subscription.add(
          this.userService.update(this.userForm.value, this.userIdEdit).subscribe(
            (user: UserI) => {
              this.reset();
              this.userSaved.emit({ user, type: UserStoredType.updated });
              this.loading = false;
              this.message = {
                body: `¡El usuario ha sido actualizado correctamente!`,
                type: MessageType.success,
              }
            },
            error => {
              this.loading = false;
              if (error.status === 422) {
                if (error.error.errors) this.errors.record(error.error.errors);
              } else {
                console.error(error)
                this.message = {
                  body: `¡Error al actualizar el usuario!`,
                  type: MessageType.error,
                }
              }
            },
          )
        );
      }
      else {
        this.subscription.add(
          this.userService.store(this.userForm.value).subscribe(
            (user: UserI) => {
              this.reset();
              this.userSaved.emit({ user, type: UserStoredType.created });
              this.loading = false;
              this.message = {
                body: `¡El usuario ha sido guardado correctamente!`,
                type: MessageType.success,
              }
            },
            error => {
              this.loading = false;
              if (error.status === 422) {
                if (error.error.errors) this.errors.record(error.error.errors);
              } else {
                console.error(error)
                this.message = {
                  body: `¡Error al guardar el usuario!`,
                  type: MessageType.error,
                }
              }
            },
          )
        );
      }
    };
  }

  reset() {
    this.userForm.reset();
    this.loading = false;
    this.userIdEdit = null;
    this.message = null;
    this.errors.clear();
  }

  get cedula() {
    return this.userForm.get('cedula');
  }

  get nombres() {
    return this.userForm.get('nombres');
  }

  get apellidos() {
    return this.userForm.get('apellidos');
  }

  get correo() {
    return this.userForm.get('correo');
  }

  get telefono() {
    return this.userForm.get('telefono');
  }

  existsErrors(field) {
    return field.invalid && (field.dirty || field.touched);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
