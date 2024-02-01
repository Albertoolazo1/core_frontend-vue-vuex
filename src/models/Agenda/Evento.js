export default class Evento {
    id = 0;
    title = '';
    start = '';
    end = '';
    allDay = false;
    color = '';
    ccCalendarId = 0;

    constructor(item) {
        if (item) {
            this.id = item.id;
            this.title = item.title;
            this.start = item.start;
            this.end = item.end;
            this.allDay = item.allDay;
            this.color = item.color;
            this.ccCalendarId = item.ccCalendarId;
        } else {
            this.id = 0;
            this.title = '';
            this.start = '';
            this.end = '';
            this.allDay = false;
            this.color = '';
            this.ccCalendarId = 0;
        }
    }
}