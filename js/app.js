//Función auxiliar para obtener un número entero aleatorio a partir de un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Función auxiliar que retorna una ruta de imágen aleatoria dentro de un set definido de rutas
function randomSrc(){
var sources = ['image/1.png', 'image/2.png', 'image/3.png', 'image/4.png'];
return sources[getRandomInt(0,3)]
}
//Función auxiliar que suma los movimientos del jugador
function sumarMovimiento(){
movimientos++;
$('#movimientos-text').text(movimientos);
}
//Función que crea un nuevo elemento Dulce, asignandole propiedades y atributos correspondientes
//Asigna las interacciones draggable y droppable con los respectivos callbacks
function fillElemento(columna, espacios){
for (var i = 0; i < espacios; i++) {
  //$(columna).prepend("<img src='"+randomSrc()+"' class='elemento'/>")
  var elemento = document.createElement("img");
  $(elemento)
    .attr("src", randomSrc())
    .addClass("elemento")
    .draggable({
      grid: [120,90],
      revert: "valid"
    })
    .droppable({
      accept: ".elemento",
      drop: function(event, ui){
        var srcFrom = $(this).attr("src");
        var srcTo = $(ui.draggable).attr("src");
        $(this).attr("src", srcTo);
        $(ui.draggable).attr("src", srcFrom);
        window.setTimeout(postJugada, 500);
        sumarMovimiento();
      }

    })
  $(columna).prepend(elemento);

}
}
//Función que llena todas las casillas de la cuadrícula para iniciar el juego
function llenarTodos(){
var columna;
for (var i = 1; i <= 7; i++) {
  columna = ".col-"+i;
  fillElemento($(columna), 7);
}
}

function iniciarTemporizador(){

}

$( document ).ready(function() {
  //alert( "ready!" );
  llenarTodos();

  //evento iniciar
  $("#inicio").click(function(){

  var estado_boton =  $(this).text();
  var trigger = -1;
  if(estado_boton == "Iniciar")
  {

    $(this).text("Reiniciar");

      //PROCESO
        var tiempo_maximo = 120;

        trigger =  setInterval( function (){
        tiempo_maximo = tiempo_maximo - 1
        var minutos = Math.floor(tiempo_maximo / 60) ;
        var segundos = tiempo_maximo % 60;
        if(minutos < 10)
        {
          minutos = '0' + minutos;
        }
        if(segundos < 10)
        {
          segundos = '0' + segundos;
        }
        var resultado_final =minutos + ":" +segundos;
        $("#timer").text(resultado_final);
        if(minutos == "00" && segundos == "00" )
        {
          clearInterval(trigger);
        }
      }, 1000);


  }
  else if(estado_boton == "Reiniciar")
  {
    //Reiniciar proceso}
    clearInterval(trigger);
    timer = null;

  }


  });
});
