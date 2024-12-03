import axios from "axios"
import { Request, Response } from "express";
import * as dotenv from 'dotenv';

dotenv.config();

export const convertBitcoinPrice = async (req: Request, res: Response) => {
    //Find current Bitcoin price
    const coindDeskURL = "https://api.coindesk.com/v1/bpi/currentprice.json"
    const bitcoinPrice = await axios.get(coindDeskURL);
    if(bitcoinPrice.status != 200){
        return res.status(bitcoinPrice.status).json({message: bitcoinPrice.statusText});
    }

    //Get Bitcoin price in USD rate
    const btcToUsdData = bitcoinPrice.data.bpi.USD;
    const btcToUsdRate = Number(btcToUsdData.rate.replace(/,/g, ''));

    //Convert USD to IDR
    const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY;
    const exchangeRateApiUrl = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/USD/IDR/${btcToUsdRate}`
    const response = await axios.get(exchangeRateApiUrl);

    if(response.status != 200){
        return res.status(bitcoinPrice.status).json({message: response.statusText});
    }

    //Generate success response
    const priceOfOneBTC = response.data.conversion_result;
    const priceOfTotalBTC = priceOfOneBTC*Number(req.params.value);
    const idrFormatResult = formatToIDR(priceOfTotalBTC);

    return res.status(200).json({data: idrFormatResult});
}

const formatToIDR = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2, // Optional: Set the number of decimal places
      maximumFractionDigits: 2, // Optional: Limit the decimal places
    }).format(value);
};