import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

multiplo( control: FormControl ): {[s:string]: boolean} {
    
    if ( control.value > 0 && control.value % 5 == 0 ) { 
        return null;        
    }
    return { multiplo: true }
  }
  passwordsIguales( passw1: string, passw2: string){
    return ( form: FormGroup) => {
    const passw1Control = form.controls[passw1];
    const passw2Control = form.controls[passw2];

    if(passw1Control.value === passw2Control.value){
      passw2Control.setErrors(null);
    } else {
      passw2Control.setErrors({ noEsigual: true});
    }
  }
}
}