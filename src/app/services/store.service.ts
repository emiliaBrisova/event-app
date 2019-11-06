import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _events: BehaviorSubject<Map<string, Array<string>>> = new BehaviorSubject(new Map());
  public readonly events: Observable<Map<string, Array<string>>> = this._events.asObservable();
  private key = 'events';

  constructor() {
    this.loadDataFromLocalStorage();
  }

  createNewEvent(obj: any): string {
    const savedEvents = this._events.value;
    obj.id = `${this.key}${savedEvents.size + 1}`;
    savedEvents.set(obj.id, obj);
    this._events.next(savedEvents);
    this.updateLocalStorage();

    return obj.id;
  }

  updateEvent(obj: any) {
    const savedEvents = this._events.value;
    savedEvents.set(obj.id, obj);
    this._events.next(savedEvents);
    this.updateLocalStorage();
  }

  getEvents() {
    return this._events.getValue();
  }

  getEventById(id: string) {
    return this._events.value.get(id);
  }

  updateLocalStorage() {
    localStorage.setItem(this.key, JSON.stringify(Array.from(this._events.value.entries())));
  }

  loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem(this.key));
    if (!this.isObjectEmpty(data)) {
      const newMap: Map<string, Array<string>> = new Map(data);
      this._events.next(newMap);
    }
  }

  removeAllEvents() {
    localStorage.removeItem(this.key);
  }

  isObjectEmpty(obj: any) {
    return !obj || obj && Object.keys(obj).length === 0;
  }
}
