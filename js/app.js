
var rbh=0;
var rbv=0;
var bnewd=0;
var lencol=["","","","","","",""];
var lenres=["","","","","","",""];
var maximo=0;
var matriz=0;

var intervalo=0;  //variable de tiempo para funcion de desplazamiento
var eliminar=0;   //variable de tiempo para eliminar dulces
var newdulces=0;  //variable de tiempo para nuevos dulces
var tiempo=0;     //variable de tiempo para temporizador

var i=0;
var contador=0;  //contador total
var conc1=0;    //contador columna1

var initialPos;
var espera=0;
var score=0;
var mov=0;

var min=2;
var seg=0;



//----------funcion de contador a cero------------------------------------------
/*function timer()
{
  if(seg!=0)
  {
    seg=seg-1;
  }
  if(seg==0)
  {
    if(min==0)
    {
      clearInterval(eliminar);
      clearInterval(newdulces);
      clearInterval(intervalo);
      clearInterval(tiempo);
      $( ".panel-tablero" ).hide("drop","slow",callback);
      $( ".time" ).hide();
    }
    seg=59;
    min=min-1;
  }
  $("#timer").html("0"+min+":"+seg)
}*/
//------------------------------------------------------------------------------
function callback()
{
    $( ".panel-score" ).animate({width:'100%'},4000);
}
//----------Funcion de borrado--------------------------------------------------
function borrartotal()
{
  for(var j=1;j<8;j++)
  {
    $(".col-"+j).children("img").detach();
  }
}
//---------------Funcion inicial para llenar el cuadro del juego----------------
function desplazamiento()
{
  i=i+1
  var numero=0;
  var imagen=0;

  $(".elemento").draggable({ disabled: true });
  if(i<8)
  {
    for(var j=1;j<8;j++)
    {
      if($(".col-"+j).children("img:nth-child("+i+")").html()==null)
      {
        numero=Math.floor(Math.random() * 4) + 1 ;
        imagen="image/"+numero+".png";
        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
      }
    }
  }
  if(i==8)
  {
    clearInterval(intervalo);   //desactivar funcion desplazamiento()
    eliminar=setInterval(function(){eliminarhorver()},150)  //activar funcion eliminarhorver
  }
}
//------------------------------------------------------------------------------
//---------------Funcion para eliminar mas de 3 dulces--------------------------
function eliminarhorver()
{
  matriz=0;
  rbh=horizontal()  //funcion busqueda dulces horizontal
  rbv=vertical()    //funcion buscar dulces vertical

  for(var j=1;j<8;j++)
  {
      matriz=matriz+$(".col-"+j).children().length;
  }

  if(rbh==0 && rbv==0 && matriz!=49)  //condicion si no encuentra 3 dulces o mas llamar a funcion para volver a completar el uego
  {
      clearInterval(eliminar);
      bnewd=0;
      newdulces=setInterval(function()
      {
        nuevosdulces()  //Funcion completar nuevos dulces
      },600)
  }
  if(rbh==1 || rbv==1)
  {
    $(".elemento").draggable({ disabled: true });
    $("div[class^='col']").css("justify-content","flex-end")
    $(".activo").hide("pulsate",1000,function(){
      var scoretmp=$(".activo").length;
      $(".activo").remove("img")
      score=score+scoretmp;
      $("#score-text").html(score)  //Cambiar puntuacion
    })
  }

  if(rbh==0 && rbv==0 && matriz==49)
  {
    $(".elemento").draggable({
      disabled: false,
      containment: ".panel-tablero",
      revert: true,
      revertDuration: 0,
      snap: ".elemento",
      snapMode: "inner",
      snapTolerance: 40,
      start: function(event, ui){
        mov=mov+1;
        $("#movimientos-text").html(mov)
      }
    });
  }

  $(".elemento").droppable({
    drop: function (event, ui) {
      var dropped = ui.draggable;
      var droppedOn = this;
      espera=0;
      do{
        espera=dropped.swap($(droppedOn));
      }while(espera==0)
      rbh=horizontal()  //funcion busqueda dulces horizontal
      rbv=vertical()    //funcion buscar dulces vertical
      if(rbh==0 && rbv==0)
      {
        dropped.swap($(droppedOn));
      }
      if(rbh==1 || rbv==1)
      {
        clearInterval(newdulces);
        clearInterval(eliminar);   //desactivar funcion desplazamiento()
        eliminar=setInterval(function(){eliminarhorver()},150)  //activar funcion eliminarhorver
      }
    },
  });
}
//------------------------------------------------------------------------------
//---------Funcion para intercambiar dulces-------------------------------------
jQuery.fn.swap = function(b)
{
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};
//------------------------------------------------------------------------------
//---------Funcion de nuevos dulces---------------------------------------------
function nuevosdulces()
{
  $(".elemento").draggable({ disabled: true });
  //alert("pase")
  $("div[class^='col']").css("justify-content","flex-start")
  for(var j=1;j<8;j++)
  {
      lencol[j-1]=$(".col-"+j).children().length;
  }
  if(bnewd==0)
  {
    for(var j=0;j<7;j++)
    {
      lenres[j]=(7-lencol[j]);
    }
    maximo=Math.max.apply(null,lenres);
    contador=maximo;
  }
  if(maximo!=0)
  {
    if(bnewd==1)
    {
      for(var j=1;j<8;j++)
      {
        if(contador>(maximo-lenres[j-1]))
        {
          $(".col-"+j).children("img:nth-child("+(lenres[j-1])+")").remove("img")
        }
      }
    }
    if(bnewd==0)
    {
      bnewd=1;
      for(var k=1;k<8;k++)
      {
        for(var j=0;j<(lenres[k-1]-1);j++)
        {
            $(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>")
        }
      }
    }
    for(var j=1;j<8;j++)
    {
      if(contador>(maximo-lenres[j-1]))
      {
        numero=Math.floor(Math.random() * 4) + 1 ;
        imagen="image/"+numero+".png";
        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>")
      }
    }
  }
  if(contador==1)
  {
      clearInterval(newdulces);
      eliminar=setInterval(function(){eliminarhorver()},150)
  }
  contador=contador-1;
}
//------------------------------------------------------------------------------
//----------funcion de busqueda horizontal de dulces----------------------------
function horizontal()
{
  var bh=0;
  for(var j=1;j<8;j++)
  {
    for(var k=1;k<6;k++)
    {
      var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
      var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
      var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          bh=1;
      }
    }
  }
  return bh;
}
//------------------------------------------------------------------------------
//----------Funcion de busqueda vertical de dulces------------------------------
function vertical()
{
  var bv=0;
  for(var l=1;l<6;l++)
  {
    for(var k=1;k<8;k++)
    {
      var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src")
      var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
      var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo")
          $(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo")
          $(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo")
          bv=1;
      }
    }
  }
  return bv;
}



/*
var timer = "";

$("#iniciar").click(function() {
  if (!timer) {
    movimientos = 0 ;
    $(this).hide();
    $("#reiniciar").show();
    timer = setInterval(inciarContador, 1000);
  }
}); */

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

//Función que llena todas las casillas de la cuadrícula para iniciar el juego
function llenarTodos() {
  var columna;
  for (var i = 1; i <= 7; i++) {
    columna = ".col-" + i;
    fillElemento($(columna), 7);
  }
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

$(".btn-reinicio").click(function(){
  i=0;
  score=0;
  mov=0;
  $(".panel-score").css("width","25%");
  $(".panel-tablero").show();
  $(".time").show();

  $("#score-text").html("0")
  $("#movimientos-text").html("0")
  $(this).html("REINICIAR")
  clearInterval(intervalo);
  clearInterval(eliminar);
  clearInterval(newdulces);
  clearInterval(tiempo);
  min=2;  //2
  seg=0;  //0
  borrartotal()
  intervalo=setInterval(function(){desplazamiento()},600)
  tiempo=setInterval(inciarContador,1000)
})
var tiempo_maximo = 120;

function inciarContador() {
  if (tiempo_maximo == 0) {
    tiempo_maximo = 120;
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
      clearInterval(eliminar);
      clearInterval(newdulces);
      clearInterval(intervalo);
      clearInterval(tiempo);
      $( ".panel-tablero" ).hide("drop","slow",callback);
      $( ".time" ).hide();
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
  llenarTodos()
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

});
