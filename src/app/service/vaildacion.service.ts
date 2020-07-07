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
}