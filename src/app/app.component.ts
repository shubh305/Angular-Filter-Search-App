import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { ItemService } from './services/item.service';
import { List } from './shared/item';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/min';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
@Injectable()
export class AppComponent implements OnInit {
  list: List[];
  filter: List = new List();
  city: any = []
  company: any = []
  cityPlace: string;
  companyPlace: string;
  constructor(private itemService: ItemService,
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.companyPlace = "Select Company"
    this.cityPlace = "Select City"
    this.routerActive()
    // Load items from the service on init
    this.getItems()
  }

  // get all the items function

  getItems() {
    this.itemService.getItems().subscribe(
      (items: List[]) => {
        this.list = items;
        for (let i = 0; i < this.list.length; i++) {
          this.city[i] = this.list[i].city
          this.company[i] = this.list[i].company
        }
        this.city = this.city.filter((v, i) => this.city.indexOf(v) == i)
        this.company = this.company.filter((v, i) => this.company.indexOf(v) == i)

      });
  }
  // for handling company filter events
  clickCompany(e) {
    this.filter.company = e.target.value
    this.location.go(this.router.createUrlTree(["/"], {
      queryParams: {
        city: this.filter.city, company: this.filter.company
      }
    }).toString())
    document.getElementById('filter-all').style.display = 'inline-block'
    document.getElementById('filter1').style.display = 'inline'
  }

  // for handling city filter events

  clickCity(e) {
    this.filter.city = e.target.value
    this.location.go(this.router.createUrlTree(["/"], {
      queryParams: {
        city: this.filter.city, company: this.filter.company
      }
    }).toString())
    document.getElementById('filter-all').style.display = 'inline-block'
    document.getElementById('filter2').style.display = 'inline'
  }

  // handling query param in url filter events

  routerActive() {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params); // Print the parameter to the console.
      if (Object.keys(params).length !== 0) {
        this.filter.city = params['city'];
        this.filter.company = params['company']
        this.companyPlace = params['city'];
        this.cityPlace = params['city'];
        document.getElementById('filter-all').style.display = 'inline-block'
        document.getElementById('filter1').style.display = 'inline'
        document.getElementById('filter2').style.display = 'inline'
      }
    });
  }

  // handling clear filter option

  clear(i) {
    if (i == 1) {
      this.filter.company = "",
        document.getElementById('filter1').style.display = 'none'
    }
    else if (i == 2) [
      this.filter.city = "",
      document.getElementById('filter2').style.display = 'none'
    ]
    else if (i == 0) {
      this.filter.city = ""
      this.filter.company = ""
      this.filter.name = ""
      document.getElementById('filter-all').style.display = 'none'
      document.getElementById('filter1').style.display = 'none'
      document.getElementById('filter2').style.display = 'none'
    }
    this.location.go(this.router.createUrlTree(["/"]).toString())
  }
}
