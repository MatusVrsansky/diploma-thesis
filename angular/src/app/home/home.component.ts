import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content?: string;
  ImagePath: string;
  title = "";

  constructor(private userService: UserService) {
    this.ImagePath = 'https://cdn.sparkfun.com//assets/parts/1/4/9/5/2/16274-SparkFun_micro-climate_kit_for_micro-bit_-_v3.0-02.jpg'
  }
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}
