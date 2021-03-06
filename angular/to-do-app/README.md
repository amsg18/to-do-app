# Servicio Web RESTFul de Registro y Autenticaci贸n

_Creaci贸n de una aplicaci贸n ToDo con acceso y autorizaci贸n._

## Comenzando 馃殌

_Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas._


Ver **Deployment** para conocer c贸mo desplegar el proyecto.


### Pre-requisitos 馃搵

路Es necesario tener un equipo Windows, Linux u OS X con conexi贸n a internet. 
路Es preferible tener instalada una m谩quina virtual con LINUX para tener un seguimiento y mantenimiento futuros m谩s sencillos. 
 Es recomendable que la m谩quina virtual:
	-tenga un m铆nimo de 2GHz de procesador
	-tenga m铆nimo 4GB de RAM
	-tenga 25GB de HD
	-asegurarnos de tener la 煤ltima versi贸n estable de 64 bits de la distribuci贸n de Ubuntu de Linux, por el momento es la 20.04 LTS.
(La m谩quina virtual se puede crear desde VirtualBox.)
路Tener instaladas las siguientes aplicaciones:
	-Visual Studio Code m谩s plugins para Node, JS y TS.
	-Postman
	-NodeJs- node y npm
	-Git, con una cuenta con un repositorio en GitHub o bitbacket
	-MongoDB
	-El paquete CORS

Para comprobar los datos de la m谩quina virtual abrimos una terminal con 
```
<Ctrl+Alt+T>
$ lsb_release -a
$ uname -m
$ df -h
```



### Instalaci贸n 馃敡

Tendremos que tener instaladas y en funcionamiento las partes del proyecto api-rest y api-aut-reg que se pueden obtener del mismo repositorio, recordamos las cosas b谩sicas que habr谩 que tener instaladas para el funcionamiento de las tres aplicaciones.

Instalaremos:
	路Un editor de texto, en este caso Visual Studio Code.
	
	路Un testing de API REST, postman.
	
	路Un entorno en tiempo de ejecuci贸n multiplataforma basado en JavaScript, Node js
	
	路Un gestor de repositorios, git.
	
	路Un gestor de proyectos que impide que tengamos que estar constantemente reiniciando nuestra aplicaci贸n con cada cambio en el c贸digo fuente, nodemon.
	
	路Una pol铆tica de registro logs, Morgan.

	路Una base de datos, Mongo DB
	
	路El paquete CORS, mecanismo que utiliza encabezados adicionales HTTP para permitir que un user agent obtenga permiso para acceder a recursos ubicados en servidores que est茅n en dominios distintos al dominio de la aplicaci贸n.
	
	路Angular, herramientas y bibliotecas que facitlitan la creaci贸n de aplicaciones en la parte del cliente.
	
	.Librer铆a de estilo, en este caso Bootstrap.
	
_Instalaci贸n de Visual Studio Code y c贸mo lanzarlo_

```
<Ctrl+Alt+T>
sudo snap install --classic code
code .
```
_Instalaci贸n de Postman y c贸mo lanzarlo_

```
<Ctrl+Alt+T>
sudo snap install postman
postman &
```
_Instalaci贸n de Node JS, instalaremos primero el gestor de paquetes de Node_

```
<Ctrl+Alt+T>
sudo apt update
sudo apt install npm
```
Instalaci贸n de una utilidad que ayuda a instalar y mantener las veriones

```
<Ctrl+Alt+T>
sudo npm clean -f
sudo npm i -g n
```
Finalmente instalaci贸n de la 煤ltima versi贸n estable de Node JS
```
sudo n stable

```
_Instalaci贸n del gestor de repositorios y configuraci贸n con los datos de acceso_
```
sudo apt install git
git config --global user.name tu_nombre_de_usuario
git config --global user.email tu_correo_electr贸nico
git config --list
```
_Intalaci贸n de nodemon_
```
npm i -D nodemon
```
Tambi茅n debemos incluir una l铆nea en nuestro package.json creando el scrip:
```
start: "nodemon index.js"
```
_Instalaci贸n de Morgan_
```
npm i -S morgan

```
_Instalaci贸n de mongodb_
```
sudo apt update
sudo apt install -y mongodb
```

