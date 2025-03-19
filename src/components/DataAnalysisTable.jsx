// From: https://observablehq.com/@d3/donut-chart/2
// Wrapped in function for call from React.

import * as d3 from 'd3'
import { useState, useEffect } from 'react'

export default function DataAnalysisTable() {
    const [state, setState] = useState([])      // List of records
    
    useEffect(() => {
        d3.csv("http://localhost:5050/data-analysis").then(data => {
            console.log(data)
            setState(data.slice(0, 20))
        })
        }, [])

    if (state.length > 0) {
        // Get the keys (column names) by look at the first object in the data set:
        const keys = Object.keys(state[0])      //  Will fail on empty CSV state

        return (
            <div>
                <h1>CSV Data Fetch</h1>

                <table>
                    <thead>
                        <tr>
                            { /* Header row of column names: */ }
                            { keys.map((k, i) => <th>{ k }</th>) }
                        </tr>
                    </thead>
                    <tbody>
                        { state.map(
                            /* For each row, pull out fields according to the headers: */
                            (row, i) => <tr key={ i }>
                                { keys.map(k => <td>{ row[k] }</td>) }
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
        )
    } else {
        return <div>State is empty</div>
    }
}
