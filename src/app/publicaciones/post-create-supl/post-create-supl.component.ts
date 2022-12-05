import { HtmlParser } from "@angular/compiler";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Post } from "../post.model";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { SuplementosService } from "../suplementos.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as moment from 'moment'
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { mimeType } from "../post-create/mime-type.validator";
import { TYPE } from "../post-create/values.constants";
import { Suplemento } from "../suplementos.model";
import { MatSidenav } from "@angular/material/sidenav";

interface tipos {
  value: string;
  viewValue: string;
}

export class AppModule { }

@Component({
  selector: 'app-post-create-supl',
  templateUrl: './post-create-supl.component.html',
  styleUrls: ['./post-create-supl.component.css']
})


export class PostCreateSuplComponent implements OnInit {
  form: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create-sp';
  private id: string;
  suplemento: Suplemento;
  suplementos: Suplemento[] = [];
  seleccionado: string;
  imagePreview: string;
  val: string;
  private supSubs: Subscription;
  membresia: string;
  fechaInicio: string;
  fechaFin: string;
  dassas: string;
  id2: string;
  day = new Date();


  tipo: tipos[] = [
    { value: 'SEMANAL', viewValue: 'SEMANAL' },
    { value: 'MES', viewValue: 'MES' },
    { value: 'ANUAL', viewValue: 'ANUAL' },
    { value: 'VISITA', viewValue: 'VISITA' },

  ];

  fecha = moment(this.day).format('DD/MM/yyyy');

  inicio: string;
  fin: string;
  getFormattedDate() {
    this.inicio = this.fecha;

  }


  constructor(public suplementosService: SuplementosService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "marca": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      "nombre": new FormControl(null, {
        validators: [Validators.required]
      }),
      "descripcion": new FormControl(null, {
        validators: [Validators.required]
      }),
      "precio": new FormControl(null, {
        validators: [Validators.required]
      }),
      "image": new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })

    });
    this.suplementosService.getSupl();
    this.supSubs = this.suplementosService.getSuplementoUpdateListener()
      .subscribe((posts: Suplemento[]) => {
        this.suplementos = posts;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editSup';
        this.id = paramMap.get('id');
        this.suplementosService.getPost(this.id).subscribe(supData => {

          this.suplemento = {
            id: supData._id,
            marca: supData.marca,
            nombre: supData.nombre,
            descripcion: supData.descripcion,
            precio: supData.precio,
            imagePath: supData.imagePath

          };

          this.imagePreview = supData.imagePath;
          console.log(this.suplemento.id)
          this.form.patchValue({
            marca: this.suplemento.marca,
            nombre: this.suplemento.nombre,
            descripcion: this.suplemento.descripcion,
            precio: this.suplemento.precio,
            image: supData.imagePath
          });
          this.seleccionado = this.suplemento.marca;

          this.imagePreview = this.suplemento.imagePath
          this.val = 'true'
        });



      } else {
        this.mode = 'create-sp';
        this.id = null;
        this.val = 'false'


      }
    })
  }

  onSavePost() {
    console.log(this.form.value.image)
    if (this.form.invalid) {

      return;
    }
    if (this.mode == "create-sp") {

      this.suplementosService.addSup(this.form.value.marca, this.form.value.nombre, this.form.value.descripcion,
        this.form.value.precio, this.form.value.image);
      this.show()
      console.log("sii");
    } else {
      this.show()

      this.suplementosService.updatePost(
        this.id,
        this.form.value.marca,
        this.form.value.nombre,
        this.form.value.descripcion,
        this.form.value.precio,
        this.form.value.image

      )
    }

    this.id2 = "ikfjlkdsj"

  }
  onImagePicked(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader;
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);



  }

  show(typeIcon = TYPE.SUCCESS) {
    if (this.val == 'false') {
      Swal.fire({
        title: 'Guardado correctamente',
        text: 'Registro guardado',
        icon: typeIcon,
        confirmButtonText: 'OK',
        preConfirm: () => { },
      });
    } else {
      Swal.fire({
        title: 'Modificado correctamente',
        icon: typeIcon,
        confirmButtonText: 'OK',
        preConfirm: () => { },
      });
    }

  }


}
