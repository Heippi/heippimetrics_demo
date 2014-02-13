<?php

$connection = mysql_connect("127.0.0.1", "root") or die("Database error"); 
   

switch ($_GET["parametro"] ) {
    case 'opinion':

    	$Name= $_POST['Name'];
		$Email= $_POST['Email'];
		$Asunto= $_POST['Asunto'];
		$Comentario= $_POST['Comentario'];
		$Suscribir= $_POST['Suscripcion'];
		
		$From= 'Landingpage@heippi.com';
		$send_to = 'contacto@heippi.com';
		$message = '|>>>>>> Nueva Opinión <<<<<<|'."\n".' Nombre :'.$Name. "\n".'Email :'.$Email. "\n".'Comentario :'.$Comentario. "\n".'Suscribir :'.$Suscribir;
		$header  = 'From: <'.$From.'>';

		mail($send_to,$Asunto,$message,$header);
		echo "Gracias por su opinion !!";

        break;
    case 'contacto':
        $Name= $_POST['Name'];
		$Email= $_POST['Email'];
		$Empresa= $_POST['Empresa'];
		$Asunto= $_POST['Asunto'];
		$AsuntoMensaje= $_POST['AsuntoMensaje'];
		$Comentario= $_POST['Comentario'];

		
		$From= 'Landingpage@heippi.com';
		$send_to = 'contacto@heippi.com';
		$message = '===DATOS==='."\n".' Nombre :'.$Name."\n".'Email :'.$Email."\n".'Empresa :'.$Empresa."\n".'AsuntoMensaje :'.$AsuntoMensaje."\n".'Comentario :'.$Comentario;
		$header  = 'From: <'.$From.'>';
	
		mail($send_to,$Asunto,$message,$header);

		echo "Agradecemos su registro";

        break;
    case 'registro':
        $mail= $_POST['mail'];

        echo $mail;
		
		$userName= $_POST['name'];
		
		$password= $_POST['password'];

		mysql_select_db("heippianalyticsdemo", $connection);

		insert('user', array(
		    'email' => $mail,
		    'name_user' => $userName,
		    'password' => $password
		));

		mysql_close($connection);

		echo "Agradecemos su registro";

        break;
    case 'login':
        $userName= $_POST['userName'];
		
		$password= $_POST['password'];

		mysql_select_db("heippianalyticsdemo", $connection);

		 $q1 = $kom->query("SELECT * FROM `Registrace_Sadek` WHERE `login`='".$login."'");

		mysql_close($connection);

		echo "Agradecemos su registro";

        break;
   
}


function insert($table, $inserts) {

    $values = array_map('mysql_real_escape_string', array_values($inserts));
   
    $keys = array_keys($inserts);
        
    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')');
}
?>