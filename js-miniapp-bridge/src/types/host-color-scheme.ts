/** Host Color Scheme type. */
export interface ColorModel {
  r?: string;
  g?: string;
  b?: string;
  
}

export interface HostColorScheme {
  primaryColor?: ColorModel;
  secondaryColor?: ColorModel;
}
