import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isShowPassword: boolean=false;  //passwordun gözüküp gözükmediğini belirten degiskeni tanımadık
  isPasswordFocus: boolean=false;

constructor(private toastr : ToastrService){

}

  // userNameOrEmail: string =""; //form elementinden aldıugıız için gerek kalmadı
  // password: string="";




  signIn(form:NgForm){  //metod calıstıgında form parametresine ngForm türünde bir deger verilmeli. ngForm angular formlarını işlemek için kullanılan bir sınıfdır.
    if(form.valid){    //form validasyon kurallarına uygunsa 
      console.log(form)
    }else{
      this.toastr.error("Please fill the required places!")

      const userNameOrEmailEl:any=document.getElementById("userNameOrEmail");

      if(!userNameOrEmailEl.validity.valid){
        userNameOrEmailEl.classList.add("is-invalid");
        userNameOrEmailEl.classList.remove("is-valid");
  
        const errorMessage = userNameOrEmailEl.validationMessage;
        const divEl:any = document.querySelector(`#${userNameOrEmailEl.id} + .invalid-feedback`);
        divEl.innerHTML = errorMessage;
      }
      this.isPasswordFocus=true;
    }

   
 
  }

  ShowOrHidePassword(password:HTMLInputElement){
    if(this.isShowPassword){
      this.isShowPassword=false;
      password.type="password";
    }else{
      this.isShowPassword=true;
      password.type="text";
    }
  }



  checkRegexPatternForPassword(el:HTMLInputElement){
    const text= el.value;

    //upperletter control
    const upperCaseRegex = /[A-Z]/;
    const upperCaseResult= upperCaseRegex.test(text);
    const upperLetterEl= document.getElementById("upperLetter");
    upperLetterEl?.classList.add(upperCaseResult? "pw-success" : "pw-error");
    upperLetterEl?.classList.remove(upperCaseResult? "pw-error" : "pw-success");

    //lowerletter control
    const lowerCaseRegex= /[a-z]/;
    const lowerCaseResult=lowerCaseRegex.test(text);
    const lowerLetterEl= document.getElementById("lowerLetter");
    lowerLetterEl?.classList.add(lowerCaseResult? "pw-success":"pw-error");
    lowerLetterEl?.classList.remove(lowerCaseResult? "pw-error":"pw-success");

    //specilletter control
    const specialCaseRegex=/[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?]+/
    const specialCaseResult=specialCaseRegex.test(text);
    const specialLetterEl=document.getElementById("specialLetter");
    specialLetterEl?.classList.add(specialCaseResult? "pw-success": "pw-error");
    specialLetterEl?.classList.remove(specialCaseResult? "pw-error": "pw-success");

    //numeraticletter control
    const numeraticCaseRegex=/[0-9]/;
    const numeraticCaseResult=numeraticCaseRegex.test(text);
    const numeraticletterEl=document.getElementById("numericLetter");
    numeraticletterEl?.classList.add(numeraticCaseResult? "pw-success":"pw-error");
    numeraticletterEl?.classList.remove(numeraticCaseResult? "pw-error":"pw-success");

    //for min six letter control

    const minSixCharacterEl=document.getElementById("minSixCharacter");
    if(text.length>=6){
      minSixCharacterEl?.classList.add("pw-success");
      minSixCharacterEl?.classList.remove("pw-error");
    }else{
      minSixCharacterEl?.classList.add("pw-error");
      minSixCharacterEl?.classList.remove("pw-success");
    }
   

    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?])(?=.*[0-9]).{8,}$/;
    const isValid =  regex.test(text);
    if(isValid){
      this.isPasswordFocus=false;
      el.classList.add("is-valid");
      el.classList.remove("is-invalid");
    }else{
      
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");
    }

  }

  // checkValidationInput(el:HTMLInputElement){ //directive olusturdugumuz için gerek kalmadı
  //   if(!el.validity.valid){
  //     el.classList.add("is-invalid");
  //     el.classList.remove("is-valid");

  //   }else{
  //     el.classList.add("is-valid");
  //     el.classList.remove("is-invalid");
  //   }
  // }

}
