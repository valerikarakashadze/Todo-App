import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occurred!';

                if (error.error instanceof ErrorEvent) {
                    // Client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // Server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    
                    // Handle specific status codes
                    switch (error.status) {
                        case 400:
                            errorMessage = 'Bad Request: Please check your input.';
                            break;
                        case 401:
                            errorMessage = 'Unauthorized: Please login again.';
                            break;
                        case 403:
                            errorMessage = 'Forbidden: You don\'t have permission.';
                            break;
                        case 404:
                            errorMessage = 'Not Found: The requested resource was not found.';
                            break;
                        case 500:
                            errorMessage = 'Server Error: Please try again later.';
                            break;
                    }
                }

                console.error('Error occurred:', error);
                return throwError(errorMessage);
            })
        );
    }
}

export const errorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};