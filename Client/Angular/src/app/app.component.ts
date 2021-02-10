import { Component, ViewEncapsulation } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent { 
  scrapeEvents() {
    console.log("click");
    axios.get('http://localhost:8080/scrapers');
  }
}
