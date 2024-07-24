import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDashboardComponent } from './data-dashboard/data-dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  { path: '', component: DataDashboardComponent },
  { path: 'charts', component: ChartComponent },
  { path: 'tables', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
