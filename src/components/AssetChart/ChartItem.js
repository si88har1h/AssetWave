import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ThemeContext } from "../../context/theme-context";
import { useContext } from "react";
import styles from "./ChartItem.module.css";

const ChartItem = (props) => {
  const themeCtx = useContext(ThemeContext);
  const cartesianOpacity = themeCtx.theme === "dark" ? 0.2 : 1;
  const stroke = props.change > 0 ? "#00c624" : "red";

  return (
    <ResponsiveContainer height="50%">
      <AreaChart
        data={props.priceData}
        style={{
          margin: "2rem 0 1rem 0rem",
          transform: "scale(0.9)",
          padding: "1rem 0.5rem 1rem",
        }}
        margin={{ top: 0, right: 8, bottom: 5, left: 0 }}
      >
        <XAxis
          dataKey="id"
          interval="preserveStart"
          tick={{
            fill: `#a8a8a8`,
            fontSize: "1.4rem",
          }}
          tickCount={3}
          minTickGap={50}
        />
        <YAxis
          type="number"
          domain={["0", "auto"]}
          orientation="right"
          tickLine={false}
          tickFormatter={(tick) => `${props.checkPrice(tick, "tick")}`}
          tick={{
            fill: `#a8a8a8`,
            fontSize: "1.4rem",
          }}
          unit={"$"}
          width={props.checkPrice(props.price, "tick").length > 8 ? 80 : 60}
        />
        <defs>
          <linearGradient id={`color${stroke}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.8"></stop>
            <stop offset="90%" stopColor={stroke} stopOpacity="0.2"></stop>
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          stroke={stroke}
          strokeWidth={3}
          fill={`url(#color${stroke})`}
        />
        <CartesianGrid opacity={cartesianOpacity} />
        <Tooltip
          content={<CustomTooltip checkPrice={props.checkPrice} />}
          payload={props.priceData}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, checkPrice }) => {
  if (active) {
    return (
      <div className={styles.tooltip}>
        <h4>$ {checkPrice(payload[0].payload.price, "tooltip")}</h4>
        <p>at {payload[0].payload.id}</p>
      </div>
    );
  } else {
    return;
  }
};

export default ChartItem;
