export interface CoinViewerProps {
    coin?: string,
    shadow?: string,
    symbol?: string,
    theme?: 'dark' | 'light' | undefined
}

export interface CoinViewerState {
    price: string,
    percentage: string,
    image: string
}

export interface CoinViewerStory {
    title: string;
    component: ({ coin, symbol, theme, shadow }: CoinViewerProps) => React.JSX.Element;
    tags: string[];
}