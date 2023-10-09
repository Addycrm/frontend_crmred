import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';


let calendar = new Calendar(calendarEl, {
    plugins: [ googleCalendarPlugin ],
    googleCalendarApiKey: '<YOUR API KEY>',
    events: {
      googleCalendarId: 'abcd1234@group.calendar.google.com'
    }
  });