_Instalaci贸n del paquete CORS_
```
npm i -S cors
```
Habr谩 que importar y escribir ciertas sentencias para poder utilizarlo en nuestro proyecto:
```
/ Imports
const cors = require('cors');
// Declaraciones
var allowCrossTokenHeader = (req, res, next) => {
res.header("Access-Control-Allow-Headers", "*");
return next();
};
var allowCrossTokenOrigin = (req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
return next();
};
// Middlewares
app.use(cors());
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);
```
Despu茅s se crear谩 una variable, en este caso la denomino auth, para poder proteger los m茅todos HTTP que veas convenientes con un token

```
var auth = (req, res, next) => {
	if(req.headers.token === "password1234") {
	 	return next();
 	} else {
		return next(new Error("No autorizado"));
 	};
 };
```
_Creaci贸n de un certificado con openssl_
Crear un certificado autofirmado.
 Primero creamos una clave privada:
```
Ctrl+alt+T
cd (direcci贸n de tu proyecto)
openssl genrsa -out key.pem

```
Creamos un certificado sin firmar e introduces los datos a identificar
```
openssl req -new -key key.pem -out csr.pem
```
Firmamos el certificado
```
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

```

_Intalaci贸n de Angular_
```
sudo npm install -g @angular/cli
```

_Intalaci贸n de Bootstrap_
```
npm install bootstrap
npm install @ng-bootstrap/ng-bootstrap
```
Importarte acordarse de importar la librer铆a en el archivo css que defina el estilo de la aplicaci贸n.
A帽adiendo:
@import 'bootstrap/dist/css/bootstrap.css'
## Ejecutando las pruebas 鈿欙笍

_Para poder ejecutar las pruebas habr谩 que realizar primero el despliegue_
Habr谩 que tener inicializado con npm start los proyectos api-rest y api-auth-res, con ng serve el to-do-app y abierta la base de datos de mongo.

### Analice las pruebas end-to-end 馃敥
Cosas a帽adidas al c贸digo de la versi贸n anterior:
Hemos creado el servicio de https importando la biblioteca de progrmaci贸n https:
```
const https=require('https');
```
M贸dulo para acceder al filesystem:

```
const fs= require('fs');
```
Nos creamos unas opciones con la key y el certificado:

```
const OPTIONS_HTTPS={
  key:fs.readFileSync('./cert/key.pem'),
  cert:fs.readFileSync('./cert/key.pem')
};
```
Hemos hecho un parche intermedio para decir que cuando acabe de hacer lo que tenga que hacer el https llame al express cambiando lo que habr铆a sido en http:
```
/* app.listen(port, () => { 
    console.log(`API REST CRUD ejecut谩ndose en http://localhost:${port}/api/:coleccion/:id`); 
  });*/
```
Por:
```

```

Al realizar las pruebas con el postman, los datos se guardar谩n en la base creada en MongoDB, entonces podr谩s utilizar comandos de mongo en la terminal para poder ver o encontrar los datos de tu base de datos. Al realizar las prubeas con la aplicaci贸n a帽adiendo tareas, borr谩ndolas y complet谩ndolas tambi茅n se modificar谩 en la base de datos.

## Despliegue 馃摝
Primero se tendr谩 que clonar el repositorio con git clone https://github.com/amsg18/api-rest.git
Tendr谩s que  lanzar Node Js en la ruta de tu proyecto
```
start npm
```
Tambi茅n tendr谩s que iniciar mongo y su host, esto se har谩 en otra terminal diferente a la de Node JS:
```
sudo systemctl start mongodb
mongo --host localhost:27017
```

## Construido con 馃洜锔?

_Menciona las herramientas que utilizaste para crear tu proyecto_
postman, visual studio

* [Postman](https://www.postman.com/) - Plataforma API.
* [Visual Studio](https://code.visualstudio.com/) - Editor de texto
* [Mongodb](https://www.mongodb.com/) - Base de datos utilizada



## Versionado 馃搶
Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/amsg18/to-do-app/tags).

## Autores 鉁掞笍

* **Ana M陋 Soler** - *Realizaci贸n del trabajo y documentaci贸n* - [amsg18](#https://github.com/amsg18)


## Licencia 馃搫
Este proyecto no est谩 bajo ninguna licencia.
 

