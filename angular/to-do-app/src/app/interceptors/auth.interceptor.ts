import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Obtenemos el token del session storage
    const token= sessionStorage.getItem('token');

    var request= req;
    //Validamos si el token existe
    if(token){
      //Clonamos el token y lo inyectamos en la cabecera de todas las peticiones HTTP
      request = req.clone({
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
