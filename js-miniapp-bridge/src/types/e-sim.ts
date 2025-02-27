/** Esim Configuration Type */
export interface EsimConfig {
  address: string; // smdpAddress
  confirmationCode?: string; // activationLink
  eid?: string;
  iccid?: string;
  matchingId?: string;
  oid?: string;
}
