import type { Meta, StoryObj } from '@storybook/react';
import CoinViewer from '../main/CoinViewer';
import { CoinViewerStory } from '../types/types';

const meta: CoinViewerStory = {
    title: 'React Coin Viewer',
    component: CoinViewer,
    tags: ['autodocs'],
} satisfies Meta<typeof CoinViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
    },
};