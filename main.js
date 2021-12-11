//CREAMOS UNA CLASE LLAMADA "Politica" PARA DESPUES PODER HACER OBJETOS
class Politica{
  constructor (instanteLlegada, tiempoEjecucion, prioridad, letra, numeroSeccion, instanteFinalizacion){
    this.instanteLlegada = instanteLlegada;
    this.tiempoEjecucion = tiempoEjecucion;
    this.prioridad = prioridad;
    this.letra = letra;
    this.numeroSeccion = numeroSeccion;
    this.instanteFinalizacion = instanteFinalizacion;
  }
}

//Inicializamos algunas variables globqles
let boton = document.getElementById("empezar");
let tabla = document.getElementById("tabla-datos");
let abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];
let btnAnalizar = document.getElementById("btn-analizar");
let selectEmpezar = document.getElementById("flex");
let tiempo = 0;

let valorInstanteLlegada, valorInstanteLlegada2, valorTiempoEjecucion, 
valorTiempoEjecucion2, valorPrioridad, valor, selectPolitica, letraProceso, letraProceso2;

let grafica = document.getElementById("grafica");
let graficaTiempo = document.getElementById("tiempo");
const todosLosObjetos = [];

//AL BOTON DE "EMPEZAR EL ALGORITMO" LE AÑADIMOS UN EVENTO DE ESCUCHA PARA CUANDO LE DEN CLICK
boton.addEventListener("click", function(){
  
  //GUARDAMLS EL VALOR TOTAL DE LOS PROCESOS QUE SE VAN A EJECUTAR
  let select = document.getElementById("cantidad-datos").value;
  //COMO EL VALOR NOS LO DA EN TIPO "STRING" LO PASAMOS A ENTERO (INT))
    valor = parseInt(select, 10);
  
  //OBTENEMLS EL VALOR DE LA POLITICA QUE EL USUARIO ESCOGIO 
  selectPolitica = document.getElementById("tipoPolitica").value;
  
  //iMPRIMIMOS EN PANTALLA UNA TABLA PARA QUE EL USUARIO PUEDA INGRESAR TODOS LOS VALORES DE LOS PRPCESOS
  for (let i = 0; i < valor; i++) {
      tabla.innerHTML += `<p>${abecedario[i]}</p> <input type='number' 
      placeholder='Instante llegada' id='i${i}'/> <input type='number'    
      placeholder='Tiempo Ejecución' id='e${i}'/> <input type='number' 
      placeholder='Prioridad' id='p${i}'/>`;
  }
  //HABILITAMOS EL BOTON DE "ANALIZAR" Y OCULTAMOS EL BOTON DE "Empezar"
  btnAnalizar.style.visibility = "visible";
  selectEmpezar.style.display = "none";
});

