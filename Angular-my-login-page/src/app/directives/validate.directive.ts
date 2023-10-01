import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[validate]'  //elemente verilecek attribute ismi, 
})
export class ValidateDirective {

  constructor(
    //İnput girdilerini yakalamak için constructorda bir servis üzerinden bunu yapıyoruz
    private el: ElementRef<HTMLInputElement>  //Elementin referansı geleceği için ElementRef isimli bir class vardır. arasına da gelecek elementin tipini verdik.
  ) { }

  checkValidation(){
 
    //validation control
    const isValid= this.el.nativeElement.validity.valid; //true ya da false verecek
    if(isValid){
     this.el.nativeElement.classList.add("is-valid");
     this.el.nativeElement.classList.remove("is-invalid");
    }else{
     this.el.nativeElement.classList.remove("is-valid");
     this.el.nativeElement.classList.add("is-invalid");
 
    
    const divEl:any = document.querySelector(`#${this.el.nativeElement.id}+ .invalid-feedback`);

    divEl.innerHTML=this.el.nativeElement.validationMessage;
    
    }
   
  }

  @HostListener("keyup") keyup(){ //attribute ler sadece eventler ile tetiklenir. validate attribute nu  verdiğimiz tüm elementlerde keyup tetiklenir.
 
   this.checkValidation();
  }

}
