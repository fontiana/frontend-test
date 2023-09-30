import React from 'react';
import {
  NegativePriceBox,
  PositivePriceBox,
} from '../../assets/styles/DashboardPricebox';

interface DashboardPriceBoxProps {
  priceChange: number;
}

export default function DashboardPriceBox({
  priceChange,
}: DashboardPriceBoxProps) {
  return (
    <>
      {priceChange > 0 ? (
        <PositivePriceBox>{priceChange}%</PositivePriceBox>
      ) : (
        <NegativePriceBox>{priceChange}%</NegativePriceBox>
      )}
    </>
  );
}
