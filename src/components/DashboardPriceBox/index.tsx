import React from 'react';
import {
  NegativePriceBox,
  PositivePriceBox,
} from '../../assets/styles/DashboardPriceBox';

interface DashboardPriceBoxProps {
  priceChange: string;
}

export default function DashboardPriceBox({
  priceChange,
}: DashboardPriceBoxProps) {
  return (
    <>
      {Number(priceChange) > 0 ? (
        <PositivePriceBox>{priceChange}%</PositivePriceBox>
      ) : (
        <NegativePriceBox>{priceChange}%</NegativePriceBox>
      )}
    </>
  );
}
