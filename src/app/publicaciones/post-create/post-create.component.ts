import { HtmlParser } from "@angular/compiler";
import { Component, OnChanges, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Post } from "../post.model";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as moment from 'moment'
import { Subscription } from "rxjs";
import { mimeType } from "./mime-type.validator";
import Swal from 'sweetalert2';
import { TYPE } from './values.constants';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

interface tipos {
  value: string;
  viewValue: string;
}

export class AppModule { }
@Component({

  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})


export class Postcreatecomponent implements OnChanges, OnInit {

  saludo = "Ejemplo de como hacer un codigo QR con QR Code Generator";
  tipoElemento = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  valor: string = "";
  form: FormGroup;

  tipo: tipos[] = [
    { value: 'SEMANAL', viewValue: 'SEMANAL' },
    { value: 'MES', viewValue: 'MES' },
    { value: 'ANUAL', viewValue: 'ANUAL' },
    { value: 'VISITA', viewValue: 'VISITA' },

  ];

  day = new Date();

  fecha = moment(this.day).format('DD/MM/yyyy');

  inicio: string;
  fin: string;
  getFormattedDate() {
    this.inicio = this.fecha;

  }

  membresia: string;
  fechaInicio: string;
  fechaFin: string;
  dassas: string;
  id2: string;

  radioFun() {
    return console.log(this.membresia);
  }


  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private id: string;
  post: Post;
  posts: Post[] = [];
  seleccionado: string;
  imagePreview: string;
  val: string;

  private postsSubs: Subscription;

  constructor(public postService: PostService, public route: ActivatedRoute) {

  }


  ngOnInit() {

    this.form = new FormGroup({
      "nombre": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      "direccion": new FormControl(null, {
        validators: [Validators.required]
      }),
      "suscripcion": new FormControl(null, {
        validators: [Validators.required]
      }),
      "image": new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })

    });

    this.postService.getPosts();
    this.postsSubs = this.postService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.postService.getPost(this.id).subscribe(postData => {

          this.post = {
            id: postData._id,
            nombre: postData.nombre,
            suscripcion: postData.suscripcion,
            direccion: postData.direccion,
            fechaInicio: postData.fechaInicio,
            fechaFin: postData.fechaFin,
            imagePath: postData.imagePath

          };

          this.imagePreview = postData.imagePath;
          console.log(this.post.id )
          this.form.patchValue({
            nombre: this.post.nombre,
            direccion: this.post.direccion,
            image: postData.imagePath
          });
          this.seleccionado = this.post.suscripcion;
          this.membresia = this.seleccionado
          this.fecha = this.post.fechaInicio
          this.fin = this.post.fechaFin
          this.imagePreview = this.post.imagePath
          this.val = 'true'
        });



      } else {
        this.mode = 'create';
        this.id = null;
        this.val = 'false'


      }
    })
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

  ngOnChanges(ev: any): void {
    this.membresia = ev.source.selected.viewValue;
    if (this.membresia == 'MES') {
      this.fin = moment(this.day).add(30, 'days').format('DD/MM/yyyy');
    } else if (this.membresia == 'SEMANAL') {
      this.fin = moment(this.day).add(7, 'days').format('DD/MM/yyyy');

    } else if (this.membresia == 'ANUAL') {
      this.fin = moment(this.day).add(12, 'month').format('DD/MM/yyyy');

    } else if (this.membresia == 'VISITA') {
      this.fin = moment(this.day).add(0, 'days').format('DD/MM/yyyy');

    }
    console.log(this.membresia)
  }


  onSavePost() {

    if (this.form.invalid) {

      return;
    }
    if (this.mode == "create") {
      console.log(this.form.value.image)
      this.postService.addPost(this.form.value.nombre, this.membresia, this.form.value.direccion,
        this.inicio, this.fin, this.form.value.image);
        this.show()
      console.log("sii");
    } else {
      this.show()

      this.postService.updatePost(
        this.id,
        this.form.value.nombre,
        this.membresia,
        this.form.value.direccion,
        this.inicio,
        this.fin,
        this.form.value.image

      )
    }

    this.id2 = "ikfjlkdsj"

  }

  show(typeIcon = TYPE.SUCCESS) {
    if(this.val == 'false'){
      Swal.fire({
        title: 'Guardado correctamente',
        text: 'Registro guardado',
        icon: typeIcon,
        confirmButtonText: 'OK',
        preConfirm: () => {},
      });
    }else{
      Swal.fire({
        title: 'Modificado correctamente',
        icon: typeIcon,
        confirmButtonText: 'OK',
        preConfirm: () => {},
      });
    }

  }



}
