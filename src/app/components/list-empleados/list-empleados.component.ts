import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  // tslint:disable-next-line: variable-name
  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    // Al ser un observable se tiene que suscribir
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = []; // Para dejar vacío el array al empezar
      data.forEach((element: any) => {
        // Ese es el método para traer la data de firebase
        // console.log(element.payload.doc.id; solo id
        // console.log(element.payload.doc.data()); data, pero no id
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    });
  }

  eliminarEmpleado(id: string): void {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      this.toastr.warning('El empleado fue eliminado con éxito!', 'Empleado eliminado', { positionClass: 'toast-top-right' });
    }).catch(error => { console.log('error'); });
  }

}
