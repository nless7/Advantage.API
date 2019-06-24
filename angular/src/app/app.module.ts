import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from './sections/section-orders/section-orders.component';
import { SectionHealthComponent } from './sections/section-health/section-health.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ServerComponent } from './server/server.component';

import { OrderService } from 'src/shared/Service/order.service';
import { ServerService } from 'src/shared/Service/server-service';

import { appRoutes } from 'src/routes';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionSalesComponent,
    SectionOrdersComponent,
    SectionHealthComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ServerComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    HttpModule
  ],
  providers: [
    OrderService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
