import {Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{

  posts: Post[] = [];
  private postsSubs: Subscription;
  pos:string;
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

onDelete(id: string){
  this.postsService.deleteP(id);

}

}
