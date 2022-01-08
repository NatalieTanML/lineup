import Meeting from './Meeting';
import store from './Store';

export default class Meetings {
  #MEETINGS_KEY = 'meetings';

  #store = store;

  constructor() {
    const init = store.get(this.#MEETINGS_KEY) as Meeting[] | undefined;
    if (init === undefined) {
      store.set(this.#MEETINGS_KEY, []);
    }
  }

  getMeetings(): Meeting[] {
    const rawMeetings = this.#store.get(this.#MEETINGS_KEY) as Meeting[];
    return rawMeetings.map((meeting) => ({
      ...meeting,
      datetime: new Date(meeting.datetime),
    }));
  }

  addMeeting(newMeeting: Meeting): void {
    const meetings = this.getMeetings().filter(
      (meeting) => meeting.id !== newMeeting.id
    );
    meetings.push(newMeeting);
    meetings.sort((x, y) => x.datetime.getTime() - y.datetime.getTime());
    store.set(this.#MEETINGS_KEY, meetings);
  }

  removeMeeting(id: string): void {
    const meetings = this.getMeetings();
    store.set(
      this.#MEETINGS_KEY,
      meetings.filter((meeting) => meeting.id !== id)
    );
  }
}
