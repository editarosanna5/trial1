import React, { Component } from 'react';
import Header from './HeaderComponent';
import {  Button, Label, Col, Row} from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        console.log("Current State is: "+JSON.stringify(values));
        this.props.postFeedback(values.firstname,values.lastname,values.telnum,values.email,values.agree,values.contactType,values.message);
        this.props.resetFeedbackForm();
    }

    
    render(){
        return(
            <div className="container" id="page">
                <Header />
                <div className="row">
                    <div className="col-12">
                        <h3 className="heading">Tentang Kami</h3>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h4>Sejarah Kami</h4>
                        <p style={{textAlign:"justify"}}>
                            Dimulai pada tahun 2020, NewLink diciptakan untuk meningkatkan pengunjung pada mal.
                            Pada tahun tersebut, dunia dilanda oleh pandemi Covid-19 yang menyebabkan perekonomian dunia melesu
                            dan hal ini juga berdampak pada perekonomian Indonesia. Oleh sebab itu, dibuat sebuah sistem yang
                            dapat melakukan monitoring jumlah pengunjung pada mal tersebut agar masyarakat dapat mengetahui
                            informasi jumlah pengunjung pada mal tersebut supaya mereka mengetahui apakah aman untuk mengunjungi
                            mal tersebut.
                        </p>
                        <p style={{textAlign:"justify"}}>
                            Aplikasi terintegrasi dengan sistem hardware yang diletakkan pada pintu masuk dan keluar dari mal.
                            Setiap kali ada pengunjung yang masuk/keluar dari mal tersebut akan diproses oleh kami dan ditampilkan
                            pada aplikasi ini. Dengan adanya aplikasi ini, diharapkan bahwa masyarakat Indonesia dapat mengunjungi
                            kembali mal seperti pada keadaan normal.
                        </p>
                    </div>
                    <div className="col-12">
                        <h4>Informasi Lokasi</h4>
                    </div>
                    <div className="col-12 col-sm-4">
                            <h5>Alamat Kami</h5>
                            <address>
                            Jl. Ganesha no 10<br />
                            Bandung Utara<br />
                            Banten<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:newlink@gmail.com">newlink@gmail.com</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-11">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content" id="form">
                    <div className="col-12">
                        <h3>Kirimkan Kami Tanggapan Anda</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor=".firstname" md={2}>Nama Depan</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="Nama Depan"
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3),maxLength:maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Nama Belakang</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Nama Belakang"
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3),maxLength:maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Nomor Telepon</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Nomor Telepon"
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3),maxLength:maxLength(15),isNumber
                                        }}/>
                                     <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 numbers ',
                                            maxLength: 'Must be 15 numbers or less ',
                                            isNumber: 'Must be a number '
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validEmail: 'Invalid Email Address '
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                                />{' '}
                                                <strong> Apakah kami dapat mengontak Anda?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                            <option>Tel.</option>
                                            <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Tanggapan Anda</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".message"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" className="buttonSubmit">
                                        Kirim Tanggapan
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );    
    }
}

export default Contact;