import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.less']
})
export class NewEventComponent implements OnInit, OnDestroy {
  $destroy = new Subject();
  form: FormGroup;
  eventId: string;
  isEditable = false;
  maxDateFrom: Date;
  maxTimeFrom: Time;
  minDateTo: Date;
  minTimeTo: Time;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkRoutingParam();
    this.detectChanges();
    if (this.eventId) {
      const eventData = this.store.getEventById(this.eventId);
      this.form.patchValue(eventData);
      this.form.disable();
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      description: [null, Validators.required],
      address: [null, Validators.required],
      dateFrom: [null, Validators.required],
      timeFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
      timeTo: [null, Validators.required],
      numOfGuests: [null, Validators.min(1)],
      contactPerson: this.fb.group({
        name: null,
        phone: null
      }),
      lastUpdateTime: null
    });
  }

  detectChanges() {
    this.form.controls.dateFrom.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
        this.minDateTo = value;
      });

    this.form.controls.dateTo.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
        this.maxDateFrom = value;
      });
  }

  checkRoutingParam() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });
  }

  saveEvent() {
    this.form.controls.lastUpdateTime.setValue(moment().toISOString());
    const returnedValue = this.store.createNewEvent(this.form.value);
    if (returnedValue) {
      this.eventId = returnedValue;
    }
    this.form.disable();
    this.isEditable = false;
  }

  updateEvent() {
    this.isEditable = true;
    this.form.enable();
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
