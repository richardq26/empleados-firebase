import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }
  // Aquí agregamos el empleado a la bd en firebase
  agregarEmpleado(empleado: any): Promise<any>{
    // Va a agregar el objeto empleado a la colección empleados
    return this.firestore.collection('empleados').add(empleado);
  }
}
