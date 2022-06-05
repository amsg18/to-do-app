# Servicio Web RESTFul de Registro y Autenticación

_Creación de una aplicación ToDo con acceso y autorización._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


Ver **Deployment** para conocer cómo desplegar el proyecto.


### Pre-requisitos 📋

·Es necesario tener un equipo Windows, Linux u OS X con conexión a internet. 
·Es preferible tener instalada una máquina virtual con LINUX para tener un seguimiento y mantenimiento futuros más sencillos. 
 Es recomendable que la máquina virtual:
	-tenga un mínimo de 2GHz de procesador
	-tenga mínimo 4GB de RAM
	-tenga 25GB de HD
	-asegurarnos de tener la última versión estable de 64 bits de la distribución de Ubuntu de Linux, por el momento es la 20.04 LTS.
(La máquina virtual se puede crear desde VirtualBox.)
·Tener instaladas las siguientes aplicaciones:
	-Visual Studio Code más plugins para Node, JS y TS.
	-Postman
	-NodeJs- node y npm
	-Git, con una cuenta con un repositorio en GitHub o bitbacket
	-MongoDB
	-El paquete CORS

Para comprobar los datos de la máquina virtual abrimos una terminal con 
```
<Ctrl+Alt+T>
$ lsb_release -a
$ uname -m
$ df -h
```



### Instalación 🔧

Tendremos que tener instaladas y en funcionamiento las partes del proyecto api-rest y api-aut-reg que se pueden obtener del mismo repositorio, recordamos las cosas básicas que habrá que tener instaladas para el funcionamiento de las tres aplicaciones.

Instalaremos:
	·Un editor de texto, en este caso Visual Studio Code.
	
	·Un testing de API REST, postman.
	
	·Un entorno en tiempo de ejecución multiplataforma basado en JavaScript, Node js
	
	·Un gestor de repositorios, git.
	
	·Un gestor de proyectos que impide que tengamos que estar constantemente reiniciando nuestra aplicación con cada cambio en el código fuente, nodemon.
	
	·Una política de registro logs, Morgan.

	·Una base de datos, Mongo DB
	
	·El paquete CORS, mecanismo que utiliza encabezados adicionales HTTP para permitir que un user agent obtenga permiso para acceder a recursos ubicados en servidores que estén en dominios distintos al dominio de la aplicación.
	
	·Angular, herramientas y bibliotecas que facitlitan la creación de aplicaciones en la parte del cliente.
	
	.Librería de estilo, en este caso Bootstrap.
	
_Instalación de Visual Studio Code y cómo lanzarlo_

```
<Ctrl+Alt+T>
sudo snap install --classic code
code .
```
_Instalación de Postman y cómo lanzarlo_

```
<Ctrl+Alt+T>
sudo snap install postman
postman &
```
_Instalación de Node JS, instalaremos primero el gestor de paquetes de Node_

```
<Ctrl+Alt+T>
sudo apt update
sudo apt install npm
```
Instalación de una utilidad que ayuda a instalar y mantener las veriones

```
<Ctrl+Alt+T>
sudo npm clean -f
sudo npm i -g n
```
Finalmente instalación de la última versión estable de Node JS
```
sudo n stable

```
_Instalación del gestor de repositorios y configuración con los datos de acceso_
```
sudo apt install git
git config --global user.name tu_nombre_de_usuario
git config --global user.email tu_correo_electrónico
git config --list
```
_Intalación de nodemon_
```
npm i -D nodemon
```
También debemos incluir una línea en nuestro package.json creando el scrip:
```
start: "nodemon index.js"
```
_Instalación de Morgan_
```
npm i -S morgan

```
_Instalación de mongodb_
```
sudo apt update
sudo apt install -y mongodb
```

_Instalación del paquete CORS_
```
npm i -S cors
```
Habrá que importar y escribir ciertas sentencias para poder utilizarlo en nuestro proyecto:
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
Después se creará una variable, en este caso la denomino auth, para poder proteger los métodos HTTP que veas convenientes con un token

```
var auth = (req, res, next) => {
	if(req.headers.token === "password1234") {
	 	return next();
 	} else {
		return next(new Error("No autorizado"));
 	};
 };
```
_Creación de un certificado con openssl_
Crear un certificado autofirmado.
 Primero creamos una clave privada:
```
Ctrl+alt+T
cd (dirección de tu proyecto)
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

_Intalación de Angular_
```
sudo npm install -g @angular/cli
```

_Intalación de Bootstrap_
```
npm install bootstrap
npm install @ng-bootstrap/ng-bootstrap
```
Importarte acordarse de importar la librería en el archivo css que defina el estilo de la aplicación.
Añadiendo:
@import 'bootstrap/dist/css/bootstrap.css'
## Ejecutando las pruebas ⚙️

_Para poder ejecutar las pruebas habrá que realizar primero el despliegue_
Habrá que tener inicializado con npm start los proyectos api-rest y api-auth-res, con ng serve el to-do-app y abierta la base de datos de mongo.

### Analice las pruebas end-to-end 🔩
Cosas añadidas al código de la versión anterior:
Hemos creado el servicio de https importando la biblioteca de progrmación https:
```
const https=require('https');
```
Módulo para acceder al filesystem:

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
Hemos hecho un parche intermedio para decir que cuando acabe de hacer lo que tenga que hacer el https llame al express cambiando lo que habría sido en http:
```
/* app.listen(port, () => { 
    console.log(`API REST CRUD ejecutándose en http://localhost:${port}/api/:coleccion/:id`); 
  });*/
```
Por:
```

```

Al realizar las pruebas con el postman, los datos se guardarán en la base creada en MongoDB, entonces podrás utilizar comandos de mongo en la terminal para poder ver o encontrar los datos de tu base de datos. Al realizar las prubeas con la aplicación añadiendo tareas, borrándolas y completándolas también se modificará en la base de datos.

## Despliegue 📦
Primero se tendrá que clonar el repositorio con git clone https://github.com/amsg18/api-rest.git
Tendrás que  lanzar Node Js en la ruta de tu proyecto
```
start npm
```
También tendrás que iniciar mongo y su host, esto se hará en otra terminal diferente a la de Node JS:
```
sudo systemctl start mongodb
mongo --host localhost:27017
```

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_
postman, visual studio

* [Postman](https://www.postman.com/) - Plataforma API.
* [Visual Studio](https://code.visualstudio.com/) - Editor de texto
* [Mongodb](https://www.mongodb.com/) - Base de datos utilizada



## Versionado 📌
Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/amsg18/to-do-app/tags).

## Autores ✒️

* **Ana Mª Soler** - *Realización del trabajo y documentación* - [amsg18](#https://github.com/amsg18)


## Licencia 📄
Este proyecto no está bajo ninguna licencia.
 

