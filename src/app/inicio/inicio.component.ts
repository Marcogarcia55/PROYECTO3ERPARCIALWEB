import { Component, OnInit } from '@angular/core';
import { PostService } from '../publicaciones/post.service';
import { Post } from '../publicaciones/post.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  posts: Post[] = [];
  private postsSubs: Subscription;
  constructor(public postsService: PostService){
  }
  ngOnInit(): void {
    this.postsService.getPosts();
  this.postsSubs = this.postsService.getPostsUpdateListener()
  .subscribe((posts: Post[])=>{
    this.posts = posts;
  });
  }

}
