import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ItemService } from './services/item.service';
import { ItemFilterPipe } from './shared/item-filter.pipe';
import { NgPipesModule } from 'ngx-pipes';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgPipesModule,
    RouterModule.forRoot([])
  ],
  declarations: [
    AppComponent,
    ItemFilterPipe,
  ],
  providers: [
    ItemService,
    Location
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
