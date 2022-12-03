
/**
 * Model to holds stock information
 */
export class StockInfo {
    symbol?: string;
    companyName?: string;
    currentPrice: number;
    changePrice: number;
    percentChange: number;
    highPriceOfDay: number;
    lowPriceOfDay: number;
    openPriceOfDay: number;
    prevClosePrice: number;
    trending: number;

    constructor(body?: JSON) {
        this.currentPrice = body['currentPrice'];
        this.changePrice = body['changePrice'];
        this.percentChange = body['percentChange'];
        this.highPriceOfDay = body['highPriceOfDay'];
        this.lowPriceOfDay = body['lowPriceOfDay'];
        this.openPriceOfDay = body['openPriceOfDay'];
        this.prevClosePrice = body['prevClosePrice'];
        this.trending = body['trending'];
    }
}
