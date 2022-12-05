import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import { Postcreatecomponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { PostService } from './publicaciones/post.service';
import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Moment } from 'moment';

import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderTbComponent } from './header-tb/header-tb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionAccountComponent } from './administracion-account/administracion-account.component';
import { SuplementSaleComponent } from './suplement-sale/suplement-sale.component';
import { ExerciseMachineComponent } from './exercise-machine/exercise-machine.component';
import { ExerciseRoutinesComponent } from './exercise-routines/exercise-routines.component';
import { PostTableComponent } from './post-table/post-table.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CardComponent } from './card/card.component';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgxQRCodeModule}  from '@techiediaries/ngx-qrcode';
import { ViewQrComponent } from './view-qr/view-qr.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { SafePipe } from './view-qr/safe.pipe';
import { PostCreateSuplComponent } from './publicaciones/post-create-supl/post-create-supl.component';
import {PdfMakeWrapper}from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TicketComponent } from './ticket/ticket.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { InformacionComponent } from './informacion/informacion.component'; // pdfmake default fonts

PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderTbComponent,
    Postcreatecomponent,
    PostListComponent,
    AdministracionAccountComponent,
    SuplementSaleComponent,
    ExerciseMachineComponent,
    ExerciseRoutinesComponent,
    PostTableComponent,
    RadioButtonComponent,
    CardComponent,
    InicioComponent,
    FooterComponent,
    SpinnerComponent,
    ViewQrComponent,
    SafePipe,
    PostCreateSuplComponent,
    TicketComponent,
    EntrenamientoComponent,
    InformacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatSidenavModule,
    NgbModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    MatMenuModule,
    FontAwesomeModule,
    NgxQRCodeModule,
    NgxScannerQrcodeModule,


  ],
  providers: [
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
