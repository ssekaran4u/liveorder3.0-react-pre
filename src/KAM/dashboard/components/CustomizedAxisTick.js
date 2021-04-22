import React,{Component} from 'react'
import { ResponsiveContainer,ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip,Bar,Legend, Text } from 'recharts';

class CustomizeAxisTick extends Component{

    render () {
        const {x, y, payload} = this.props;
		
        return <Text x={x} y={y} width={75}  tick={{ fill: 'red' }} textAnchor="middle" angle={-35}  textAnchor="end" interval={0} verticalAnchor="start">{payload.value}</Text>
      
}
}
export default CustomizeAxisTick