import { Post } from "./post.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core"
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import mongoose from "mongoose";

@Injectable({ providedIn: 'root' })

export class PostService {
  private posts: Post[] = []; //primera matriz
  private postsUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {

  }
  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api.posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            nombre: post.nombre,
            suscripcion: post.suscripcion,
            direccion: post.direccion,
            fechaInicio: post.fechaInicio,
            fechaFin: post.fechaFin,
            id: post._id,
            imagePath: post.imagePath

          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts,
          this.postsUpdate.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  getPost(id: string) {
    mongoose.Types.ObjectId.isValid(id);
    return this.http.get<{
      _id: string, nombre: string, suscripcion: string,
      direccion: string, fechaInicio: string, fechaFin: string, imagePath: string
    }>(
      "http://localhost:3000/api.posts/" + id);
  }

  addPost(
    nombre: string, suscripcion: string, direccion: string,
    fechaInicio: string, fechaFin: string, image: File) {
    const postData = new FormData(); //objeto del formulario

    postData.append("nombre", nombre);
    postData.append("suscripcion", suscripcion);
    postData.append("direccion", direccion);
    postData.append("fechaInicio", fechaInicio);
    postData.append("fechaFin", fechaFin);
    postData.append("image", image, nombre);

    this.http.post<{ message: string, post: Post }>('http://localhost:3000/api.posts', postData)
      .subscribe((responseData) => {

        const post: Post = {
          id: responseData.post.id,
          nombre: nombre,
          suscripcion: suscripcion,
          direccion: direccion,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          imagePath: responseData.post.imagePath
        };

        this.posts.push(post);
        this.postsUpdate.next([...this.posts]);
        this.getPosts();
        this.router.navigate(["/post-table"]);
      });

  }

  updatePost(
    id: string, nombre: string, suscripcion: string, direccion: string,
    fechaInicio: string, fechaFin: string, image: File | string) {

    let postData: Post | FormData;

    if (typeof (image) === 'object') {
      postData = new FormData();

      postData.append("id", id);

      postData.append("nombre", nombre);
      postData.append("suscripcion", suscripcion)
      postData.append("direccion", direccion)
      postData.append("fechaInicio", fechaInicio)
      postData.append("fechaFin", fechaFin)
      postData.append("image", image, nombre);

    } else {
      postData = {
        id: id,
        nombre: nombre,
        suscripcion: suscripcion,
        direccion: direccion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api.posts/' + id, postData)
      .subscribe(response => {
        const updatePost = [...this.posts];
        const oldPostIndex = updatePost.findIndex(p => p.id === id);

        const post: Post = {
          id: id,
          nombre: nombre,
          suscripcion: suscripcion,
          direccion: direccion,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          imagePath: ""
        }

        updatePost[oldPostIndex] = post;
        this.posts = updatePost;
        this.postsUpdate.next([...this.posts]);
        this.router.navigate(["/post-table"]);

      });
  }

  deleteP(id: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api.posts.delete/' + id)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getPosts();
      });
  }

}
