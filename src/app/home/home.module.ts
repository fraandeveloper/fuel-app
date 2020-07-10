import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { GetPostService } from '../services/get-post.service';
import { JwtInterceptorProvider } from '../services/jwt-interceptor.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    Geolocation,
    GetPostService,
    JwtInterceptorProvider
  ]
})
export class HomePageModule {}
