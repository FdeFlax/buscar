
var pagina_actualBuscar = 1;
var dirurl = "";

function realizarBusqueda(evento){
    evento.preventDefault();
    const DiaDesde=document.getElementById("dia1");
    const MesDesde=document.getElementById("mes1");
    const AnyoDesde=document.getElementById("anyo1");
    const DiaHasta=document.getElementById("dia2");
    const MesHasta=document.getElementById("mes2");
    const AnyoHasta=document.getElementById("anyo2");
    const titulo=document.getElementById("texto");
    const ubicacion=document.getElementById("Ubication");
  
    const pagina=pagina_actualBuscar-1;
    const registros_por_pagina=6; //por defecto 8
    const div_principal=document.getElementById("masRecientes");
  
    const fechaComienzo = new Date(AnyoDesde, MesDesde, DiaDesde);  
    const fechaFin = new Date(AnyoHasta, MesDesde, DiaHasta);


    console.log(fechaComienzo);
    var ruta="?";
    if(ubicacion.value){
      ruta= ruta+"z=" + ubicacion.value;
    }
  
    if(titulo.value){
      if(ruta!="?"){
        ruta=ruta + "&t=" + titulo.value;
      }else{
        ruta=ruta + "t=" + titulo.value;
      }
    }
  
    if(fechaComienzo.value){
      if(ruta!="?"){
        ruta=ruta + "&fd=" + fechaComienzo.value;
      }else{
        ruta=ruta + "fd=" + fechaComienzo.value;
      }
    }
  
    if(fechaFin.value){
      if(ruta!="?"){
        ruta=ruta + "&fh=" + fechaFin.value;
      }else{
        ruta=ruta + "fh=" + fechaFin.value;
      }
    }
  
  
    let url="";
    if(ruta!="?"){
      url= 'api/publicaciones' + ruta ;
    }else{
      url= 'api/publicaciones';
    }
    dirurl=url;
    
    
    url=url + '&pag=' + pagina + '&lpag=' + registros_por_pagina
    
  
    xhr= new XMLHttpRequest();
  
    xhr.open('GET',url,true); 
    xhr.onload=function(){
      let articulos = JSON.parse(xhr.responseText);
    
      div_principal.innerHTML="";
      
      const articles=articulos.FILAS;
      
      for(let i=0;i<articles.length;i++){
        var noticia=document.createElement('article');
        console.log('Hola');
                  noticia.innerHTML = `
                  <article class="vecin">
                  <a href="publicacion.html"><h3 class="truncate" title="`+ articles[i].titulo +`">`+ articles[i].titulo +`</h3></a>
                                  <figure class="imagen">
                                      <a href="publicacion.html"><img src="./fotos/pubs/`+ articles[i].imagen +`" alt=`+articles[i].nombre+` width="250" height="180"></a>
                                      <figcaption class="piearticulo">
                                          <div class="usuario">
                                              <span class="user" title= `+articles[i].autor+`><img class="fotoUsuario" src="fotos/usuarios/`+articles[i].fotoAutorr+`" width="25" height="25"> `+articles[i].autor+`</span>
                                          </div>
                                          <div class="calendario">
                                              <span class="calendar" title="Fecha"></span><span class="icocalendararticle icon-calendar"></span> <time datetime="`+articles[i].fechaCreacion+`">`+articles[i].fechaCreacion+`</time>
                                          </div>
                                        </figcaption>
                                  </figure>
              </article>`;
                    div_principal.appendChild(noticia);
      }
    }
  
    xhr.send();
  }