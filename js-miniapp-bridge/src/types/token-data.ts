/** @internal */
export interface NativeTokenData {
  token: string;
  validUntil: number;
  permission?: NativeTokenPermission;
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
  readonly permission: AccessTokenPermission;

  constructor(baseToken: NativeTokenData) {
    this.token = baseToken.token;
    this.validUntil = new Date(baseToken.validUntil);
    this.permission = new AccessTokenPermission(baseToken.permission);
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
