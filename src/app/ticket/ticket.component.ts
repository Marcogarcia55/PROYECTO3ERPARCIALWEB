import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Post } from '../publicaciones/post.model';
import { PostService } from '../publicaciones/post.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  post: Post;
  posts: Post[] = [];
  private id: string;
  imagePreview: string;
  nombre: string;
  data: Array<string> = [];
  txt: string;
  d: String;
  postsSubs: any;

  saludo = "Ejemplo de como hacer un codigo QR con QR Code Generator";
  tipoElemento = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  valor: string = "www.refactorizando.blog";

  constructor(public postsService: PostService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSubs = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.postsService.getPost(this.id).subscribe(postData => {

          this.post = {
            id: postData._id,
            nombre: postData.nombre,
            suscripcion: postData.suscripcion,
            direccion: postData.direccion,
            fechaInicio: postData.fechaInicio,
            fechaFin: postData.fechaFin,
            imagePath: postData.imagePath

          };

          this.data.push(this.post.id)
          this.data.push(this.post.nombre)
          this.data.push(this.post.suscripcion)
          this.data.push(this.post.direccion)
          this.data.push(this.post.fechaInicio)
          this.data.push(this.post.fechaFin)
          this.data.push(this.post.imagePath)

          this.imagePreview = postData.imagePath;
          console.log(this.post.nombre )


        });



      }
    })
  }

}
