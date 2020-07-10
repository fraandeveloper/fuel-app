import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapsComponent } from './maps.component';

import { MapsPageRoutingModule } from './maps-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, MapsPageRoutingModule],
  declarations: [MapsComponent],
  providers: []
})
export class MapsModule {}
