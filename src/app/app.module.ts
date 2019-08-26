import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

/** Servicios */
import { UserService } from './services/user.service';

/** Componentes */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormUserComponent,
    ListUserComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
