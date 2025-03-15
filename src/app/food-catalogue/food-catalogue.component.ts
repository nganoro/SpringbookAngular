import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodCataloguePage } from '../shared/models/FoodCataloguePage';
import { FoodItem } from '../shared/models/FoodItem';
import { FoodItemService } from './service/fooditem.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {

  restaurantId!: number;
  foodItemResponse!: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary!: FoodCataloguePage;


  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.restaurantId = +id;
      }
    });

    this.getFoodItemsByRestaurant(this.restaurantId);
    
  }

  async getFoodItemsByRestaurant(restaurant: number) {
    await this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe({
      next: data => {
          this.foodItemResponse = data;
          console.log(data)
      },
      error: error => {
        console.error('Error occurred while fetching all restaurants', error);
      }
    })
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      console.log(food);
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }

  onCheckOut() {
    this.foodItemCart;
    // this.orderSummary = {
    //   foodItemsList: [],
    //   restaurant: []
    // };
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }

}