//AL BOTON "Analizar" LE AÑADIMOS UN EVENTO DE ESCUCHA PARA CUANDO LE DEN CLICK
btnAnalizar.addEventListener("click", function(){
  
  //OCULTAMOS EL BOTÓN DE "Analizar"
  btnAnalizar.style.visibility = "hidden";
  let tituloPolitica = document.getElementById("tituloPolitica").innerHTML = `${selectPolitica}`;
  
  //OBTENEMOS LOS VALORES DE LOS PRPCESOS QUE EL USUARIO INGRESO POR LA TABLA Y LOS GUARDAMOS COMO OBJETOS CON ATRIBUTOS EN EL ARREGLO "todosLosObjetos"
  for (var i = 0; i < valor; i++) {
    const dato = new Politica (document.getElementById(`i${i}`).value, 
    document.getElementById(`e${i}`).value, document.getElementById(`p${i}`).value, abecedario[i]);
    todosLosObjetos.push(dato);
  }
  
  //INICIALIZAMOS VARIABLES LOCALES
  tiempo = 0;
  let bandera = false;
  let secuencia = 0;
  
  //CON SWITCH PARA SABER QUE POLITICA ESCOGIERON
  switch (selectPolitica) {
    
    //EN CASO DE QUE SE HAYA ESCOGIDO LA POLITICA FIFO
    case 'fifo':
      
      //HACEMOS BISIBLE TANTO LA GRAFICA DEBLOS PRPCESOS COMO LQ DEL TIEMPO
      grafica.style.visibility = "visible";
      graficaTiempo.style.visibility = "visible";
      
      //CON UN FOR RECORREMOS TODOS LOS PRPCESOS GUARDADOS EK EL ARREGLO "todosLosObjetos" Y LOS VAMOS MOSTRSNDO EN LA GRAFICA DE PROCESOS
      for (var i = 0; i < todosLosObjetos.length; i++){
        
        console.log(abecedario[i] + " EMPIEZA EN " + tiempo);
        
        if (i != 0) {
          bandera = true;
          secuencia += 15;
        }
        for (var j = 0; j < todosLosObjetos[i].tiempoEjecucion;){
          console.log(tiempo + " " + abecedario[i]);
          graficaTiempo.innerHTML += `<span class="tiempo">${tiempo}</span>`;
          if (!bandera) {
            grafica.innerHTML += `<span class="valores">${abecedario[i]}</span>`;
          }else if(bandera){
            grafica.innerHTML += `<span class="valores" style="transform: translate(0, 
              -${secuencia}px);">${abecedario[i]}</span>`;
          }
          tiempo++;
          j++;
          if (j == todosLosObjetos[i].tiempoEjecucion) {
            console.log(abecedario[i] + " TERMINA EN " + tiempo);
          }
        }
      }
      console.log(todosLosObjetos);
      break;
      
    //EN CASL DE QUE SE HAYA ESCOGIDO LA POLITICA SJN
    case 'sjn':
      
      //MOSTRAMOS LAS DOS GRAFICAS (TIEMPO Y DE PROCESOS)
      grafica.style.visibility = "visible";
      graficaTiempo.style.visibility = "visible";
      
      //A LOS OBJETOS GUSRDADOS EN EL ARREGLO "todosLosObjetos" les agregaros su valor de "numeroSeccion" que va de 1 en 1.
      for (let i = 0; i < todosLosObjetos.length; i++) {
        todosLosObjetos[i].numeroSeccion = i+1;
      }
      
      //INICUALIZAMOS VARIABLES
      bandera = false;
      const todosLosObjetosCopia = [];
      const todosLosTiempoEjecucion = [];
      let duplicados = [], duplicados2 = [];
      tiempo = 0;
      let valorMinimo, t1, t2, letraProceso, procesosHechos = 0, banderaDuplicados = false, tempArray = [],
       banderaRep = false, banderaUno = false, banderaDos = false, numeroDup1 = 0, letraProcesoDup = "",tValor = 0;
      
      //INICIAMOS UN CICLO WHILE PARA MIENTRAS LOS PROCESOS EN EL ARREGLO "todosLosObjetos" NO SE HAYAN PROCESADO.
      while(!bandera){
        
        console.log(`El tiempo es: ${tiempo}`);
        console.log(`TODOS LOS PROCESOS EN COLA SON: ${todosLosObjetos.length}`);
        console.log(todosLosObjetos);
        console.log(`TODOS LOS TIEMPO DE EJECUCIÓN ANTES DE "AGREGAR": ${todosLosTiempoEjecucion.length}`);
        
        //BUSCAMOS SI ALGUN PROCESO A LLEGADO EN EL TIEMPO ACTUAL, SI ES CORRECTO SE AÑADE A UN AREGLO.
        
        for (var i = 0; i < todosLosObjetos.length; i++) {
          
          //SI ES DADO EL CASO EN QUE EL PROCESO QUE LLEGA YA ESTA EN EL ARREGLO "todosLosObjetosCopia"  SE ACTIVARA UNA BANDERA PARA EVITAR QUE SE AGREGUEN AL ARREGLO "todosLosObjetosCopia"
          if (todosLosObjetosCopia.length > 0) {
            for (var j = 0; j < todosLosObjetosCopia.length; j++) {
              if (todosLosObjetosCopia[j].letra == todosLosObjetos[i].letra) {
                banderaRep = true
              }
            }
            //SI EL PROCESO QUE VA LLEGANDO NO ESTA EN EL ARREGLO "todosLosObjetosCopia" ENTONCES LO AGREGAMOS AL ARREGLO
            if (!banderaRep) {
              if (todosLosObjetos[i].instanteLlegada == tiempo) {
                todosLosObjetosCopia.push(todosLosObjetos[i]);
                todosLosTiempoEjecucion.push(todosLosObjetos[i].tiempoEjecucion);
                console.log(`---Se ha añadido el proceso: ${todosLosObjetos[i].letra} a la cola, 
                con un tiempo de ejecución de ${todosLosObjetos[i].tiempoEjecucion}---`);
              }
            }
          }else{
            if (todosLosObjetos[i].instanteLlegada == tiempo) {
              todosLosObjetosCopia.push(todosLosObjetos[i]);
              todosLosTiempoEjecucion.push(todosLosObjetos[i].tiempoEjecucion);
              console.log(`---Se ha añadido el proceso: ${todosLosObjetos[i].letra} a la cola, 
              con un tiempo de ejecución de ${todosLosObjetos[i].tiempoEjecucion}---`);
            }
          }
        }
        
        console.log(`TODOS LOS TIEMPO DE EJECUCIÓN DESPUES DE "AGREGAR": ${todosLosTiempoEjecucion.length}`);
        console.log(todosLosTiempoEjecucion.toString());
        
        /*
        SI ES DADO EN CASO DE QUE NO HA LLEGADO NINGUN PROCESO EN EL TIEMPO ACTUAL, SE IMPRIME UN ESPACIO VACIO.
        EN DADO CASO DE QUE SI HAYA LLEGADO ALGUN PROCESO EMPEZAMOS CON A VERIFICAR SI SE TIENE QUE IMPRIMIR.
        */
        if (todosLosTiempoEjecucion.length == 0) {
          graficaTiempo.innerHTML += `<span class="tiempo">${tiempo}</span>`;
          grafica.innerHTML += `<span class="valoresVacios"></span>`;
          console.log(`NO HAY NINGUN PROCESO PARA IMPRIMIR EN EL TIEMPO ${tiempo}`);
          tiempo++
        }else{
          
          //SI EL TAMAÑO DEL ARREGLO "todosLosTiempoEjecucion"  ES MAYOR O IGUAL A 2 VERIFICAMOS SI EM EL ARREGLO HAY ALGUN VALOR DUPLICADO
          if (todosLosTiempoEjecucion.length >= 2) {
            
            console.log("ENTRA AL IF DE todosLosObjetosCopia.length >= 2 ");
            
            //ORDENAMOS EL ARREGLO "todosLosTiempoEjecucion" GUARDANDOLO EN EL ARREGLO "tempArray"
            tempArray = [...todosLosTiempoEjecucion].sort();
            
            console.log(`Este es el arreglo ordenado de los T.E: ${tempArray}`);
            console.log("ESTOS SON TODOS LOS VALORES DE LOS OBJETOSCOPIA");
            console.log(todosLosObjetosCopia);
            
            //VERIFICAMOS SI EM EL ARREGLO "tempArray" HAY UN VALOR DUPLICADO
            for (var i = 0; i < tempArray.length;) {
              if (tempArray[i] == tempArray[i+1]) {
                for (var j = 0; j < todosLosObjetosCopia.length; j++) {
                  if (todosLosObjetosCopia[j].tiempoEjecucion === tempArray[i] && !banderaUno) {
                    console.log("-----------------------------------------");
                    console.log(`El valor de j del for es: ${j}`);
                    console.log("EL PRIMER DUPLICADO");
                    console.log(`El valor del objeto copia ${todosLosObjetosCopia[j].tiempoEjecucion} 
                    es igual a al valor ${tempArray[i]}`);
                    console.log(todosLosObjetosCopia[j]);
                    console.log(tempArray[i]);
                    console.log("-----------------------------------------");
                    duplicados.push(tempArray[i]);
                    duplicados2.push(todosLosObjetosCopia[j]);
                    banderaUno = true;
                    numeroDup1 = j;
                  }
                  if (todosLosObjetosCopia[j].tiempoEjecucion === tempArray[i+1] && !banderaDos && numeroDup1 < j) {
                    console.log("-----------------------------------------");
                    console.log(`El valor de j del for es: ${j}`);
                    console.log("EL SEGUNDO DUPLICADO");
                    console.log(`El valor del objeto copia ${todosLosObjetosCopia[j].tiempoEjecucion} 
                    es igual a al valor ${tempArray[i+1]}`);
                    console.log(todosLosObjetosCopia[j]);
                    console.log(tempArray[i+1]);
                    console.log("-----------------------------------------");
                    duplicados.push(tempArray[i+1]);
                    duplicados2.push(todosLosObjetosCopia[j]);
                    banderaDos = true;
                  }
                }
              }
              if (i == tempArray.length-2){
                i+=2;
              }else{
                i++;
              }
            }
          }
          
          //SI EN EL ARREGLO "duplicados2o" SU TAMAÑO ES MAYOR A 0, QUIERE DECIR QUE SI EXISTEN VALORES DUPLICADOS Y ENTONCES PASAMOS A ARREGLAR LA SITUACIÓN
          if (duplicados2.length > 0) {
            
            console.log("IMPRIMIMOS DUPLICADOS");
            console.log("Areglo 1");
            console.log(duplicados);
            console.log(duplicados.toString());
            console.log("Areglo 2");
            console.log(duplicados2);
            /*duplicados2.splice(2,1);
            console.log("Areglo 2");
            console.log(duplicados2);*/
            
            //VERIFICAMOS CUAL DE LOS DOS VALORES DUPLICADOS TIENE UN "instanteLlegada" MENOE 
            for (var i = 0; i < duplicados2.length; i++) {
              if (duplicados2[i].instanteLlegada < duplicados2[i+1].instanteLlegada) {
                console.log(`1er if- El instanteLlegada ${duplicados2[i].instanteLlegada} 
                llego primero que ${duplicados2[i+1].instanteLlegada}`);
                valorMinimo = duplicados2[i].tiempoEjecucion;
                letraProcesoDup = duplicados2[i].letra;
                banderaDuplicados = true;
                secuencia = 15 * duplicados2[i].numeroSeccion - 15;
                for (var j = 0; j < todosLosTiempoEjecucion.length; j++) {
                  if (todosLosTiempoEjecucion[j] == duplicados2[i].tiempoEjecucion) {
                    console.log(`El valor a eliminar de todosLosTiempoDeEjecucion es: ${todosLosTiempoEjecucion[j]}`);
                    todosLosTiempoEjecucion.splice(j,1);
                    j+=100;
                  }
                }
                i+=100;
                console.log("Termino el PRIMER IF")
              }else{
                if (duplicados2[i+1].instanteLlegada < duplicados2[i].instanteLlegada) {
                  console.log(`2do if- El instanteLlegada ${duplicados2[i+1].instanteLlegada} 
                  llego primero que ${duplicados2[i].instanteLlegada}`);
                  valorMinimo = duplicados2[i+1].tiempoEjecucion;
                  letraProcesoDup = duplicados2[i+1].letra;
                  banderaDuplicados = true;
                  secuencia = 15 * duplicados2[i+1].numeroSeccion - 15;
                  for (var j = 0; j < todosLosTiempoEjecucion.length; j++) {
                    if (todosLosTiempoEjecucion[j] == duplicados2[i+1].tiempoEjecucion) {
                      console.log(`El valor a eliminar de todosLosTiempoDeEjecucion es: ${todosLosTiempoEjecucion[j]}`);
                      todosLosTiempoEjecucion.splice(j,1);
                      j+=100;
                    }
                  }
                  i+=100;
                  console.log("Termino el SEGUNDO IF")
                }
              }
            }
            duplicados.splice(0,2);
            duplicados2.splice(0,2);
          
          //SI NO HAY VALORES DUPLICADOS OBTENEMOS ENTONCES EL VALOR MINIMO DEL ARREGLO "todosLosTiempoEjecucion"
          }else{
            valorMinimo = Math.min.apply(null, todosLosTiempoEjecucion);
          }
          
          console.log(`EL VALOR MINIMO ES: ${valorMinimo}`);
          
          //CREAMOS UNA FUNCION DONDE OBTENDREMOS EL INDEX DEL VALOR MINIMO EN EL AREGLO todosLosTiempoEjecucion
          function checarIndex(i){
            return i == valorMinimo;
          }
          
          //BUSCAMOS LA LETRA DEL PROCESO CON EL VALOR MINIMO
          if (banderaDuplicados) {
            console.log(`La letra escogida es ${letraProcesoDup}`);
            letraProceso = letraProcesoDup;
          }else{
            for (var k = 0; k < todosLosObjetosCopia.length; k++) {
              if (todosLosObjetosCopia[k].tiempoEjecucion == valorMinimo) {
                console.log(`La letra escogida es ${todosLosObjetosCopia[k].letra}`);
                letraProceso = todosLosObjetosCopia[k].letra;
              }
            }
          }
          
          //INICIAMOS EL PROCESO DE IMPRIMIR EN LA GRÁFICA DE PROCESOS, EL DATO CON EL VALOR MINIMO.
          for (var i = 0; i < valorMinimo;) {
          
            if (!banderaDuplicados) {
              for (let j = 0; j < todosLosObjetosCopia.length; j++) {
                if (todosLosObjetosCopia[j].tiempoEjecucion == valorMinimo) {
                  secuencia = 15*todosLosObjetosCopia[j].numeroSeccion - 15;
                }
              }
            }
            //IMPRIMIMOS EL TIEMPO ACTUAL Y EL PROCESO EN SUS DIFERENTES GRÁFICAS
            graficaTiempo.innerHTML += `<span class="tiempo">${tiempo}</span>`;
            grafica.innerHTML += `<span class="valores" style="transform: translate(0, 
              -${secuencia}px);">${letraProceso}</span>`;
          
            tiempo++;
            
            console.log(`El tiempo es: ${tiempo}`);
            
            //VERIFICAMOS SI ALGUN PROCESO HA LLEGADO EN EL TIEMPO ACTUAL, SI ES CORRECTO LO AÑADIMOS AL AREGLO todosLosTiempoEjecucion
            for (var j = 0; j < todosLosObjetos.length; j++) {
              if (todosLosObjetos[j].instanteLlegada == tiempo) {
                todosLosObjetosCopia.push(todosLosObjetos[j]);
                todosLosTiempoEjecucion.push(todosLosObjetos[j].tiempoEjecucion);
                console.log(`Se ha añadido el proceso: ${todosLosObjetos[j].letra} a la cola, 
                con un tiempo de ejecución de ${todosLosObjetos[j].tiempoEjecucion}`);
              }
            }
            
            i++;
            
            //CUANDO YA SEA LA ULTIMA ITERACION DEL PROCESO DE IMPRIMIR EN GRAFICA INCREMENTAMLS LOS procesosHechos EN 1 Y ADEMAS ELIMINAMOS EL DATO YA IMPRESO EN LAS GRAFICAS
            if (i == valorMinimo) {
              for (let m = 0; m < todosLosObjetos.length; m++) {
                if (todosLosObjetos[m].letra == letraProceso) {
                  console.log(`-----------------------VALORES T, E, I de ${todosLosObjetos[m].letra}----------------------`);
                  console.log(`${letraProceso} termino en el tiempo ${tiempo}`);
                  tValor = tiempo - todosLosObjetos[m].instanteLlegada;
                  console.log(`T = ${tValor}`);
                  console.log(`E = ${tValor - todosLosObjetos[m].tiempoEjecucion}`);
                  console.log(`I = ${todosLosObjetos[m].tiempoEjecucion / tValor}`);
                  console.log("-----------------------------------------------------------------");
                }
              }
              procesosHechos++;
              if (!banderaDuplicados) {
                const indexProcesoTerminado = todosLosTiempoEjecucion.findIndex(checarIndex);
                todosLosTiempoEjecucion.splice(indexProcesoTerminado, 1);
              }else{
                banderaUno = false;
                banderaDos = false;
                banderaDuplicados = false;
              }
            }
          }
          
          //SI TODOS LOS PROCESOS HECHOS SON IGUAL A TODOS LOS PROCESOS A PROCESAR, SE TERMINA EL PROGRAMA
          if (procesosHechos == valor) {
            bandera = true;
          }
        }
      }
      break;
    default:
      alert("ALGO SALIO MAL");
  }
});