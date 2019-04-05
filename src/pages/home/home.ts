import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  [x: string]: any;

  private ListUser : any;  
  private todo: FormGroup;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder) {

    this.todo = this.formBuilder.group({
      poduto: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      preco: ['', Validators.required],
    });

  }
    CreateProduct(){
      console.log(this.todo);
      
      this.database.CreateProduct(this.todo.value.preco, this.todo.value.produto).then( (data) => {
        console.log(data);
        this.GetAllProduct();
      }, (error) => {
        console.log(error);
      })
    }

    GetProduct(){
      this.database.GetAllProduct().then((data: any) => {
        console.log(data);
        this.ListUser = data;
      }, (error) => {
        console.log(error);
      })
    }

    DeleteUser(idUser){
      console.log(idUser);

    }

}