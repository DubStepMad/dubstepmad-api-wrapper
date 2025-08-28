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

// Tradingcard endpoint fields (matches API spec)
export interface TradingCardOptions {
  avatar?: string;
  title?: string;
  description?: string;
  topLeft?: string;
  bottomLeft?: string;
  bottomRight?: string;
  cardType?: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
}

export type ApiResponse = Promise<ArrayBuffer>;