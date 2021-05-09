import React from "react";
import styled from "styled-components";
import { getPrettyPrice } from "../utils";
import Chart from "./Chart";

const getPercentChange = (from, to) => {
  const delta = to - from;
  return delta / from;
};

const StyledCard = styled.div`
  color: ${(props) => props.inputColor || "palevioletred"};
`;

const ProductSection = ({
  product,
  productPrice,
  productStats,
  currency,
  productCandles,
}) => {
  const percent = getPercentChange(productStats.open, productStats.last);
  const isPositive = percent >= 0;
  const dailyStats = {
    ...productStats,
    percent,
    isPositive,
  };

  const gradientStart = isPositive
    ? "rgba(6, 78, 59, .15)"
    : "rgba(153, 27, 27, .15)";
  const style = {
    backgroundImage: `linear-gradient(to top, ${gradientStart}, rgba(0,0,0,0))`,
  };
  const borderColor = isPositive
    ? "border-green-300 dark:border-green-900"
    : "border-red-300 dark:border-red-900";

  return (
    <div
      style={style}
      className={`p-4 w-64 m-2 border rounded  ${borderColor}`}
    >
      <ProductName currency={currency} product={product} />
      <ProductPrice
        product={product}
        price={productPrice?.price}
        dailyStats={dailyStats}
      />
      <SecondaryStats product={product} dailyStats={dailyStats} />
      <div className="w-full h-24">
        {productCandles && (
          <Chart
            candles={productCandles}
            color={isPositive ? "rgba(16, 185, 129)" : "rgb(239, 68, 68)"}
          />
        )}
      </div>
    </div>
  );
};

const ProductName = ({ currency, product }) => {
  return (
    <div className="text-gray-700 dark:text-gray-400">
      <span className="text-xl">{currency.name}</span>{" "}
      <span className="text-xs">{product.display_name}</span>
    </div>
  );
};

const formatPercent = (percent) => {
  return Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "always",
    maximumFractionDigits: 2,
  }).format(percent);
};

const ProductPrice = ({ product, price, dailyStats }) => {
  const { isPositive, percent } = dailyStats;
  const color = isPositive ? "text-green-500" : "text-red-500";
  return (
    <>
      <span className="text-3xl font-semibold" id={`${product.id}Price`}>
        {price}
      </span>
      <span className={`ml-2 whitespace-nowrap ${color}`}>
        {formatPercent(percent)}
      </span>
    </>
  );
};

const SecondaryStats = ({ product, dailyStats }) => {
  const { minimumFractionDigits } = product;
  const { low, high, volume } = dailyStats;
  return (
    <div className="text-xs">
      <div>
        <span>l: {getPrettyPrice(low, minimumFractionDigits)}</span>
        <span className="ml-4">
          h: {getPrettyPrice(high, minimumFractionDigits)}
        </span>
      </div>
      <div>v: {getPrettyPrice(Math.round(volume))}</div>
    </div>
  );
};

export default React.memo(ProductSection);
