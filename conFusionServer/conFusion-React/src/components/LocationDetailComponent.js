import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Modal, ModalHeader,ModalBody,Label,Col,Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { reactBaseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import Header from './HeaderComponent';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StarRatingComponent from 'react-star-rating-component';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len); 

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.locationId,values.rating,values.author,values.comment);
    }

    render(){
        return(
            <div className="row" style={{paddingBottom:"150px"}}>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span>Submit Comment
                </Button>          
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor=".rating">Rating</Label>
                            <Row className="form-group">    
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control"
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Label htmlFor="author">Your Name</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3), maxLength:maxLength(15)
                                        }}/>
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                                </Col>
                            </Row>
                            <Label htmlFor="comment">Comment</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" rows="6"
                                    className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderLocation({location}) {
    if (location != null) {
        return(
            <FadeTransform in
                transfromProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card id="description">
                    <CardImg top src={baseUrl + location.image} alt={location.name} />
                    <CardBody>
                        <CardTitle>{location.name}</CardTitle>
                        <CardText>{location.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }else{
        return(
            <div></div>
        );
    }
}

function RenderComments({comments,postComment, locationId}) {
    
    let returnedComm = comments.map(comment => {
        return (
            <Fade in>
                <li key={comment._id}>
                    <p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.createdAt)))}</p>
                    <StarRatingComponent name="rating" editing={false} starCount={5} value={comment.rating}/>
                    <p style={{fontStyle:"italic"}}>"{comment.comment}"</p>    
                </li>
            </Fade>
        );
    }) 
    if (comments != null){
        return(
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {returnedComm}
                    </Stagger>
                </ul>
                <CommentForm locationId={locationId} postComment={postComment}/> 
            </div>
        );
    } else
        return(
            <div></div>
        );
}

const LocationDetail = (props) => { 
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else
    if(props.location!=null){
        const percentage = props.location.capacity;
        let imgUrl="";
        let colorPath="";
        let sizeText="";
        if(percentage<=40){
            imgUrl="assets/images/safe.png";
            colorPath="#00e640";
        } else if (percentage>40 && percentage<=75) {
            imgUrl="assets/images/moderate.png";
            colorPath="#ffcb05";
        } else if (percentage>75 && percentage <=100) {
            imgUrl="assets/images/crowded.png";
            colorPath="#dd2c00";
        }
        return (
            <div class="container">
                <Header />
                    <div className="row">
                        <div className="col-12">
                            <h3 className="heading">{props.location.name}</h3>
                            <hr/>
                        </div>
                    </div>    
                <div className="row">
                    <div className="col-12 md-7 m-1">
                        <RenderLocation location = {props.location}/>
                        <div className="percentage-bar">
                            <CircularProgressbar value={percentage} text={`${percentage}%`}
                             styles={buildStyles({
                                pathColor: colorPath,
                                textColor: colorPath,
                             })}/>
                            <img src={reactBaseUrl + imgUrl} alt="percentage" id="imgPercentage"/>
                        </div>
                        <p style={{textAlign:"center"}} id="padatMal">Kepadatan Mal (%)</p>
                        <RenderComments comments = {props.comments}
                            postComment={props.postComment}
                            locationId={props.location._id}/> 
                    </div>
                </div>
            </div>
        );
        
    } else {
        return (<div></div>);
    }
}


export default LocationDetail;