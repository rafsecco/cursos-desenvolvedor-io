import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "./produto.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  obterProdutos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl + "produtos");
  }

  obterProdutoPorId(id: string) : Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/produto/${id}`);
  }
}
