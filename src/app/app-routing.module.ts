import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { EventsListComponent } from './pages/events-list/events-list.component';

const routes: Routes = [
  { path: 'new-event', component: NewEventComponent },
  { path: 'event/:id', component: NewEventComponent },
  { path: 'events', component: EventsListComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
