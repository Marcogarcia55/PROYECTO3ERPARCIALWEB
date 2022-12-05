import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../publicaciones/post.model';
import { PostService } from '../publicaciones/post.service';
import { Subscription } from "rxjs";


@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})


export class RadioButtonComponent implements OnInit, OnDestroy{


  posts: Post[] = [];
  private postsSubs: Subscription;
  propiedad: number =+ 1;

  membresia: string;
  tipos: string[] = ["Semanal", "Mensual", "Anual", "Visita"];

  radioFun(){
    return console.log(this.membresia);
  }

  constructor(public postsService: PostService){
  }

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
}
