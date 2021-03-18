/** @internal */
export interface NativeTokenData {
  token: string;
  validUntil: number;
  audience?: string;
  scopes?: [string];
}

/** Token data type. */
export class AccessTokenData {
  readonly token: string;
  readonly validUntil: Date;
  readonly audience?: string;
  readonly scopes?: [string];

  constructor(baseToken: NativeTokenData) {
    this.token = baseToken.token;
    this.validUntil = new Date(baseToken.validUntil);
    this.audience = baseToken.audience;
    this.scopes = baseToken.scopes;
  }
}
