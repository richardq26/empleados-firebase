import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  // tslint:disable-next-line: variable-name
  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService, private router: Router) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  agregarEmpleado(): void {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return; // Es decir no lo dejamos pasar
    }
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

    this._empleadoService.agregarEmpleado(empleado).then(() => {
      console.log('Empleado registrado');
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
    });
    console.log(empleado);
  }

}
