import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const fakeData = [
  { month: "ENE", val: "0" },
  { month: "FEB", val: "20" },
  { month: "MAR", val: "40" },
  { month: "ABR", val: "60" },
  { month: "MAY", val: "80" },
  { month: "JUN", val: "70" },
  { month: "JUL", val: "100" },
  { month: "AGO", val: "30" },
  { month: "SEP", val: "50" },
  { month: "OCT", val: "90" },
  { month: "NOV", val: "50" },
  { month: "DIC", val: "100" },
];

const colors = {
  val: { stroke: "#2962FF", fill: "#2962FF5D" },
  text: "#615E83",
  month: "#CBD5E1",
  background: "#142B6A",
};

function Chart() {
  return (
    <ResponsiveContainer height={300} width="100%">
      <AreaChart data={fakeData}>
        <XAxis
          dataKey="month"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <YAxis
          //  unit="$"
          // dataKey="val"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />

        <CartesianGrid strokeDasharray="4" />

        <Tooltip
          contentStyle={{
            backgroundColor: colors.background,
            color: colors.month,
          }}
        />

        <Area
          dataKey="val"
          type="monotone"
          stroke={colors.val.stroke}
          fill={colors.val.fill}
          strokeWidth={2}
          name="Valor"
          // unit="$"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
