// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    // Update this URL to match your API port number
    private apiUrl = 'https://localhost:7289/api/todo';

    constructor(private http: HttpClient) { }

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    getTodoById(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiUrl}/${id}`);
    }

    createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    updateTodo(todo: Todo): Observable<any> {
        return this.http.put(`${this.apiUrl}/${todo.id}`, todo);
    }

    deleteTodo(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    toggleTodoStatus(id: number): Observable<Todo> {
        return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {});
    }
}