import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private ListProduto: any;  
  private todo: FormGroup;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder) {

    this.todo = this.formBuilder.group({
      produto: ' ',
      preco: 0.0
     });

  }
    CreateItem(){
      
      this.database.CreateItem(this.todo.value.produto, this.todo.value.preco).then( (data) => {
        console.log(data);
        this.GetItem();
        console.log(this.todo);

      }, (error) => {
        console.log(error);
      })
    }

    GetItem(){
      this.database.GetItem().then((data: any) => {
        console.log(data);
        this.ListProduto = data;
      }, (error) => {
        console.log(error);
      })
    }

    DeleteUser(idUser){
      console.log(idUser);

    }

}
