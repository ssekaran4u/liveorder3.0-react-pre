import React, { Component } from "react";
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import AverageSalesTooltip from "./avearage_sales_tooltip";

const data = [
    {
      name: 'Jan', uv: 10, pv: 24
    },
    {
      name: 'Feb', uv: 18, pv: 48
    },
    {
      name: 'Mar', uv: 23, pv: 68
    },
    {
      name: 'Apr', uv: 34, pv: 39
    },
    {
      name: 'May', uv: 31, pv: 48
    },
    {
      name: 'Jun', uv: 45, pv: 48
    },
    {
      name: 'Jul', uv: 40, pv: 43
    },
    {
      name: 'Aug', uv: 42, pv: 78
    },
    {
      name: 'Sep', uv: 65, pv: 68
    },
    {
      name: 'Oct', uv: 55, pv: 78
    },
    {
      name: 'Nov', uv: 32, pv: 58
    },
    {
      name: 'Dec', uv: 45, pv: 50
    },
  ];

  class DetailedViewOfDistributor extends Component{
      render(){
          return(
              <div>
                  <ResponsiveContainer width='100%' height={400}>
                        <ComposedChart
                            strokeWidth={2}
                            data={data}
                            margin={{ top: 50, right: 20, left: 2, bottom: 40, }}>
                            <CartesianGrid strokeDasharray="2" />
                            <XAxis dataKey="name" />
                            <YAxis type="number" domain={[0, 80]} />
                            <Tooltip content={<AverageSalesTooltip />} />
                            {/* <Area type="monotone" dataKey="uv" stroke="#1515af" fill="rgb(229, 235, 248)" fill-opacity="0.4" /> */}
                            <Area
                                className="backwave"
                                type="monotone"
                                dataKey="uv"
                                fill="true"
                                stroke="none"
                            />
                            <Bar
                                dataKey="pv"
                                barSize={18}
                                fill="#1515af"
                                opacity={0.9}
                                className="stokiest-profile-bargraph"
                                radius={[5, 5, 0, 0]}
                            />
                            <Line
                                dataKey="uv"
                                type="monotone"
                                stroke="#f49917"
                                strokeWidth={3}
                                activeDot={{ r: 3 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
              </div>
          )
      }
  }

  export default DetailedViewOfDistributor;
  