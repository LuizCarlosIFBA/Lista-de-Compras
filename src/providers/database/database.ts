   
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
  [x: string]: any;

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
        db.executeSql("CREATE TABLE IF NOT EXISTS compras(id INTEGER PRIMARY KEY AUTOINCREMENT, preco REAL, produto TEXT)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  CreatePoduct(preco: number, produto:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO compras(preco, produto) VALUES ( ?, ?)";
      this.db.executeSql(sql, [preco, produto]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllProduct(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM compras", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              preco: data.rows.item(i).preco,
              produto: data.rows.item(i).produto,
            });            
          }          
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

  DeleteUser(idUser){
    
  }

}