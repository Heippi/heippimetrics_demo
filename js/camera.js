

        var capture = null;

        var imagenesretornadas = null;

        var returnimg = null;

        var contador = 0; 

        var image_content= null;

        var canvas = $("#canvas");
    
        var cxt = canvas[0].getContext('2d');

        var video = $('#webcam');

            video = video[0];
         var newObservers = 0;

        var presentObservers = 0;

        var total =0;

        var numero=0;
    
        var totalAnterior=0
        
        var img = document.getElementById("image");

        var canvas = document.getElementById("canvas");

        window.URL = window.URL || window.webkitURL;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || 
                                 navigator.mozGetUserMedia || navigator.msGetUserMedia || function(){
            alert('Su navegador no soporta el acceso a la camara.');
        };

    
        window.datosVideo = {
               'StreamVideo': null,
               'url' : null
        };
         
        function obtenerFecha()
        {
            var fecha = new Date();
            // console.log(fecha);
            return fecha;
        }




        function runCamera(){

            navigator.getUserMedia({'audio':false, 'video':true},  

                function(streamVideo){
                    
                    // setInterval(
                        // function(){
                            datosVideo.StreamVideo = streamVideo;
                   
                                datosVideo.url = window.URL.createObjectURL(streamVideo);
                               
                                video.src =  datosVideo.url;
                               
                                video.play();
                    // },1000
                    // )
                    
               
                    capture= setInterval(

                        function(){

                            cxt.drawImage(video, 0, 0, 600, 550);

                            image_content = canvas.toDataURL("image/jpeg");

                             enviarimg(image_content,contador);
                        },2000
                    );
                }, 
                function(){
                    alert('No fue posible obtener acceso a la cámara.');
                }
            );
        }
 

        function enviarimg(d_img,cont)
        {
            $.ajax({
               
                type: "POST",
               
                url:'php/getimage.php',
               
                data: {
                    token: cont,
                    image: d_img                    
                },
                success: function(response)
                { 
                    console.log(response);
                   // console.log("Envio Exitoso !!");
                  
                   // $('#procesado').attr("src","imagesDemo/imgBuilded"+contador+".jpg");
                   
                },
                error:function(response)
                { 
                    console.log('Se produjo un fallo'+ response);
                } 
            });    
        }

         function pintarImagen()
        {
            // console.log("pintarImagen")

             imagenesretornadas= setInterval(

                        function(){

                            // console.log("holaaa");

                          $.ajax({
                               
                                type: "POST",
                                data: {
                                     token: "cont",
                                     image: "d_img" 
                                },
                                url:'php/viewImage.php',
                               
                                success: function(response)
                                { 
                                   // console.log("viewImage");

                                  if (response != false) {
                                    
                                    var responseTokens = response.split("#");
                                    var id = responseTokens[0];
                                    var detections = responseTokens[1];

                                    // console.log(id);
                                    // console.log(detections);

                                    $('#procesado').attr("src","resources/images-java/imageBuilded"+id+".jpg");

                                    $('#observadores').html(detections);

                                    newObservers = parseInt(detections);

                                    console.log("total : "+ total);
                                    
                                    numero =  newObservers ;

                                    if (newObservers >presentObservers) {

                                        total =  totalAnterior + numero;

                                        presentObservers = newObservers;
                                    }

                                    if (newObservers == 0) {

                                        presentObservers = 0;
                                     
                                        numero = 0;

                                        totalAnterior = total;
                                    }
                                   
                                    $("#total").html(total);
                                  }

                                   // $('#procesado').attr("src","imagesDemo/imgBuilded"+contador+".jpg");
                                },
                                error:function(response)
                                { 
                                    console.log('Se produjo un fallo'+ response);
                                } 
                            });                  
                        },100
                    );
        }
       
   