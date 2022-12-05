import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { TYPE } from '../post-table/values.constants';
import { Post } from '../publicaciones/post.model';
import { PostService } from '../publicaciones/post.service';
import { Suplemento } from '../publicaciones/suplementos.model';
import { SuplementosService } from '../publicaciones/suplementos.service';

@Component({
  selector: 'app-suplement-sale',
  templateUrl: './suplement-sale.component.html',
  styleUrls: ['./suplement-sale.component.css']
})
export class SuplementSaleComponent implements OnInit {
  form: FormGroup;
  suplemento: Suplemento;
  suplementos: Suplemento[] = [];
  data: Array<string> = [];

  private postsSubs: Subscription;

  constructor(public suplementoService: SuplementosService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.suplementoService.getSupl();
    this.postsSubs = this.suplementoService.getSuplementoUpdateListener()
      .subscribe((suplementos: Suplemento[]) => {
        this.suplementos = suplementos;
      });

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
          this.suplementoService.deleteP(id);
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
