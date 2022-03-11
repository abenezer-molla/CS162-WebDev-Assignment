
import React from 'react'
import { Typography } from '@material-ui/core'

import {Card, CardContent} from "@material-ui/core"; 

function Task(props) {
  return (
    <Card style = {{ padding : 10, margin : 10, width : "fit-content"}}>
        <CardContent>

            <Typography color = "white" variant = "h5" component = "h2">
                {props.text}
                
            
            </Typography>
        </CardContent>
    </Card>

  )
}

export default Task