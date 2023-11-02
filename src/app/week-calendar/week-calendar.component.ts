import { Component } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';








@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent {


  view: CalendarView = CalendarView.Week; // تقویم هفته
  viewDate: Date = new Date(); // تاریخ فعلی
  events: CalendarEvent[] = []; // رویدادها


  constructor() {
    // ایجاد روزهای هفته به عنوان رویدادها
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysOfWeek.forEach((day, index) => {
      this.events.push({
        start: new Date(),
        title: day,
        meta: { index } // نمایش شماره روز هفته
      });
    });
  }

  toggleSelection(event: CalendarEvent): void {
    const index = event.meta.index;
    this.events[index].cssClass = this.events[index].cssClass ? '' : 'selected-day';
  }


}
