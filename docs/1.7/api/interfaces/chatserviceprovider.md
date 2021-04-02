**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / ChatServiceProvider

# Interface: ChatServiceProvider

## Hierarchy

* **ChatServiceProvider**

## Index

### Methods

* [sendMessageToContact](chatserviceprovider.md#sendmessagetocontact)

## Methods

### sendMessageToContact

▸ **sendMessageToContact**(`message`: [MessageToContact](messagetocontact.md)): Promise\<string \| undefined>

*Defined in [js-miniapp-sdk/src/modules/chat-service.ts:13](https://github.com/rakutentech/js-miniapp/blob/94e5592/js-miniapp-sdk/src/modules/chat-service.ts#L13)*

Opens a contact chooser which allows the user to choose a single contact,
and then sends the message to the chosen contact.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | [MessageToContact](messagetocontact.md) | The message to send to contact. |

**Returns:** Promise\<string \| undefined>

Promise resolves with the Unique ID which was sent the message.
Can also resolve with empty (undefined) response in the case that the message was not sent to a contact, such as if the user cancelled sending the message.
Promise rejects in the case that there was an error.
