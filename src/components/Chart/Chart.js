import { connect } from 'react-redux'
import './Chart.css';
import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { setPermissions  } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

class Chart extends Component {
render () {
    return (
    <ResponsiveBar
        data={[
            {
              "country": "Strongly Disagree",
              "Results": 20,
              "kebabColor": "hsl(0, 0%, 84%)"
            },
            {
              "country": "Disagree",
              "Results": 10,
              "kebabColor": "hsl(0, 0%, 84%)"
            },
            {
              "country": "Indifferent",
              "Results": 18,
              "kebabColor": "hsl(0, 0%, 84%)"
            },
            {
              "country": "Agree",
              "Results": 40,
              "kebabColor": "hsl(0, 0%, 84%)"
            },
            {
              "country": "Strongly Agree",
              "Results": 12,
              "kebabColor": "hsl(0, 0%, 84%)"
            }
        ]}
        keys={["Results"]}
        indexBy="country"
        margin={{
            "top": 36,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.3}
        colors="greys"
        colorBy="id"
        defs={[ ]}
        fill={[ ]}
        borderWidth={1}
        borderRadius={3}
        borderColor="inherit:darker(0.2)"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            "tickSize": 11,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "",
            "legendPosition": "middle",
            "legendOffset": 32
        }}
        axisLeft={{
            "tickSize": 10,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "Percentage %",
            "legendPosition": "middle",
            "legendOffset": -40
        }}
        labelSkipWidth={7}
        enableGridY={false}
        labelSkipHeight={9}
        labelTextColor="inherit:darker(2.4)"
        animate={true}
        motionStiffness={135}
        motionDamping={30}
        isInteractive={false}
        legends={[]}
    />
    )}
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo, setPermissions}, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chart)