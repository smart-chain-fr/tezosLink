import classes from "./classes.module.scss"
import React from 'react';

// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type RPCUsage = {
  id: string
  label: string
  value: number
}

type IProps = {
  rpcUsage: RPCUsage[],
  rpcTotalCount: number
}

type IState = {
  options: ApexCharts.ApexOptions,
  series: ApexNonAxisChartSeries
  componentMount: boolean
}

export default class RpcUsage extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);

    this.state = {
      options: {
        labels: this.props.rpcUsage.map(element => element.label),
        legend: {
          show: false
        },
        stroke: {
          show: false
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: '75%',
              labels: {
                show: true,
                value: {
                  color: 'grey',
                  fontSize: '2.5em'
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: "TOTAL REQUESTS",
                  color: 'grey',
                  fontSize: '1em'
                }
              }
            }
          }
        }
      },
      series: this.props.rpcUsage.map(element => element.value),
      componentMount: false
    };
  }



  public override render() {
    return (<div className={classes["root"]}>
      <div className={classes["title"]}>rpc usage</div>
      {
        this.props.rpcUsage.length > 0 ? (
          <>
            <div className={classes["container"]}>
              {this.state.componentMount === true &&
                <Chart options={this.state.options}
                  series={this.state.series}
                  type='donut'
                  height='160%'
                  width='100%'
                />
              }
            </div>
          </>
        ) : (
          <div className={classes["no-data"]}>No data</div>
        )
      }
    </div>)
  }

  override componentDidMount(): void {
    // to avoid hydration error with ssr
    this.setState({ componentMount: true });
  }
}