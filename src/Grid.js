import React, { Component,Fragment } from "react";
import BeeGrid from "bee-complex-grid";
import { gridDefalutProps,paginationDefaultProps } from './defaultProps'


class Grid extends Component{

    render(){
        let paginationObj = Object.assign(this.props.paginationObj,paginationDefaultProps);
        gridDefalutProps.paginationObj = paginationObj;
        let props = {
            ...gridDefalutProps,
            ...this.props
        }
        return <div className='ac-gridcn'>
            <BeeGrid {...props}/>
        </div>
    }
}

export default Grid;