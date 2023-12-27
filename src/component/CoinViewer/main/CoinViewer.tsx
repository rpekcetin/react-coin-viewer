import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CoinViewer.css';
import { CoinViewerProps, CoinViewerState } from '../types/types';
import '@fontsource/quicksand'
import '@fontsource-variable/quicksand';

const CoinViewer = ({ symbol, coin, shadow, theme }: CoinViewerProps) => {
    const [coinInfo, setCoinInfo] = useState<CoinViewerState>({
        price: '',
        percentage: '',
        image: ''
    });

    useEffect(() => {
        const fetchCoinImage = async () => {
            try {
                const coinId = coin ?? 'bitcoin'
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
                setCoinInfo(prevState => ({
                    ...prevState,
                    image: response.data.image.large
                }));
            } catch (error) {
                console.error("Resim çekme hatası:", error);
                setCoinInfo(prevState => ({
                    ...prevState,
                    image: 'undefined'
                }));
            }
        };

        fetchCoinImage();

        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol ?? 'btcusdt'}@ticker`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setCoinInfo(prevState => ({
                ...prevState,
                price: `$${parseFloat(data.c).toFixed(2)}`,
                percentage: `${parseFloat(data.P).toFixed(2)}%`
            }));
        };

        return () => {
            ws.close();
        };
    }, [symbol ?? 'btcusdt']);

    return (
        <div className={`coin-viewer ${theme ?? 'light'}`}>
            <div>
                {
                    coinInfo.image === '' || coinInfo.image === 'undefined' ? (
                        <div className="coin-image-loader"></div>
                    ) : (
                        <img src={coinInfo.image} alt={`${coin} logo`} className='coin-image' />
                    )
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    coinInfo.price === '' ? (
                        <div className="coin-price-loader"></div>
                    ) : (
                        <span className='coin-price'>{coinInfo.price}</span>
                    )
                }
                {
                    coinInfo.percentage === '' ? (
                        <div className="coin-percentage-loader"></div>
                    ) : (
                        <span className={`coin-percentage coin-percentage-${parseInt(coinInfo.percentage.replace('%', '')) > 0 ? 'increase' : 'decrease'}`}>{coinInfo.percentage}</span>
                    )
                }
            </div>
        </div>
    );
};

export default CoinViewer;
