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
              "HUMINT": this.props.answerObject['HUMINT'] && this.props.includedInts.includes("HUMINT") ? Math.trunc(this.props.answerObject['HUMINT']['Strongly Disagree']) : 0,
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": this.props.answerObject['SIGINT'] && this.props.includedInts.includes('SIGINT') ? Math.trunc(this.props.answerObject['SIGINT']['Strongly Disagree']) : 0,
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": this.props.answerObject['GEOINT'] && this.props.includedInts.includes('GEOINT') ? Math.trunc(this.props.answerObject['GEOINT']['Strongly Disagree']) : 0,
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": this.props.answerObject['OSINT'] && this.props.includedInts.includes('OSINT') ? Math.trunc(this.props.answerObject['OSINT']['Strongly Disagree']) : 0,
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT":this.props.answerObject['CYBINT/DNINT'] && this.props.includedInts.includes('CYBINT/DNINT') ? Math.trunc(this.props.answerObject['CYBINT/DNINT']['Strongly Disagree']) : 0,
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": this.props.answerObject['FININT'] && this.props.includedInts.includes('FININT') ? Math.trunc(this.props.answerObject['FININT']['Strongly Disagree']) : 0,
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": this.props.answerObject['MASINT'] && this.props.includedInts.includes('MASINT') ? Math.trunc(this.props.answerObject['MASINT']['Strongly Disagree']) : 0,
              "MASINTColor": "hsl(99, 70%, 90%)",
              "TECHINT": this.props.answerObject['TECHINT'] && this.props.includedInts.includes('TECHINT') ? Math.trunc(this.props.answerObject['TECHINT']['Strongly Disagree']) : 0,
              "TECHINTColor": "hsl(190, 70%, 90%)",
            },
            {
              "opinion": "Disagree",
              "HUMINT": this.props.answerObject['HUMINT'] && this.props.includedInts.includes("HUMINT") ? Math.trunc(this.props.answerObject['HUMINT']['Disagree']) : 0,
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": this.props.answerObject['SIGINT'] && this.props.includedInts.includes('SIGINT') ? Math.trunc(this.props.answerObject['SIGINT']['Disagree']) : 0,
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": this.props.answerObject['GEOINT'] && this.props.includedInts.includes('GEOINT') ? Math.trunc(this.props.answerObject['GEOINT']['Disagree']) : 0,
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": this.props.answerObject['OSINT'] && this.props.includedInts.includes('OSINT') ? Math.trunc(this.props.answerObject['OSINT']['Disagree']) : 0,
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": this.props.answerObject['CYBINT/DNINT'] && this.props.includedInts.includes('CYBINT/DNINT') ? Math.trunc(this.props.answerObject['CYBINT/DNINT']['Disagree']) : 0,
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": this.props.answerObject['FININT'] && this.props.includedInts.includes('FININT') ? Math.trunc(this.props.answerObject['FININT']['Disagree']) : 0,
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": this.props.answerObject['MASINT'] && this.props.includedInts.includes('MASINT') ? Math.trunc(this.props.answerObject['MASINT']['Disagree']) : 0,
              "MASINTColor": "hsl(99, 70%, 90%)",
              "TECHINT": this.props.answerObject['TECHINT'] && this.props.includedInts.includes('TECHINT') ? Math.trunc(this.props.answerObject['TECHINT']['Disagree']) : 0,
              "TECHINTColor": "hsl(190, 70%, 90%)",
            },
            {
              "opinion": "Indifferent",
              "HUMINT": this.props.answerObject['HUMINT'] && this.props.includedInts.includes("HUMINT") ? Math.trunc(this.props.answerObject['HUMINT']['Indifferent']) : 0,
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": this.props.answerObject['SIGINT'] && this.props.includedInts.includes('SIGINT') ? Math.trunc(this.props.answerObject['SIGINT']['Indifferent']) : 0,
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": this.props.answerObject['GEOINT'] && this.props.includedInts.includes('GEOINT') ? Math.trunc(this.props.answerObject['GEOINT']['Indifferent']) : 0,
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": this.props.answerObject['OSINT'] && this.props.includedInts.includes('OSINT') ? Math.trunc(this.props.answerObject['OSINT']['Indifferent']) : 0,
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": this.props.answerObject['CYBINT/DNINT'] && this.props.includedInts.includes('CYBINT/DNINT') ? Math.trunc(this.props.answerObject['CYBINT/DNINT']['Indifferent']) : 0,
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": this.props.answerObject['FININT'] && this.props.includedInts.includes('FININT') ? Math.trunc(this.props.answerObject['FININT']['Indifferent']) : 0,
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": this.props.answerObject['MASINT'] && this.props.includedInts.includes('MASINT') ? Math.trunc(this.props.answerObject['MASINT']['Indifferent']) : 0,
              "MASINTColor": "hsl(99, 70%, 90%)",
              "TECHINT": this.props.answerObject['TECHINT'] && this.props.includedInts.includes('TECHINT') ? Math.trunc(this.props.answerObject['TECHINT']['Indifferent']) : 0,
              "TECHINTColor": "hsl(190, 70%, 90%)",
            },
            {
              "opinion": "Agree",
              "HUMINT": this.props.answerObject['HUMINT'] && this.props.includedInts.includes("HUMINT") ? Math.trunc(this.props.answerObject['HUMINT']['Agree']) : 0,
              "HUMINTColor": "hsl(313, 70%, 50%)",
              "SIGINT": this.props.answerObject['SIGINT'] && this.props.includedInts.includes('SIGINT') ? Math.trunc(this.props.answerObject['SIGINT']['Agree']) : 0,
              "SIGINTColor": "hsl(316, 70%, 50%)",
              "GEOINT": this.props.answerObject['GEOINT'] && this.props.includedInts.includes('GEOINT') ? Math.trunc(this.props.answerObject['GEOINT']['Agree']) : 0,
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": this.props.answerObject['OSINT'] && this.props.includedInts.includes('OSINT') ? Math.trunc(this.props.answerObject['OSINT']['Agree']) : 0,
              "OSINTColor": "hsl(139, 70%, 50%)",
              "CYBINT/DNINT": this.props.answerObject['CYBINT/DNINT'] && this.props.includedInts.includes('CYBINT/DNINT') ? Math.trunc(this.props.answerObject['CYBINT/DNINT']['Agree']) : 0,
              "CYBINT/DNINTColor": "hsl(111, 70%, 50%)",
              "FININT": this.props.answerObject['FININT'] && this.props.includedInts.includes('FININT') ? Math.trunc(this.props.answerObject['FININT']['Agree']) : 0,
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT": this.props.answerObject['MASINT'] && this.props.includedInts.includes('MASINT') ? Math.trunc(this.props.answerObject['MASINT']['Agree']) : 0,
              "MASINTColor": "hsl(99, 70%, 90%)",
              "TECHINT": this.props.answerObject['TECHINT'] && this.props.includedInts.includes('TECHINT') ? Math.trunc(this.props.answerObject['TECHINT']['Agree']) : 0,
              "TECHINTColor": "hsl(190, 70%, 90%)",
            },
            {
              "opinion": "Strongly Agree",
              "HUMINT":  this.props.answerObject['HUMINT'] && this.props.includedInts.includes("HUMINT") ? Math.trunc(this.props.answerObject['HUMINT']['Strongly Agree']) : 0,
              "HUMINTColor": "hsl(31, 70%, 50%)",
              "SIGINT":  this.props.answerObject['SIGINT'] && this.props.includedInts.includes('SIGINT') ? Math.trunc(this.props.answerObject['SIGINT']['Strongly Agree']) : 0,
              "SIGINTColor": "hsl(31, 70%, 50%)",
              "GEOINT":  this.props.answerObject['GEOINT'] && this.props.includedInts.includes('GEOINT') ? Math.trunc(this.props.answerObject['GEOINT']['Strongly Agree']) : 0,
              "GEOINTColor": "hsl(55, 70%, 50%)",
              "OSINT": this.props.answerObject['OSINT'] && this.props.includedInts.includes('OSINT') ? Math.trunc(this.props.answerObject['OSINT']['Strongly Agree']) : 0,
              "OSINTColor": "hsl(19, 70%, 50%)",
              "CYBINT/DNINT":  this.props.answerObject['CYBINT/DNINT'] && this.props.includedInts.includes('CYBINT/DNINT') ? Math.trunc(this.props.answerObject['CYBINT/DNINT']['Strongly Agree']) : 0,
              "CYBINT/DNINTColor": "hsl(1 70%, 50%)",
              "FININT":  this.props.answerObject['FININT'] && this.props.includedInts.includes('FININT') ? Math.trunc(this.props.answerObject['FININT']['Strongly Agree']) : 0,
              "FININTColor": "hsl(226, 70%, 50%)",
              "MASINT":  this.props.answerObject['MASINT'] && this.props.includedInts.includes('MASINT') ? Math.trunc(this.props.answerObject['MASINT']['Strongly Agree']) : 0,
              "MASINTColor": "hsl(99, 70%, 90%)",
              "TECHINT": this.props.answerObject['TECHINT'] && this.props.includedInts.includes('TECHINT') ? Math.trunc(this.props.answerObject['TECHINT']['Strongly Agree']) : 0,
              "TECHINTColor": "hsl(190, 70%, 90%)",
            }
        ]}
        keys={Object.keys(this.props.answerObject)}
        indexBy="opinion"
        groupMode="stacked"
        margin={{
            "top": 36,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.3}
        labelTextColor='inherit:darker(4)'
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
                "color": "#d5d5d5",
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
            "tickSize": 0,
            "tickPadding": 0,
            "tickRotation": 0,
            "legend": "Percent %",
            "legendPosition": "middle",
            "legendOffset": -40
        }}
        borderRadius={1}
        borderWidth={.3}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={true}
        motionStiffness={235}
        motionDamping={30}
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