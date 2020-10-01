import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Header from './HeaderComponent';

function RenderMenuItem ({location}){
    return (
        <Card>
            <Link to={`/home/${location._id}`} >
                <CardImg width="100%" src={baseUrl + location.image} alt={location.name} />
                <CardImgOverlay>
                    <CardTitle style={{color:"white"}}>{location.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}


class Menu extends Component{ 
    
    constructor(props){
        super(props);

        this.state = {
            search:""
        }
        this.onchange=this.onchange.bind(this);
    }
    
    onchange = e => {
        this.setState({ search : e.target.value });
      }
    
    render(){
        const { search } = this.state;
        const filteredLocations = this.props.locations.locations.filter(location => {
            return location.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        
        
        const menu = filteredLocations.map((location) => {
            return (
                <div className="col-12 col-md-5 m-1" key={location._id}>
                    <RenderMenuItem location={location}/>
                </div>
            );
        });

        if(this.props.locations.isLoading) {
            return(
                <div className="container" id="page">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if(this.props.locations.errMess){
            return(
                <div className="container" id="page">
                    <div className="row">
                        <h4>{this.props.locations.errMess}</h4>
                    </div>
                </div>
            );
        } else
            return (
                <div className="container" id="page">
                    <Header />
                    <div className="row">
                        <div className="col-12">
                            <h3 className="heading">Cari Mal</h3>
                            <Input label="Search Mall" placeholder="&#xF002;" onChange={this.onchange}
                            style={{fontFamily: "FontAwesome"}}/>
                            <hr/>
                        </div>
                    </div>    
                    <div className="row" style={{paddingBottom:"100px"}}>
                        {menu}
                    </div>
                </div>
            );
    }
}

export default Menu;