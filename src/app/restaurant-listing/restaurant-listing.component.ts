import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './service/restaurant.service';
import { Restaurant } from '../shared/models/Restaurant';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css',
  providers: [RestaurantService]
})
export class RestaurantListingComponent implements OnInit {

  public restaurantList: Restaurant[] = [];

  ngOnInit() {
    this.getAllRestaurants();
  }

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  async getAllRestaurants() {
      await this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurantList = data;
      },
      error: error => {
        console.error('Error occurred while fetching all restaurants', error);
      }
    })
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image filename pattern
  }

  onButtonClick(id: number = 0) {
    this.router.navigate(['/food-catalogue', id]);
  }

}
