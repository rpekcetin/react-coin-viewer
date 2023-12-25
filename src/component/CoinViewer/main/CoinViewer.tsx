import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CoinViewer.css';
import { CoinViewerProps, CoinViewerState } from '../types/types';

const CoinViewer = ({ coin, color, shadow }: CoinViewerProps) => {
    const [coinInfo, setCoinInfo] = useState<CoinViewerState>({
        price: '',
        percentage: '',
        image: ''
    });

    const getCoinData = async (coinId: string) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
            const coinData = response.data;

            return {
                price: `$${coinData.market_data.current_price.usd.toFixed(2)}`,
                percentage: `${coinData.market_data.price_change_percentage_24h.toFixed(2)}%`,
                image: coinData.image.large
            };
        } catch (error) {
            console.error("Hata:", error);
            return null;
        }
    };

    const coinFetchFunc = async () => {
        const coinData = await getCoinData(coin ?? 'bitcoin');
        if (coinData) {
            setCoinInfo(coinData);
        }
    };

    useEffect(() => {
        coinFetchFunc();
        const interval = setInterval(coinFetchFunc, 10000);
        return () => clearInterval(interval);
    }, [coin]); 

    return (
        <div className='coin-viewer' style={{ color: color, boxShadow: shadow }}>
            <img src={coinInfo.image} alt={`${coin} logo`} style={{ width: '40px', height: '50px' }} />
            <div>
                <p>Price: {coinInfo.price}</p>
                <p>24h Change: {coinInfo.percentage}</p>
            </div>
        </div>
    );
};

export default CoinViewer;
