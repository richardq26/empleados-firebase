import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../../services/empleado.service';
@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null; // Es decir string para editar y null para crear
  titulo = 'Agregar empleado';
  accion = 'Agregar';
  // tslint:disable-next-line: variable-name
  constructor(private fb: FormBuilder,
    // tslint:disable-next-line: variable-name
              private _empleadoService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado(): void { // Validamos si está en agregar o editar
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return; // Es decir no lo dejamos pasar
    }
    if (this.id == null){
      this.agregarEmpleado();
    }else{
      // Este this.id lo obtuvimos en el constructor mediante aRoute.snapshot.paramMap
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(): void{
    // Definimos el empleado que enviaremos al firebase como un objeto con los values del
    // createEmpleado que es el formulario recibido
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('El empleado fue registrado con éxito', 'Empleado registrado', { positionClass: 'toast-bottom-right' });
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    });
    console.log(empleado);
  }

  editarEmpleado(id: string): void{
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    };
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con éxtito.', 'Empleado modificado');
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }
  esEditar(): void {
    if (this.id !== null) {
      this.loading = true;
      this.titulo = 'Editar empleado';
      this.accion = 'Editar';
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false,
        // console.log(data.payload.data().nombre); Es lo mismo que
        // console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data().nombre,
          apellido: data.payload.data().apellido,
          documento: data.payload.data().documento,
          salario: data.payload.data().salario,
        });
      });
    }
  }

}
