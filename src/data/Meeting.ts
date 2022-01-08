import EmailUser from '../email/EmailUser';

export default class Meeting {
  constructor(
    public readonly id: string,
    public readonly datetime: Date,
    public readonly subject: string,
    public readonly from: EmailUser[],
    public readonly url: string
  ) {}
}
