import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Post } from '../publicaciones/post.model';
import { PostService } from '../publicaciones/post.service';
import { Subscription } from "rxjs";
import {Injectable} from "@angular/core"
import { HtmlParser } from "@angular/compiler";
import { Title } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import Swal from 'sweetalert2';
import { TYPE } from './values.constants';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import {PdfMakeWrapper, Txt, Img}from 'pdfmake-wrapper';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit, OnDestroy{

  saludo = "Ejemplo de como hacer un codigo QR con QR Code Generator";
  tipoElemento = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  valor: string = "www.refactorizando.blog";

  posts: Post[] = [];
  private postsSubs: Subscription;
  post: Post;
  imagePreview: string;

  constructor(public postsService: PostService, public route: ActivatedRoute){
  }
  displayedColumns: string[] = ['imagen', 'nombre', 'suscripcion', 'direccion',
  'fechaInicio', 'fechaFin', 'manipulacion', 'QR'];


  ngOnInit(){
    this.postsService.getPosts();
  this.postsSubs = this.postsService.getPostsUpdateListener()
  .subscribe((posts: Post[])=>{
    this.posts = posts;
  });
  }



  ngOnDestroy(){
    this.postsSubs.unsubscribe();
  }

  onDelete(id: string){
    this.postsService.deleteP(id);
  }

  Createpfd(id: string){
    const pdf = new PdfMakeWrapper;
    this.postsService.getPosts();
    this.postsSubs = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {


        this.postsService.getPost(id).subscribe(postData => {

          this.post = {
            id: postData._id,
            nombre: postData.nombre,
            suscripcion: postData.suscripcion,
            direccion: postData.direccion,
            fechaInicio: postData.fechaInicio,
            fechaFin: postData.fechaFin,
            imagePath: postData.imagePath

          };
          console.log(this.post)
          this.imagePreview = postData.imagePath;



        });




    })
  }
  async options(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning',
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showCloseButton: true,
        title: 'ELIMINAR',
        text: 'Seguro de eliminar el registro?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false,
        confirmButtonColor: '#0000FF'
      })
      .then((result) => {
        if (result.value) {
          this.postsService.deleteP(id);
          this.toast()
          return;
        }
        console.log('cancel');
      });
  }

  toast(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 4000,
      title: 'Elemento borrado correctamente',
    });
  }
}
