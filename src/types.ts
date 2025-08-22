export interface MemeOptions {
  text?: string;
  text1?: string;
  text2?: string;
}

export interface ImageFilterOptions {
  image: string;
  amount?: number;
  factor?: number;
}

export interface BuilderOptions {
  background?: string;
  avatar?: string;
  title?: string;
  subtitle?: string;
  text1?: string;
  text2?: string;
  textColor?: string;
}

export type ApiResponse = Promise<ArrayBuffer>;