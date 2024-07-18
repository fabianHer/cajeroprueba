import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { ServicesService } from '../../service/services.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ValidadoresService } from '../../service/vaildacion.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {
  cuentas: any = [];
  cuentasF: any = [];
  cuentaUso: any =[];
  montoRetirado: number;
  montoConsignado: number;
  modalRef: BsModalRef;
  forma: FormGroup;
  message = false;
  message1 = false;
  message2 = false;
  message3 = false;
  comentario: any;
  fundaciones: any = [];
  bancos: any = [];
  cedula: number;

  constructor(private userCuentas: ServicesService,private modalService: BsModalService,private fb: FormBuilder,private validador: ValidadoresService,private activaruta: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCuentas(); 
    this.cargarCuentasF();
    this.activaruta.params.subscribe( params => {
    this.cedula =params['cedula'];
    console.log(this.cedula);
    });
  }
  cargarCuentas(){
    this.userCuentas.verCuentas().subscribe(respuesta=>{
    console.log(respuesta);
    this.cuentas=respuesta;   
    });
  }
  cargarCuentasF(){
    this.userCuentas.verCuentasF().subscribe(respuesta=>{
    console.log(respuesta);
    this.cuentasF=respuesta;   
    });
  }
  
  crearFormularioRetiro(){
    this.forma = this.fb.group({    
     monto: ['',  [Validators.required, this.validador.multiplo]]
    });
   }
   crearFormularioConsignar(){
    this.forma = this.fb.group({    
     montoConsignar: ['',  [Validators.required]]
    });
   }
   crearFormularioDonar(){
    this.forma = this.fb.group({  
      fundacion: ['',  [Validators.required]], 
      montoDonacion: ['',  [Validators.required]]
    });
   }
   crearFormularioTransferencia(){
    this.forma = this.fb.group({  
      banco: ['',  [Validators.required]], 
      montotransferencia: ['',  [Validators.required]]
    });
   }
   creaFormularioClave(){
    this.forma = this.fb.group({ 
    passw1  : ['',  Validators.required],
    passw2  : ['',  Validators.required],    
    clave   : ['',  Validators.required],    
  },{
    validators: this.validador.passwordsIguales('passw1', 'passw2')
  });
   }
  get montoNoValido(){
    return this.forma.get('monto').invalid && this.forma.get('monto').touched;
   }
  get montoNoValidoConsignar() {
    return this.forma.get('montoConsignar').invalid && this.forma.get('montoConsignar').touched;
  }
  get montoNoValidoDonacion() {
    return this.forma.get('montoDonacion').invalid && this.forma.get('montoDonacion').touched;
  }
  get noFundacion() {
    return this.forma.get('fundacion').invalid && this.forma.get('fundacion').touched;
  }
  get noBanco() {
    return this.forma.get('banco').invalid && this.forma.get('banco').touched;
  }
  get noTransferencia() {
    return this.forma.get('montotransferencia').invalid && this.forma.get('montotransferencia').touched;
  }
  get passw1NoValido() {
    return this.forma.get('passw1').invalid && this.forma.get('passw1').touched;
  }
  get passw2NoValido() {
    const pass1 = this.forma.get('passw1').value;
    const pass2 = this.forma.get('passw2').value;
    return (pass1 === pass2)? false: true;
  }
  get claveNoValida() {
    return this.forma.get('clave').invalid && this.forma.get('clave').touched;
  }
  retirarMonto(){
    console.log('repuesta',this.retirarMonto);
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( respuesta => {
       if( respuesta instanceof FormGroup ){
         Object.values(respuesta.controls).forEach(control => control.markAsTouched());
       } else {
         respuesta.markAsTouched();        
       }
     });
   }
       if(this.forma.status=="VALID"){  
         console.log(this.forma.value.monto); 
         Swal.fire({
          title: 'Esta seguro!!',
          text: 'Esta seguro que desea realizar el retiro',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true
        }).then(respuesta =>{  
          if(respuesta.value){      
         this.userCuentas.retirar(this.forma.value.monto,this.cuentaUso.idCuenta).subscribe(respuesta =>{
          console.log(respuesta);
          if(respuesta =="HECHO"){
            this.modalRef.hide();
            this.cargarCuentas();
            this.message = true;
            this.montoRetirado = this.forma.value.monto;
            setTimeout(() => {
              this.message = false;
            }, 3000);   
            this.crearFormularioRetiro();
          }
         }) 
        } 
        });      
       }
  }
  consignar(){
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( respuesta => {
       if( respuesta instanceof FormGroup ){
         Object.values(respuesta.controls).forEach(control => control.markAsTouched());
       } else {
         respuesta.markAsTouched();        
       }
     });
   }
   if(this.forma.status=="VALID"){  
    Swal.fire({
      title: 'Esta seguro!!',
      text: 'Esta seguro que desea realizar la consignación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta =>{
      if(respuesta.value){  
      console.log(this.forma.value.montoConsignar);       
     this.userCuentas.consignar(this.forma.value.montoConsignar,this.cuentaUso.idCuenta).subscribe(respuesta =>{
     console.log(respuesta);
     if(respuesta =="HECHO"){
       this.modalRef.hide();
       this.cargarCuentas();
       this.message1 = true;
       this.montoConsignado = this.forma.value.montoConsignar;
       setTimeout(() => {
         this.message1 = false;
       }, 3000);   
       this.crearFormularioConsignar();
     }
    })
  }
  });
  }
  }
  donar(){
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( respuesta => {
       if( respuesta instanceof FormGroup ){
         Object.values(respuesta.controls).forEach(control => control.markAsTouched());
       } else {
         respuesta.markAsTouched();        
       }
     });
   }
   if(this.forma.status=="VALID"){  
    console.log(this.forma.value); 
    Swal.fire({
      title: 'Esta seguro!!',
      text: 'Esta seguro que desea realizar la donación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta =>{    
      if(respuesta.value){   
    this.userCuentas.donar(this.forma.value,this.cuentaUso).subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta =="HECHO"){
        this.modalRef.hide();
        this.cargarCuentas();
        this.cargarCuentasF();
        this.message2= true;
        this.montoConsignado = this.forma.value.montoDonacion;
        setTimeout(() => {
          this.message2 = false;
        }, 3000);   
        this.crearFormularioDonar();
      }
     })
    }
    });
  }
  }
  eliminarCuenta(cuenta: any){
    Swal.fire({
      title: 'Esta seguro!!',
      text: `Esta seguro que desea eliminar la cuenta ${cuenta.idCuenta}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta =>{
      if(respuesta.value){      
       this.userCuentas.eliminarCuenta(cuenta.idCuenta).subscribe(respuesta =>{
        Swal.fire({
          title: cuenta.idCuenta,
          text: 'Se elimino corectamente',
          icon: 'success'
        });
        this.cargarCuentas();
       });
      }
    });
  }
  transferir(){
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( respuesta => {
       if( respuesta instanceof FormGroup ){
         Object.values(respuesta.controls).forEach(control => control.markAsTouched());
       } else {
         respuesta.markAsTouched();        
       }
     });
   }
   if(this.forma.status=="VALID"){  
    console.log(this.forma.value);
    Swal.fire({
      title: 'Esta seguro!!',
      text: 'Esta seguro que desea realizar la transferencia',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta =>{
      if(respuesta.value){  
    this.userCuentas.transferir(this.forma.value,this.cuentaUso).subscribe(respuesta =>{
   
      if(respuesta[2] =="descuento"){
        this.modalRef.hide();
        this.cargarCuentas();
        this.message3= true;
        this.comentario = " y se ha descontado $" + respuesta[3];
        this.montoConsignado = this.forma.value.montotransferencia;
        setTimeout(() => {
          this.message3 = false;
        }, 10000);   
        this.crearFormularioTransferencia();
      }else{
        this.modalRef.hide();
        this.cargarCuentas();
        this.message3= true;        
        this.montoConsignado = this.forma.value.montoTransferencia;
        setTimeout(() => {
          this.message3 = false;
        }, 3000);   
        this.crearFormularioTransferencia();
      }
     })
     }
    });
  }
  }
  SolicitarClave(){
    console.log(this.forma.status);
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( respuesta => {
       if( respuesta instanceof FormGroup ){
         Object.values(respuesta.controls).forEach(control => control.markAsTouched());
       } else {
         respuesta.markAsTouched();        
       }
     });
   }
   if(this.forma.status=="VALID"){  
    console.log(this.forma.value);
    Swal.fire({
      title: 'Esta seguro!!',
      text: 'Esta seguro que desea realizar la solicitud de clave',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta =>{
      if(respuesta.value){  
    this.userCuentas.solicitarClave(this.forma.value,this.cedula).subscribe(respuesta =>{
    console.log(respuesta);
    if(respuesta =='OK'){
     Swal.fire({
          icon: 'success',          
          title: 'Se actualizo corectamente',          
          showConfirmButton: false,
          timer: 1500
        });
        this.closeModalClave();
     }else if(respuesta =='MAS DE DOS INTENTOS'){
      Swal.fire({        
        title: 'Ya lleva mas de dos intentos, debe intentar mañana',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
       
      });
      this.closeModalClave();
     }else if(respuesta == 'CLAVE ERRADA'){
      Swal.fire({
        icon: 'error',
        title: 'La clave digitada no existe',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
     }
     })
     }
    });
  }
  }
  openModalRetiro(templateRetiro: TemplateRef<any>, cuenta:any) {
    this.crearFormularioRetiro(); 
    this.modalRef = this.modalService.show(templateRetiro);
    this.cuentaUso = cuenta;
  }
  openModalConsignacion(templateConsignacion: TemplateRef<any>, cuenta:any) {
    this.crearFormularioConsignar();
    this.modalRef = this.modalService.show(templateConsignacion);
    this.cuentaUso = cuenta;
    console.log(this.cuentaUso)
  } 
  openModalDonacion(templateDonacion: TemplateRef<any>, cuenta:any) {
    this.traerFundaciones();
    this.crearFormularioDonar();
    this.modalRef = this.modalService.show(templateDonacion);
    this.cuentaUso = cuenta;
  }  
  openModalTransferencia(templateTransferencia: TemplateRef<any>, cuenta:any){
    this.traerBancos(cuenta);
    this.crearFormularioTransferencia();
    this.modalRef = this.modalService.show(templateTransferencia);
    this.cuentaUso = cuenta;
  }
  openModalClave(templateClave: TemplateRef<any>){
    this.creaFormularioClave();
    this.modalRef = this.modalService.show(templateClave);
  }
  closeRetiro(): void {
    this.modalRef.hide();
    this.crearFormularioRetiro();
  }
  closeConsignacion(): void {
    this.modalRef.hide();
    this.crearFormularioConsignar();
  }
  closeModalDonacion(): void {
    this.modalRef.hide();
    this.crearFormularioDonar();
   
  }
  closeModalConsulta(): void {
    this.modalRef.hide();
    
  }
  closeModalTransferir(): void{
    this.modalRef.hide();
  }
  closeModalClave(): void{
    this.modalRef.hide();
  }
  traerFundaciones(){
    this.userCuentas.traerFun().subscribe(fundaciones => {
      this.fundaciones = fundaciones;
      this.fundaciones.unshift({
        nombre: 'Seleccione Fundacion',
        codigo: ''
      })
      console.log(fundaciones);
    });
  }
  traerBancos(cuenta){
    this.userCuentas.traerBancos(cuenta.idCuenta).subscribe(bancos => {
      this.bancos = bancos;
      this.bancos.unshift({
        nombre: 'Seleccione Banco',
        codigo: ''
      })
      console.log(bancos);
    });
  }
}
