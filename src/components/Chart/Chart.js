import { connect } from 'react-redux'
import './Chart.css';
import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { setPermissions  } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

class Chart extends Component {

constructor(props){
    super(props)
}

render () {
    return (
    <ResponsiveBar
        data={[
            {
              "opinion": "Strongly Disagree",
              "HUMINT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": Math.trunc(this.props.answerObject['Strongly Disagree']),
              "MASINTColor": "hsl(99, 70%, 90%)",
            },
            {
              "opinion": "Disagree",
              "HUMINT": Math.trunc(this.props.answerObject['Disagree']),
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": Math.trunc(this.props.answerObject['Disagree']),
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": Math.trunc(this.props.answerObject['Disagree']),
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": Math.trunc(this.props.answerObject['Disagree']),
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": Math.trunc(this.props.answerObject['Disagree']),
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": Math.trunc(this.props.answerObject['Disagree']),
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": Math.trunc(this.props.answerObject['Disagree']),
              "MASINTColor": "hsl(99, 70%, 90%)",
            },
            {
              "opinion": "Indifferent",
              "HUMINT": Math.trunc(this.props.answerObject['Indifferent']),
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": Math.trunc(this.props.answerObject['Indifferent']),
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": Math.trunc(this.props.answerObject['Indifferent']),
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": Math.trunc(this.props.answerObject['Indifferent']),
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": Math.trunc(this.props.answerObject['Indifferent']),
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": Math.trunc(this.props.answerObject['Indifferent']),
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": Math.trunc(this.props.answerObject['Indifferent']),
              "MASINTColor": "hsl(99, 70%, 90%)",
            },
            {
              "opinion": "Agree",
              "HUMINT": Math.trunc(this.props.answerObject['Agree']),
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": Math.trunc(this.props.answerObject['Agree']),
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": Math.trunc(this.props.answerObject['Agree']),
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": Math.trunc(this.props.answerObject['Agree']),
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": Math.trunc(this.props.answerObject['Agree']),
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": Math.trunc(this.props.answerObject['Agree']),
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": Math.trunc(this.props.answerObject['Agree']),
              "MASINTColor": "hsl(99, 70%, 90%)",
            },
            {
              "opinion": "Strongly Agree",
              "HUMINT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": Math.trunc(this.props.answerObject['Strongly Agree']),
              "MASINTColor": "hsl(99, 70%, 90%)",
            }
        ]}
        keys={["HUMINT",  "SIGINT", "GEOINT", "OSINT", "CYBINT/DNINT", "FININT", "MASINT"]}
        indexBy="opinion"
        groupMode="grouped"
        margin={{
            "top": 36,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.3}
        colors="blues"
        colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#D5D5D5",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "CYBINT/DNINT"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "GEOINT"
                },
                "id": "lines"
            }
        ]}
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
        borderRadius={3}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "dataFrom": "keys",
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}
    />
    )}
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({getUserInfo, setPermissions}, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chart)