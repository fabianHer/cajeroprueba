import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url="https://cajero-backend.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

login(usuario: UsuarioModel){
  const data={
    clave: usuario.clave,
    cedula: usuario.cedula    
  }
  return this.httpClient.post<any>(`${this.url}login.php`,JSON.stringify(data));

}
  verCuentas(){
    return this.httpClient.get(`${this.url}verCuentas.php`)
    .pipe(
      map(res =>{
           return res
      }));
  }
  verCuentasF(){
    return this.httpClient.get(`${this.url}verCuentasF.php`)
    .pipe(
      map(res =>{
           return res
      }));
  }
  retirar(monto: number, retiro: any){
    const data={
      monto: monto,
      idcuenta: retiro    
    }    
    return this.httpClient.post<any>(`${this.url}retirar.php`,JSON.stringify(data));
  }
  consignar(monto: number, retiro: any){
    const data={
      monto: monto,
      idcuenta: retiro    
    }    
    return this.httpClient.post<any>(`${this.url}consignar.php`,JSON.stringify(data));
  } 

  traerFun(){
    return this.httpClient.get(`${this.url}traerFunciones.php`)
    .pipe(
      map( (res: any[])=>{
        return res.map( fundaciones =>({ nombre: fundaciones.nombrebanco,codigo: fundaciones.idbanco })
      )
    })
  );
 }
 traerBancos(idcuenta: number){
  const data={
    idcuenta: idcuenta
  }    
  console.log(data);
  return this.httpClient.post(`${this.url}traerBancos.php`,JSON.stringify(data))
  .pipe(
    map( (res: any[])=>{
      return res.map( bancos =>({ nombre: bancos.idcuenta+"-"+bancos.nombrebanco,codigo: bancos.idcuenta })
    )
  })
);
}
 donar(datos: any,cuentauso :any){ 
  const data={
    monto: datos.montoDonacion,
    idcuenta: datos.fundacion,
    cuentadonacion: cuentauso   
  }   
  console.log(data); 
  return this.httpClient.post<any>(`${this.url}donar.php`,JSON.stringify(data));
 }
 transferir(datos: any,cuentauso :any){
  const data={
    monto: datos.montotransferencia,
    idcuentatransferir: datos.banco,
    cuentadonacion: cuentauso.idcuenta,
    idbanco: cuentauso.idbanco
  }
  console.log(data);
  return this.httpClient.post<any>(`${this.url}transferir.php`,JSON.stringify(data));

 }
 eliminarCuenta(idcuenta: number){
  const data={
    idcuenta: idcuenta
  }    
  console.log(data);
  return this.httpClient.post<any>(`${this.url}eliminarCuenta.php`,JSON.stringify(data));
 }
 solicitarClave(datos: any, idusuario: number){
  const data= {
      passw1: datos.passw1,
      passw2: datos.passw2,
      clave: datos.clave,
      idusuario: idusuario
   }
   console.log(data);
  return this.httpClient.post<any>(`${this.url}solicitarClave.php`,JSON.stringify(data));
 }
}