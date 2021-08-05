**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / ChatServiceProvider

# Interface: ChatServiceProvider

## Hierarchy

* **ChatServiceProvider**

## Index

### Methods

* [sendMessageToContact](chatserviceprovider.md#sendmessagetocontact)
* [sendMessageToContactId](chatserviceprovider.md#sendmessagetocontactid)
* [sendMessageToMultipleContacts](chatserviceprovider.md#sendmessagetomultiplecontacts)

## Methods

### sendMessageToContact

▸ **sendMessageToContact**(`message`: [MessageToContact](messagetocontact.md)): Promise\<string \| null>

*Defined in [js-miniapp-sdk/src/modules/chat-service.ts:13](https://github.com/rakutentech/js-miniapp/blob/549763f/js-miniapp-sdk/src/modules/chat-service.ts#L13)*

Opens a contact chooser which allows the user to choose a single contact,
and then sends the message to the chosen contact.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [MessageToContact](messagetocontact.md) | The message to send to contact. |

**Returns:** Promise\<string \| null>

Promise resolves with the contact id received a message.
Can also resolve with null response in the case that the message was not sent to a contact, such as if the user cancelled sending the message.
Promise rejects in the case that there was an error.

___

### sendMessageToContactId

▸ **sendMessageToContactId**(`id`: string, `message`: [MessageToContact](messagetocontact.md)): Promise\<string \| null>

*Defined in [js-miniapp-sdk/src/modules/chat-service.ts:22](https://github.com/rakutentech/js-miniapp/blob/549763f/js-miniapp-sdk/src/modules/chat-service.ts#L22)*

Send a message to the specific contact.

**`see`** {sendMessageToContact}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The id of the contact receiving a message. |
`message` | [MessageToContact](messagetocontact.md) | The message to send to contact. |

**Returns:** Promise\<string \| null>

Promise resolves with the contact id received a message.

___

### sendMessageToMultipleContacts

▸ **sendMessageToMultipleContacts**(`message`: [MessageToContact](messagetocontact.md)): Promise\<string[] \| null>

*Defined in [js-miniapp-sdk/src/modules/chat-service.ts:35](https://github.com/rakutentech/js-miniapp/blob/549763f/js-miniapp-sdk/src/modules/chat-service.ts#L35)*

Opens a contact chooser which allows the user to choose a multiple contacts
and then sends the message to the all chosen contacts.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [MessageToContact](messagetocontact.md) | The message to send to contact. |

**Returns:** Promise\<string[] \| null>

Promise resolves with an array of contact id which were sent the message.
Can also resolve with null array in the case that the message was not sent to any contacts, such as if the user cancelled sending the message.
Promise rejects in the case that there was an error.
