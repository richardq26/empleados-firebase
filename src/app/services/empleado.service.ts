import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }
  // Aquí agregamos el empleado a la bd en firebase
  agregarEmpleado(empleado: any): Promise<any> {
    // Va a agregar el objeto empleado a la colección empleados
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any> {
    // El snapshotChanges muestra los cambios en tiempo real
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data: any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data);
  }
}
