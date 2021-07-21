// sign up form
let admin =document.loginform.admin
let pass =document.loginform.pwd
let l =/^[A-Z]{3}[0-9A-Z]{8}$/;

let valid =()=>{
    if(l.value.match(admin)){
        l.style.border="1px solid black"
    }else{
        l.style.border="1px  solid red"
    }  
}

button.addEventListener("click", valid); 