import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler,NavItem, Jumbotron, Button, Modal, ModalHeader,ModalBody, Form, FormGroup, Input,Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { findByPlaceholderText } from '@testing-library/react';

class Navigation extends Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
        };
    }

    render(){
        return(
            <React.Fragment>
                <Navbar dark className="navbar fixed-bottom">
                    <div className="container d-flex flex-row justify-content-around w-100">
                        <Nav navbar>
                            <NavItem className="textMenu">
                                <NavLink className="nav-link" to="/how-to-use" activeStyle={{color:'white',fontWeight:'bold'}}>
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <div className="fa fa-question-circle fa-2x"></div>
                                        <div>Petunjuk</div>
                                    </div> 
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem className="textMenu">
                                <NavLink className="nav-link" to="/home" activeStyle={{color:'white',fontWeight:'bold'}}> 
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <div className="fa fa-home fa-2x"></div>
                                        <div>Beranda</div>
                                    </div> 
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem className="textMenu">
                                <NavLink className="nav-link" to="/about" activeStyle={{color:'white',fontWeight:'bold'}}>
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <div className="fa fa-info-circle fa-2x"></div>
                                        <div>Tentang</div>
                                    </div> 
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Navigation;