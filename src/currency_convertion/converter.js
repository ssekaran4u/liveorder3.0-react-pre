import React, { Component } from 'react';

class converter extends Component {
    render() {
        const {number} = this.props
        if(number && number != undefined ){
            var x=number;
            
            x=x.toString();
            var lastThree = x.substring(x.length-3);
            var otherNumbers = x.substring(0,x.length-3);
            if(otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        }
        return (
            <div>
                <i class="fa fa-inr" aria-hidden="true"></i> {res}
            </div>
        );
    }
}

export default converter;