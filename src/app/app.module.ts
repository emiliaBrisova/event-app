import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsListComponent } from './pages/events-list/events-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewEventComponent,
    EventsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
