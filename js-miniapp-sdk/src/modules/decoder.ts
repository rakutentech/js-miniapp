import { Contact } from '../../../js-miniapp-bridge/src';
import libbase64 from 'libbase64';

/**
 * Interfaces to Decode any input
 */
export interface Decoder {
  /**
   * Decode the contacts name
   * @returns Decoded list of Contacts
   */
  decodeContacts(contactList: Contact[]): Promise<Contact[]>;
}

/** @internal */
export class DecodeManager implements Decoder {
  async decodeContacts(contactList: Contact[]): Promise<Contact[]> {
    const decodedContacts: Contact[] = [];

    for (const contact of contactList) {
      if (contact.name) {
        const decodedName = await this.decodeBase64(contact.name);
        decodedContacts.push({ ...contact, name: decodedName });
      } else {
        decodedContacts.push(contact);
      }
    }
    console.log('DECODED Contacts: ', decodedContacts);
    return decodedContacts;
  }

  private async decodeBase64(input: string): Promise<string> {
    try {
      const decoded = await libbase64.decode(input);
      return decoded.toString();
    } catch (error) {
      console.error(`Error decoding input: ${error.message}`);
      return '';
    }
  }
}
