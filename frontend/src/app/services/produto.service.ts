import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    private readonly API = 'http://localhost:3000/produtos';

    constructor(private http: HttpClient) { }

    // READ - Listar produtos
    listar(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.API);
    }

    // CREATE - Incluir produto
    incluir(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this.API, produto);
    }

    // DELETE - Excluir produto
    excluir(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API}/${id}`);
    }

    // READ - Buscar produto pelo ID
    buscarPorId(id: string): Observable<Produto> {
        return this.http.get<Produto>(`${this.API}/${id}`);
    }

    // UPDATE - Editar produto
    editar(produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(
            `${this.API}/${produto.id}`,
            produto
        );
    }

}