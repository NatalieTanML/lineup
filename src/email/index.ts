import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import Email from './Email';
import EmailUser from './EmailUser';
import NilLogger from './NilLogger';

export default class EmailService {
  #INBOX_NAME = 'INBOX';

  #mail: ImapFlow;

  #firstConnection = true;

  #connected = false;

  #email: string;

  #password: string;

  static createMailClient(email: string, password: string): ImapFlow {
    return new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
      emitLogs: false,
      logger: new NilLogger(),
    });
  }

  constructor(email: string, password: string) {
    this.#email = email;
    this.#password = password;
    this.#mail = EmailService.createMailClient(this.#email, this.#password);
  }

  async #connect(): Promise<void> {
    if (!this.#connected) {
      if (!this.#firstConnection) {
        this.#mail = EmailService.createMailClient(this.#email, this.#password);
      }
      await this.#mail.connect();
      this.#connected = true;
      this.#firstConnection = false;
    }
  }

  async #connectAndExec<T>(callback: () => Promise<T>): Promise<T> {
    await this.#connect();

    const lock = await this.#mail.getMailboxLock(this.#INBOX_NAME);

    try {
      return await callback();
    } finally {
      lock.release();
    }
  }

  getLatestInboxSequence = (): Promise<number> =>
    this.#connectAndExec<number>(async () => {
      return this.#mail.mailbox.exists;
    });

  fetchEmailInRange = (start: number, end?: number): Promise<Email[]> =>
    this.#connectAndExec(async () => {
      const messages = this.#mail.fetch(
        `${start}:${end === undefined ? '*' : end}`,
        { envelope: true, source: true }
      );
      const emails = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const message of messages) {
        const content = await simpleParser(message.source);
        emails.push(
          new Email(
            message.envelope.date,
            message.envelope.from.reduce(
              (acc, sender) =>
                sender.name !== undefined && sender.address !== undefined
                  ? [...acc, new EmailUser(sender.name, sender.address)]
                  : acc,
              <EmailUser[]>[]
            ),
            message.envelope.subject,
            content.text
          )
        );
      }
      return emails;
    });

  disconnect() {
    if (this.#connected) this.#mail.close();
    this.#connected = false;
  }

  listenForUpdates = (callback: (newEmail: Email) => void) =>
    this.#connectAndExec(async () => {
      this.#mail.on('exists', async () => {
        const latestSeq = await this.getLatestInboxSequence();
        const emails = await this.fetchEmailInRange(latestSeq);
        if (emails.length > 0) {
          callback(emails[0]);
        }
      });
    });
}
