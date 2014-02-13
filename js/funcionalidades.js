  alert("hola")
    	window.TOKEN = null

    	function validarCampoVacio(){

			var cont =0;

			

			var result= false

		        $(".formulario ul li input").each(function (index) {
		              
		            if ($(this).val()=="") {
		                	cont = index + 1;
		                	$(this).css({"border":"1px solid red"});
		            };
		        })
		        if (cont>=1) {

		        	result= false;
		            
		            alert("Se detecto un campo obligatorio vacio...")
		        }
		        else{
		           result = true;
		        }
		    return result;
		      
		}

		function restaurarCampos(){
			
		    $(".formulario ul li input").each(function (index) {

		        	$(this)[0].value ="";

		            $(this).css({"border":"1px solid #ccc"});
		    });

		   
		}


    	function login()
    	{
    		$.ajax({
			    
			    url:"php/backend_send.php?parametro=opinion",
			    
			    type:"POST",
			    
			    data:{
				    correo:document.getElementsByName("email")[0].value,
				    
				    contraseña:document.getElementsByName("password")[0].value,
				},
				success:function(result) {
				    
				    if (result._action==true) {
				    	 restaurarCampos();
				   		 TOKEN = result.token;
				    }else{
				    	alert('Error:  Usuario o contraseña invalido ... ')
				    }
				},
				error:function(result)
				{ 
					console.log('Se produjo un fallo en el envio de datos, login');
					console.log(result);
				} 
			})
    	}
    	
		function registro() {
		   
			$.ajax({
			   
			    url:"php/backend_send.php?parametro=registro",
			    
			    type:"POST",
			   
			    data:{
				    name:document.getElementsByName("name")[0].value,

				    mail:document.getElementsByName("mail")[0].value,

				    password:document.getElementsByName("password")[0].value
				},
				success:function(result) {
				    
				   restaurarCampos();
				   alert('envio exitoso')
				    console.log(result)
				},
				error:function(result)
				{ 
					console.log('Se produjo un fallo al momento de enviar Registro...');
				} 
			})
		}

		function enviarOpinion() {
		   
			$.ajax({
			    
			    url:"php/backend_send.php?parametro=opinion",
			   
			    type:"POST",
			    
			    data:{
				    Name:document.getElementsByName("nombre")[0].value,

				    Email:document.getElementsByName("email")[0].value,
				    
				    Asunto:"Nueva Opinión de Heippi",
				    
				    Comentario:document.getElementsByName("Mensaje")[0].value,
				    
				    Suscripcion:$("input:radio[name='si-subscribir']:checked").val()
				},
				success:function(mensaje) {
				    
				    restaurarCampos();
				    console.log(mensaje);
				    
				},
				error:function(mensaje)
				{ 
					console.log('Se produjo un fallo en el envio de datos, Opinión');
				} 
			})
		}

		function enviarContacto() {

			$.ajax({
			    url:"php/backend_send.php?parametro=contacto",
			    type:"POST",
			    data:{

				    Name:document.getElementsByName("nombre")[0].value,
				   
				    Email:document.getElementsByName("email")[0].value,
				   
				    Asunto:"Nuevo Contacto en Heippi",
				   
				    Empresa:document.getElementsByName("empresa")[0].value,
				   
				    AsuntoMensaje:document.getElementsByName("asunto")[0].value,
				   
				    Comentario:document.getElementsByName("Mensaje")[0].value
				},
				success:function(mensaje) {
				    
				   restaurarCampos();
				   
				   console.log(mensaje);
				},
				error:function(mensaje)
				{ 
					console.log('Se produjo un fallo en el envio de datos, Contacto');
				} 
			})
		}

    	function enviar(form){

			switch(form)
			{
			case 'login':
			    if (validarCampoVacio()) {
				    login();
			    };
			    break;
			case 'registro':
			  	if (validarCampoVacio()) {
				   registro();
			    };
			  break;
			case 'opinion':
			    if (validarCampoVacio()) {
				    enviarOpinion();
			    };
			    break;
			case 'contacto':
			  	if (validarCampoVacio()) {
				    enviarContacto();
			    };
			  break;
			}
		}

