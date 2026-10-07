import {forwardRef} from 'react'
import ReactPDFChart from 'react-pdf-charts'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'
import type {BarChartProps, BarStacks} from '../dynamic-bar-chart'
import {BarChartGradient} from '../dynamic-bar-chart/bar-chart-gradient'

const PdfDynamicBarChart = forwardRef<HTMLDivElement, BarChartProps>(
  ({
    barChart,
    xAxis,
    yAxis,
    cartesianGrid,
    activeIndex,
    tooltip,
    containerClassName,
    barChartShow = 10,
    barDisplayed = 10,
    className,
    bar3D,
    barRadius,
    hasSelection,
    label,
    width = 530,
    height = 200,
    ...props
  }: BarChartProps) => {
    return (
      <ReactPDFChart>
        <BarChart
          width={width}
          height={height}
          accessibilityLayer
          // layout="horizontal"
          // margin={{top: 0, right: 0, left: 0, bottom: 0}}
          {...barChart}
        >
          <defs>
            {(Object.values(props.config) as BarStacks[]).map(
              ({dataKey, startColor, endColor}) => (
                <linearGradient
                  key={`gradient-${dataKey}`}
                  id={`gradient-${dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={startColor} />
                  <stop offset="100%" stopColor={endColor} />
                </linearGradient>
              ),
            )}
          </defs>
          <CartesianGrid
            vertical={false}
            horizontal={false}
            {...cartesianGrid}
          />
          <XAxis
            tick={props => {
              const {x, y, payload, index} = props

              const isActive = index === activeIndex

              return (
                <text
                  key={`xaxis-tick-${index}`}
                  x={x}
                  y={y + 10}
                  fontSize={9}
                  textAnchor="middle"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  fill={isActive ? '#000' : '#333'}
                >
                  {payload.value}
                </text>
              )
            }}
            angle={-50}
            tickLine={false}
            axisLine={false}
            {...xAxis}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            fontSize={10}
            {...yAxis}
          />
          <YAxis
            orientation="left"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            fontSize={10}
          />

          {(Object.values(props.config) as BarStacks[]).map(
            ({dataKey, name, color, startColor, endColor, radius}) => (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                cursor="pointer"
                name={name}
                isAnimationActive={false}
                stackId="a"
                fill={`url(#gradient-${dataKey})`}
                radius={barRadius || radius}
                {...(hasSelection
                  ? {}
                  : {
                      shape: (props: unknown) => (
                        <BarChartGradient
                          startColor={startColor}
                          endColor={endColor}
                          bar3D={bar3D}
                          {...(props as BarRectangleItem)}
                        />
                      ),
                    })}
              >
                {barChart.data?.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    stroke={
                      index === activeIndex
                        ? 'rgba(255, 234, 0, 0.5)'
                        : undefined
                    }
                    strokeWidth={index === activeIndex ? 2 : 0}
                    capHeight={0}
                  />
                ))}
                <LabelList
                  dataKey={dataKey}
                  position="inside"
                  style={{fill: color, fontSize: '11px'}}
                  {...label}
                />
              </Bar>
            ),
          )}
        </BarChart>
      </ReactPDFChart>
    )
  },
)

export {PdfDynamicBarChart}
