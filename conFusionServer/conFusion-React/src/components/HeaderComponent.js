import React, { Component } from 'react';

class Header extends Component {

    render(){
        return(
            <div className="container">
                <div className="row" id="title">
                    <div className="col-12">
                        <h2 id="productName">NEWLINK</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;