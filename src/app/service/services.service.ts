import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  //url="https://cajero-backend.herokuapp.com/";
  //url ="http://localhost/cajero/";
  //url ="https://cajeroback.netlify.app/";
  //url = "https://vercel.com/yersonrincons-projects/cajero/";
   url = "https://cajero-theta.vercel.app/api/";
   

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
      idCuenta: retiro    
    }    
    return this.httpClient.post<any>(`${this.url}retirar.php`,JSON.stringify(data));
  }
  consignar( monto: number, retiro: any){
    const data={
      monto: monto,
      idCuenta: retiro    
    }    
    console.log(data)
    return this.httpClient.post<any>(`${this.url}consignar.php`,JSON.stringify(data));
  } 

  traerFun(){
    return this.httpClient.get(`${this.url}traerFunciones.php`)
    .pipe(
      map( (res: any[])=>{
        return res.map( fundaciones =>({ nombre: fundaciones.idCuenta+"-"+fundaciones.nombreBanco,codigo: fundaciones.idBanco/*idCuenta*/ })
      )
    })
  );
 }
 traerBancos(idCuenta: number){
  const data={
    idCuenta: idCuenta
  }    
  console.log('respuesta',data);
  return this.httpClient.post(`${this.url}traerBancos.php`,JSON.stringify(data))
  .pipe(
    map( (res: any[])=>{
      return res.map( bancos =>({ nombre: bancos.idCuenta+"-"+bancos.nombreBanco,codigo: bancos.idCuenta })
    )
  })
);
}
 donar(datos: any,cuentauso :any){ 
   
  /*const data={
    monto: datos.montoDonacion,
    idCuentafundacion: datos.fundacion,
    cuentadonacion: cuentauso.idCuenta   
  }   */
  const data={
    monto: datos.montoDonacion,
    idCuenta: datos.fundacion,
    idCuentaDonacion: cuentauso.idCuenta   
  }   
  console.log(data); 
  return this.httpClient.post<any>(`${this.url}donar.php`,JSON.stringify(data));
 }
 transferir(datos: any,cuentauso :any){
  const data={
    monto: datos.montotransferencia,
    idCuentaTransferir: datos.banco,
    cuentaDonacion: cuentauso.idCuenta,
    idBanco: cuentauso.idBanco
  }
  console.log('fad',data);
  return this.httpClient.post<any>(`${this.url}transferir.php`,JSON.stringify(data));

 }
 eliminarCuenta(idCuenta: number){
  const data={
    idCuenta: idCuenta
  }    
  console.log(data);
  return this.httpClient.post<any>(`${this.url}eliminarCuenta.php`,JSON.stringify(data));
 }
 solicitarClave(datos: any, idusuario: number){
  const data= {
      passw1: datos.passw1,
      passw2: datos.passw2,
      idUsuario: idusuario,
      clave: datos.clave
     
   }
   console.log(data);
  return this.httpClient.post<any>(`${this.url}solicitarClave.php`,JSON.stringify(data));
 }
}