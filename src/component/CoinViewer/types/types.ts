export interface CoinViewerProps {
    coin?: string,
    color?: string,
    shadow?: string
}

export interface CoinViewerState {
    price: string,
    percentage: string,
    image: string
}

export interface CoinViewerStory {
    title: string;
    component: ({ coin, color, shadow }: CoinViewerProps) => React.JSX.Element;
    tags: string[];
}