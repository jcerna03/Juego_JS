//Función auxiliar para obtener un número entero aleatorio a partir de un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Función auxiliar que retorna una ruta de imágen aleatoria dentro de un set definido de rutas
function randomSrc() {
  var sources = ['image/1.png', 'image/2.png', 'image/3.png', 'image/4.png'];
  return sources[getRandomInt(0, 3)]
}
//Función auxiliar que suma los movimientos del jugador
function sumarMovimiento() {
  movimientos++;
  $('#movimientos-text').text(movimientos);
}


//Función que crea un nuevo elemento Dulce, asignandole propiedades y atributos correspondientes
//Asigna las interacciones draggable y droppable con los respectivos callbacks
function fillElemento(columna, espacios) {
  for (var i = 0; i < espacios; i++) {
    //$(columna).prepend("<img src='"+randomSrc()+"' class='elemento'/>")
    var elemento = document.createElement("img");
    $(elemento)
      .attr("src", randomSrc())
      .addClass("elemento")
      .draggable({
        grid: [120, 90],
        revert: "valid"
      })
      .droppable({
        accept: ".elemento",
        drop: function(event, ui) {
          var srcFrom = $(this).attr("src");
          var srcTo = $(ui.draggable).attr("src");
          $(this).attr("src", srcTo);
          $(ui.draggable).attr("src", srcFrom);
          sumarMovimiento();
        //  window.setTimeout(postJugada, 500);
        }

      })
    $(columna).prepend(elemento);

  }
}
//Función que llena todas las casillas de la cuadrícula para iniciar el juego
function llenarTodos() {
  var columna;
  for (var i = 1; i <= 7; i++) {
    columna = ".col-" + i;
    fillElemento($(columna), 7);
  }
}



var timer = "";
var tiempo_maximo = 26;
$("#iniciar").click(function() {
  if (!timer) {
    movimientos = 0 ;
    $(this).hide();
    $("#reiniciar").show();
    timer = setInterval(inciarContador, 1000);
  }
});
$("#reiniciar").click(function() {
  llenarTodos()
  if (timer) {
    reiniciar();
  } else {
    $('.panel-tablero').show()
    $('.panel-score').removeAttr("style")
    timer = setInterval(inciarContador, 1000);
  }
});

function reiniciar() {
  tiempo_maximo = 26;
  inciarContador();
}

function inciarContador() {
  if (tiempo_maximo == 0) {
    tiempo_maximo = 25;
  }
  tiempo_maximo = tiempo_maximo - 1
  var minutos = Math.floor(tiempo_maximo / 60);
  var segundos = tiempo_maximo % 60;
  if (minutos >= 0 || segundos >= 0) {
    if (minutos < 10) {
      minutos = '0' + minutos;
    }
    if (segundos < 10) {
      segundos = '0' + segundos;
    }
    var resultado_final = minutos + ":" + segundos;
    if (minutos == "00" && segundos == "00") {
      $('#timer').text(resultado_final);
      clearInterval(timer);
      timer = null;
      terminarPartida();
    } else {
      $('#timer').text(resultado_final);
    }
  } else {
    clearInterval(timer);
    timer = null;
  }
}

function detenerContador() {
  clearInterval(timer);
}



function terminarPartida() {
  $('.panel-tablero').hide()
  $('.panel-score').animate({
      width: '50%'
    }, 300)
    .animate({
      width: '100%'
    }, 300);
}


$(document).ready(function() {
  //Función que cambia los colores.
  $('#reiniciar').hide();
  setInterval(function() {
    $('#titulo').animate({
        color: 'yellow'
      }, 300)
      .animate({
        color: 'white'
      }, 300);
  }, 1000);

  llenarTodos();
});
