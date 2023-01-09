export function valida(input){
 const tipoDeImput=input.dataset.tipo;
 if (validadores[tipoDeImput]) {
  validadores[tipoDeImput](input);
 }
 
 if (input.validity.valid) {
  input.parentElement.classList.remove("input-container--invalid");
  input.parentElement.querySelector(".input-message-error").innerHTML= "";
 }else{
  input.parentElement.classList.add("input-container--invalid");
  input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeImput,input);
 }
};

const tipoDeErrores=[
 "valueMissing",
 "typeMismatch",
 "patternMismatch",
 "customError",
];

const mensajesDeError={
 nombre:{
  valueMissing:"Este campo nombre no puede estar vacio"
 },
 email:{
  valueMissing:"Este campo correo no puede estar vacio",
  typeMismatch:"El correo no es valido"
 },
 password:{
  valueMissing:"Este campo contraseña no puede estar vacio",
  patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
 },
 nacimiento:{
  valueMissing:"Este campo fecha no puede estar vacio",
  customError:"Debes tener almenos 18 años de edad"
 },
 numero:{
  valueMissing:"Este campo fecha no puede estar vacio",
  patternMismatch:"El formato requerido es XXXXXXXXXX 10 numeros"
 },
 direccion:{
  valueMissing:"Este campo fecha no puede estar vacio",
  patternMismatch:"La direccion debe contener entre 10 a 40 caracteres"
 },
 ciudad:{
  valueMissing:"Este campo fecha no puede estar vacio",
  patternMismatch:"La ciudad debe contener entre 10 a 40 caracteres"
 },
 estado:{
  valueMissing:"Este campo fecha no puede estar vacio",
  patternMismatch:"El estado debe contener entre 10 a 40 caracteres"
 }
};

const validadores={
 nacimiento:(input)=>validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeImput, input){
 let mensaje="";
 tipoDeErrores.forEach((error)=>{
  if (input.validity[error]) {
   console.log(tipoDeImput, error);
   console.log(input.validity[error]);
   console.log(mensajesDeError[tipoDeImput][error]);
   mensaje= mensajesDeError[tipoDeImput][error];
  }
 });
 return mensaje;
};

function validarNacimiento(input) {
 const fechaCliente = new Date(input.value);
 
 let mensaje = ""; 
 if (!mayorEdad(fechaCliente)) {
  mensaje= "Debes ser mayor de edad para registrarse";
 }
 input.setCustomValidity(mensaje);
};

function mayorEdad(fecha) {
 const fechaActual = new Date();
 const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
 return diferenciaFechas  <= fechaActual;
};