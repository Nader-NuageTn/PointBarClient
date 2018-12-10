import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
const I18N_VALUES = {
    fr: {
        weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    },
};
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html'
})

export class CalendarsComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  newEvent: CalendarEvent;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit this event', event);
      }
    }
//,
//    {
//      label: '<i class="fa fa-fw fa-times"></i>',
//      onClick: ({ event }: { event: CalendarEvent }): void => {
//        this.events = this.events.filter(iEvent => iEvent !== event);
//        this.handleEvent('This event is deleted!', event);
//      }
//    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date('2018-10-05T00:00:00')),
      title: '1\u00e9re service',
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date('2018-10-06T00:00:00')),
      title: '1\u00e9re service',
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date('2018-10-07T00:00:00')),
      title: '1\u00e9re service',
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date('2018-10-10T00:00:00')),
      title: '1\u00e9re service',
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date('2018-10-11T00:00:00')),
      title: '1\u00e9re service',
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date('2018-10-13T00:00:00')),
      title: '1\u00e9re service',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-15T00:00:00')),
      title: '1\u00e9me service',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-16T00:00:00')),
      title: '1\u00e9me service',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-17T00:00:00')),
      title: '1\u00e9me service',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-19T00:00:00')),
      title: '1\u00e9me service',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-20T00:00:00')),
      title: '1\u00e9me service',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-21T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-06T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-07T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-08T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-13T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-14T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-15T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-16T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-17T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-18T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-19T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-20T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: startOfDay(new Date('2018-10-21T00:00:00')),
      title: '2\u00e9me service',
      color: colors.yellow,
      actions: this.actions
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
      event,
    newStart,
    newEnd
    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: this.actions,
    }
    this.events.push(this.newEvent);

    // this.refresh.next();
    this.handleEvent('Add new event', this.newEvent);
     this.refresh.next();
  }
}
//Calendar event handler ends
