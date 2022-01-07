import Credential from './Credential';
import store from './Store';

export default class Preferences {
  #CREDENTIAL_KEY = 'credentials';

  #LAST_QUERY_KEY = 'lastQueriedAt';

  #store = store;

  getCredential(): Credential | undefined {
    return this.#store.get(this.#CREDENTIAL_KEY) as Credential | undefined;
  }

  updateCredential(email: string, password: string): void {
    this.#store.set(this.#CREDENTIAL_KEY, new Credential(email, password));
  }

  getLastQueryDateTime(): Date | undefined {
    const value = this.#store.get(this.#LAST_QUERY_KEY) as string | undefined;
    return value === undefined ? value : new Date(value);
  }

  updateLastQueryDateTime(datetime: Date): void {
    this.#store.set(this.#LAST_QUERY_KEY, datetime);
  }
}
