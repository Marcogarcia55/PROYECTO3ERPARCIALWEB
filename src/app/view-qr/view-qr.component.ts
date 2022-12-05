import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { NgxScannerQrcodeService, SelectedFiles } from 'ngx-scanner-qrcode';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from '../publicaciones/post.service';
import { Post } from '../publicaciones/post.model';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { style } from '@angular/animations';

@Component({
  selector: 'app-view-qr',
  templateUrl: './view-qr.component.html',
  styleUrls: ['./view-qr.component.css']
})
export class ViewQrComponent implements OnChanges, OnInit {

  @ViewChild('card') cardv: ElementRef;
  @ViewChild('button') buttonCard: ElementRef;
  @ViewChild('butto2') buttonCard2: ElementRef;
  @ViewChild('label') labelv: ElementRef;



  form: FormGroup;

  public config: Object = {
    isAuto: true,
    text: { font: '25px serif' }, // Hiden { font: '0px', bottom: 40 },
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment', // Front and back camera { facingMode: front ? "user" : "environment" }
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }
  };

  public selectedFiles: SelectedFiles[] = [];
  cssUrl: string;

  post: Post;
  posts: Post[] = [];
  private id: string;
  imagePreview: string;
  nombre: string;
  data: Array<string> = [];
  txt: string;
  d: String;


  constructor(private qrcode: NgxScannerQrcodeService, public postService: PostService, public route: ActivatedRoute,
    private render2: Renderer2, private render3: Renderer2) {



  }

  change(): void {
    const elementCardButton = this.buttonCard.nativeElement;
    console.log(elementCardButton)
    this.render2.setStyle(elementCardButton, 'visibility', 'hidden')

  }

  change2() {
    const elementBut = this.buttonCard2.nativeElement;
    console.log(elementBut);
    this.render2.setStyle(elementBut, 'visibility', 'visible')
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
    this.txt = document.getElementById("txt").textContent.toString();
    console.log("this.txt");
  }

  ngOnInit(): void {



  }

  cambio(value: string) {
    this.txt = document.getElementById("txt").textContent.toString();
    console.log(value);
  }

  onSavePost() {
    const elementLabel = this.labelv.nativeElement;
      console.log(elementLabel)
    if (document.getElementById("txt").textContent.toString().length == 2) {

      this.render2.setStyle(elementLabel, 'visibility', 'visible')
    }else{

      this.render2.setStyle(elementLabel, 'visibility', 'hidden')
    }

    this.d = document.getElementById("txt").textContent.toString().substring(1,4);
    console.log(this.d)

    if (document.getElementById("txt").textContent.toString().length !== 2 &&
        this.d == '638') {
      console.log('this.txt')
      this.txt = document.getElementById("txt").textContent.toString();
      console.log(this.txt)
      this.txt = this.txt.substring(1, 25);
      this.route.paramMap.subscribe((paramMap: ParamMap) => {

        this.id = this.txt;
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

          this.data.push(this.post.id)
          this.data.push(this.post.nombre)
          this.data.push(this.post.suscripcion)
          this.data.push(this.post.direccion)
          this.data.push(this.post.fechaInicio)
          this.data.push(this.post.fechaFin)
          this.data.push(this.post.imagePath)

          console.log(this.txt)

          this.imagePreview = postData.imagePath;



        });


        const elementCard = this.cardv.nativeElement;
        console.log(elementCard)
        this.render2.setStyle(elementCard, 'visibility', 'visible')



      })
    }else{

      this.render2.setStyle(elementLabel, 'visibility', 'visible')

    }

    this.data.splice(0)
  }



}
