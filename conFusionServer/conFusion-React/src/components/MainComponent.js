import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import HowToUse from './HowToUseComponent';
import LocationDetail from './LocationDetailComponent';
import Navigation from './NavigationComponent';
import { Switch, Route, Redirect , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchLocations,fetchComments,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup,CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
  return {
    locations: state.locations,
    comments: state.comments
  }   
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (locationId, rating, author, comment) => dispatch(postComment(locationId, rating, author, comment)),
  fetchLocations: () => {dispatch(fetchLocations())},
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())}
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchLocations();
    this.props.fetchComments();
  }

 

  render() {

    const LocationWithId = ({match})=>{
      return(
        <LocationDetail location={this.props.locations.locations.filter((location)=>location._id === match.params.locationId)[0]}
        isLoading={this.props.locations.isLoading}
        errMess={this.props.locations.errMess}
        comments={this.props.comments.comments.filter((comment)=>comment.locationId === match.params.locationId)}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        />
      );
    }

    return (
      <div id="page">
        <Navigation />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route exact path="/home" component={() => <Menu locations={this.props.locations}/>}/>
              <Route path="/home/:locationId" component={LocationWithId}/>
              <Route exact path="/about" component={() =><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
              <Route exact path="/how-to-use" component={() => <HowToUse/>}/>
              <Redirect to="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
