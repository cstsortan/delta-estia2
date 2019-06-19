import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  currentImage$: Observable<string>;
  constructor(
    private dataService: DataService
  ) {
    this.isAdmin$ = dataService.isAdmin();
    this.currentImage$ = dataService.getFoodStatus();
  }

  ngOnInit() {
  }

  async uploadStatus(file: File) {
    const ref = firebase.storage().ref(`photos/food/${Date.now()}_${file.name}`)
    await ref.put(file);
    const imageUrl = await ref.getDownloadURL();
    if (imageUrl) {
      await this.dataService.updateFoodStatus(imageUrl);
    }
  }

}
