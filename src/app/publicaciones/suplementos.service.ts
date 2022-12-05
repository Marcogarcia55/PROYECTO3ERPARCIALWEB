import { Suplemento } from "./suplementos.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core"
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import mongoose from "mongoose";

@Injectable({ providedIn: 'root' })

export class SuplementosService {
  private suplementos: Suplemento[] = []; //primera matriz
  private suplementoUpdate = new Subject<Suplemento[]>();

  constructor(private http: HttpClient, private router: Router) {

  }
  getSupl() {
    this.http.get<{ message: string, suplementos: any }>('http://localhost:3000/api.suplementos')
      .pipe(map((supData) => {
        return supData.suplementos.map(sup => {
          return {
            marca: sup.marca,
            nombre: sup.nombre,
            descripcion: sup.descripcion,
            precio: sup.precio,
            id: sup._id,
            imagePath: sup.imagePath

          };
        });
      }))
      .subscribe((transformedSup) => {
        this.suplementos = transformedSup,
          this.suplementoUpdate.next([...this.suplementos]);
      });
  }

  getSuplementoUpdateListener() {
    return this.suplementoUpdate.asObservable();
  }

  getPost(id: string) {
    mongoose.Types.ObjectId.isValid(id);
    return this.http.get<{
      _id: string, marca: string, nombre: string,
      descripcion: string, precio: string, imagePath: string
    }>(
      "http://localhost:3000/api.suplementos/" + id);
  }

  addSup(
    marca: string, nombre: string, descripcion: string,
    precio: string, image: File) {

    const supData = new FormData(); //objeto del formulario

    supData.append("marca", marca);
    supData.append("nombre", nombre);
    supData.append("descripcion", descripcion);
    supData.append("precio", precio);
    supData.append("image", image, marca);


    this.http.post<{ message: string, suplemento: Suplemento }>('http://localhost:3000/api.suplementos', supData)
      .subscribe((responseData) => {

        const suplemento: Suplemento = {
          id: responseData.suplemento.id,
          marca: marca,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          imagePath: responseData.suplemento.imagePath
        };
        this.suplementos.push(suplemento);
        this.suplementoUpdate.next([...this.suplementos]);
        this.getSupl();
        this.router.navigate(["/post-table"]);
      });

  }

  updatePost(
    id: string, marca: string, nombre: string, descripcion: string,
    precio: string, image: File | string) {

    let supData: Suplemento | FormData;

    if (typeof (image) === 'object') {
      supData = new FormData();

      supData.append("id", id);

      supData.append("marca", marca);
      supData.append("nombre", nombre);
      supData.append("descripcion", descripcion);
      supData.append("precio", precio);
      supData.append("image", image, nombre);

    } else {
      supData = {
        id: id,
        marca: marca,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api.suplementos/' + id, supData)
      .subscribe(response => {
        const updateSuplemento = [...this.suplementos];
        const oldSupIndex = updateSuplemento.findIndex(p => p.id === id);

        const suplemento: Suplemento = {
          id: id,
          marca: marca,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          imagePath: ""
        }

        this.suplementoUpdate[oldSupIndex] = suplemento;
        this.suplementos = updateSuplemento;
        this.suplementoUpdate.next([...this.suplementos]);
        this.router.navigate(["/suplementos"]);

      });
  }

  deleteP(id: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api.suplementos/' + id)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getSupl();
      });
  }

}
