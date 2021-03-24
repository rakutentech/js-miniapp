/** @internal */
export interface NativeTokenData {
  token: string;
  validUntil: number;
  scopes?: NativeTokenPermission;
}

/** @internal */
export interface NativeTokenPermission {
  audience?: string;
  scopes?: [string];
}

/** Token data type. */
export class AccessTokenData {
  readonly token: string;
  readonly validUntil: Date;
  readonly scopes: AccessTokenPermission;

  constructor(baseToken: NativeTokenData) {
    this.token = baseToken.token;
    this.validUntil = new Date(baseToken.validUntil);
    this.scopes = new AccessTokenPermission(baseToken.scopes);
  }
}

/** Token permission type. */
export class AccessTokenPermission {
  readonly audience?: string;
  readonly scopes?: [string];

  constructor(basePermission: NativeTokenPermission) {
    this.audience = basePermission.audience;
    this.scopes = basePermission.scopes;
  }
}
