import EmailUser from './EmailUser';

export default class Email {
  constructor(
    public readonly date: Date,
    public readonly from: EmailUser[],
    public readonly subject: string,
    public readonly message: string | undefined
  ) {}
}
