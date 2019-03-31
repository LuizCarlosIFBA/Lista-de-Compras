import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public http: Http,
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS compras(id INTEGER PRIMARY KEY AUTOINCREMENT, produto TEXT, preco REAL)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  CreateItem(produto:string, preco:number){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO compras(produto, preco) VALUES (?, ?)";
      this.db.executeSql(sql, [ produto, preco]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetItem(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM compras", []).then((data) => {
        let arrayProdutos = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayProdutos.push({
              id: data.rows.item(i).id,
              produto: data.rows.item(i).produto,
              preco: data.rows.item(i).preco
            });            
          }          
        }
        resolve(arrayProdutos);
      }, (error) => {
        reject(error);
      })
    })
  }

  DeleteUser(idProdutos){
    
  }

}
