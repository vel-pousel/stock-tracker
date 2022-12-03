/**
 * Model to holds company Stock Sentiments
 */
export class StockSentiment {
    symbol: string;
    year: number;
    month: number;
    change: number;
    mspr: number;
    companyName?: string;
    monthName?: string;
}
