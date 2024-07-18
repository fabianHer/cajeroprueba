import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { ServicesService } from '../../service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 usuario: UsuarioModel = new UsuarioModel();
 message = false;
 cedula: number;
  constructor(private userLogin: ServicesService,private route: Router) { }

  ngOnInit(): void {
  }
login(forma: NgForm){

  if(forma.invalid){ return;}

  this.userLogin.login(forma.value).subscribe(respuesta =>{
  if(respuesta == 'SIN DATOS'){
    console.log(respuesta);
    this.message = true;
    setTimeout(() => {
      this.message = false;
    }, 3000); 
  }else{
    console.log(respuesta);
    console.log(respuesta[0].idUsuario)
    this.usuario = respuesta[0];    
    this.cedula=forma.value.cedula
    this.route.navigate(['/operaciones',respuesta[0].idUsuario]);
  }
  });
}
}
