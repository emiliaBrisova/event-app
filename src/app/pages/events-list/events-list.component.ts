import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.less']
})
export class EventsListComponent implements OnInit {
  events: Map<any, any> = new Map();
  eventsToShow: Map<any, any>;
  finishedEvents: Map<any, any>;
  plannedEvents: Map<any, any>;
  eventsInProgress: Map<any, any>;

  constructor(private readonly store: StoreService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.store.events.subscribe(res => {
      this.events = res;
      this.eventsToShow = this.events;
    });
  }

  getEventsToShow() {
    return this.eventsToShow;
  }

  setFinishedEvents() {
    if (!this.finishedEvents) {
      const currentTime = moment();
      this.finishedEvents = new Map();
      this.events.forEach(event => {
        const eventEnd = moment(
          event.dateTo + ' ' + event.timeTo,
          'YYYY-MM-DD HH:mm'
        );
        if (eventEnd.isBefore(currentTime)) {
          this.finishedEvents.set(event.id, event);
        }
      });
    }
    this.eventsToShow = this.finishedEvents;
  }

  setPlannedEvents() {
    if (!this.plannedEvents) {
      const currentTime = moment();
      this.plannedEvents = new Map();
      this.events.forEach(event => {
        const eventStart = moment(
          event.dateFrom + ' ' + event.timeFrom,
          'YYYY-MM-DD HH:mm'
        );
        if (eventStart.isAfter(currentTime)) {
          this.plannedEvents.set(event.id, event);
        }
      });
    }
    this.eventsToShow = this.plannedEvents;
  }

  setEventsInProgress() {
    if (!this.eventsInProgress) {
      const currentTime = moment();
      this.eventsInProgress = new Map();
      this.events.forEach(event => {
        const eventStart = moment(
          event.dateFrom + ' ' + event.timeFrom,
          'YYYY-MM-DD HH:mm'
        );
        const eventEnd = moment(
          event.dateTo + ' ' + event.timeTo,
          'YYYY-MM-DD HH:mm'
        );
        if (
          eventStart.isSameOrBefore(currentTime) &&
          eventEnd.isSameOrAfter(currentTime)
        ) {
          this.eventsInProgress.set(event.id, event);
        }
      });
    }

    this.eventsToShow = this.eventsInProgress;
  }

  setAllEvents() {
    this.eventsToShow = this.events;
  }
}
