import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import PureInput from './PureInput';
import Modal from './modal';
import request from 'superagent';
import defaultPicture from '../images/defaultPicture.jpg';
export const fields = [ 'title', 'note', 'imgUrl', 'photo', 'members0','members1','members2',
  'members3', 'members4','members5','members6','members7','members8','members9', 'amount'];

export default class UpdateExpense extends Component {

  constructor(props){
    super(props);
    this.state = ({isModalOpen: false});
    //this.state = ({initialValue: true})
  }
  openModal = () => {
    this.setState({isModalOpen: true})
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  componentWillMount(){
    console.log('currentURL type',typeof window.location.href )
    //call our get groups function only if we haven't called it yet
    var currentURL = window.location.href;
    console.log(currentURL);
    var ID = currentURL.split('id=');
    //ID= ID[1].split('&')
    this.props.getUserByGroup(ID[1]);
    console.log('maybe work33', this.props.currentGroupUsers);
    console.log(this,'this');
  }


  handleSubmit(data) {
    if (this.props.userInfo){
    var photo = new FormData();
    //console.log('PHOTO',data.photo)
    if(data.photo == undefined){
      data.photo = [];
    }
    if (data.photo.length){
      photo.append('photo', data.photo[0]);
    

      request.post('/groups/expenses/upload')
      .send(photo)
      .end(function(err, resp) {
        if (err) { console.error(err); }
        return resp;
      })
      .then(function(resp){
        var currentURL = window.location.href;
        var baseURL = currentURL.split('/')[0];
            //console.log(currentURL);
        var ID = currentURL.split('id=');
        //ID= ID[1].split('&')
        var obj = {}
        obj.members = []
        //hard coded to 10, which is number of hard coded members max
        for (var i = 0 ; i< this.props.currentGroupUsers.length ; i++){

            if (this.props.userInfo.id===this.props.currentGroupUsers[i].user_id){
              data['members'+i] = true;
            }

        }
        for (var i = 0 ; i< 10 ; i++){
          if (data['members'+i]){
            obj.members.push(this.props.currentGroupUsers[i].user_id)
          }
        }
        ///////////////////CODE FOR UPDATE////////////////////////////////////////////////////////////////////////
         obj.membersAdded = [];
        obj.membersDeleted = [];
        var membersFlag = false;
        //console.log('I NEED HELP', this.props.currentActivity.members,'obj',obj.members)
        for (var i = 0 ; i < this.props.currentActivity.members.length ; i++){
          membersFlag = false;
          for(var x = 0 ; x < obj.members.length ; x++){
            //console.log('what',this.props.currentActivity.members[i].id ,obj.members[x])
            if (this.props.currentActivity.members[i].id === obj.members[x]){
              membersFlag = true;
            }
          }
          if (!membersFlag){
            if (this.props.currentActivity.members[i].id!==undefined){
                 //console.log('seriously',this.props.currentActivity.members[i].id)
            obj.membersDeleted.push(this.props.currentActivity.members[i].id)
          }
          }
        }

        for(var x = 0 ; x < obj.members.length ; x++){
          membersFlag = false;
          for (var i = 0 ; i < this.props.currentActivity.members.length ; i++){
            if (this.props.currentActivity.members[i].id === obj.members[x]){
              membersFlag = true;
            }
          }
          if (!membersFlag){
            if (obj.members[x]!==undefined){
              obj.membersAdded.push(obj.members[x])
            }
          }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //obj.paid_by = this.props.userInfo.id;
        for (var i = 0 ; i < obj.members.length ; i ++){
          for (var x = 0  ; x < this.props.currentGroupUsers.length; x++){
            if (obj.members[i]===this.props.currentGroupUsers[x].user_id){
              obj.members[i]=this.props.currentGroupUsers[x]
              obj.members[i].id = obj.members[i].user_id;
            }
          }
        }





        obj.title = data.title;
        obj.amount = Number(Number(data.amount).toFixed(2))
        obj.img_url = resp.text //|| data.imgUrl;
        obj.note = data.note;
        obj.group_id = Number(ID[1]);
        obj.id = this.props.currentActivity.id;
        console.log('send to post update', obj);
        this.setState({isModalOpen:false})
       // this.props.destroyForm();
        this.props.updateExpense(JSON.stringify(obj),this.props.currentActivity.id);

        //location.replace(baseURL+'/groupView?id='+ID[1]);
      }.bind(this));
    }
    else{
      
      var currentURL = window.location.href;
        var baseURL = currentURL.split('/')[0];
            console.log(currentURL);
        var ID = currentURL.split('id=');
        //ID= ID[1].split('&')
        var obj = {}
        obj.members = []
        //hard coded to 10, which is number of hard coded members max
        for (var i = 0 ; i< this.props.currentGroupUsers.length ; i++){

            if (this.props.userInfo.id===this.props.currentGroupUsers[i].user_id){
              data['members'+i] = true;
            }

        }
        for (var i = 0 ; i< 10 ; i++){
          if (data['members'+i]){
            obj.members.push(this.props.currentGroupUsers[i].user_id)
          }
        }
        ///////////////////CODE FOR UPDATE////////////////////////////////////////////////////////////////////////
        obj.membersAdded = [];
        obj.membersDeleted = [];
        var membersFlag = false;
        console.log('I NEED HELP', this.props.currentActivity.members,'obj',obj.members)
        for (var i = 0 ; i < this.props.currentActivity.members.length ; i++){
          membersFlag = false;
          for(var x = 0 ; x < obj.members.length ; x++){
            console.log('what',this.props.currentActivity.members[i].id ,obj.members[x])
            if (this.props.currentActivity.members[i].id === obj.members[x]){
              membersFlag = true;
            }
          }
          if (!membersFlag){
            if (this.props.currentActivity.members[i].id!==undefined){
                 console.log('seriously',this.props.currentActivity.members[i].id)
            obj.membersDeleted.push(this.props.currentActivity.members[i].id)
          }
          }
        }

        for(var x = 0 ; x < obj.members.length ; x++){
          membersFlag = false;
          for (var i = 0 ; i < this.props.currentActivity.members.length ; i++){
            if (this.props.currentActivity.members[i].id === obj.members[x]){
              membersFlag = true;
            }
          }
          if (!membersFlag){
            if (obj.members[x]!==undefined){
              obj.membersAdded.push(obj.members[x])
            }
          }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        for (var i = 0 ; i < obj.members.length ; i ++){
          for (var x = 0  ; x < this.props.currentGroupUsers.length; x++){
            if (obj.members[i]===this.props.currentGroupUsers[x].user_id){
              obj.members[i]=this.props.currentGroupUsers[x];
              obj.members[i].id = obj.members[i].user_id;
            }
          }
        }
        //obj.paid_by = this.props.userInfo.id;
        obj.title = data.title;
        obj.amount = Number(Number(data.amount).toFixed(2))
        //obj.img_url = 'client/images/download.jpg'
        obj.note = data.note;
        obj.group_id = Number(ID[1]);
        obj.id = this.props.currentActivity.id;
        console.log('send to post UPDATE', obj);
        this.setState({isModalOpen:false})
        //this.props.destroyForm();
        this.props.updateExpense(JSON.stringify(obj),this.props.currentActivity.id);

        //location.replace(baseURL+'/groupView?id='+ID[1]);
    }
    }
    else{
      console.log("ERROR NO CURRENT USER");
    }
}


  render(){
  

    

    const {

      fields: { title, note, imgUrl, photo, members0,members1,members2,
                members3, members4, members5, members6, members7, members8, members9, amount },
      handleSubmit,
      resetForm,
      submitting
      } = this.props


    return (
      <div>
      <button className = 'button primary button tiny'onClick={this.openModal}>Edit Expense</button>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this)).bind(this)}>
        <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
        <div>
          <h2>Add Expense</h2>
          <label>Title</label>
          <div>
            <input type="text" placeholder="Title" required{...title}/>
          </div>
        </div>
        <div>
          <label>Note</label>
          <div>
            <input type="text" placeholder="Note" required{...note}/>
          </div>
        </div>
        {/*
        <div>
          <label>imgUrl</label>
          <div>
            <input type="text" placeholder="Image URL" {...imgUrl} />
          </div>
        </div>
      */}
        <div className = 'row '>
          <div className = "small-12 large-5 columns">
            <img src={"/"+(this.props.currentActivity.img_url.split('dist/')[1] ? this.props.currentActivity.img_url.split('dist/')[1] : defaultPicture)}/>
          </div>
          <div className = "small-12 large-7 columns">
          </div>
        </div>
        <div>
          <label>Upload a photo (overwrites previous picture)</label>
          <div>
            <input type="file" accept='image/*' {...photo} value={null} />
          </div>
        </div>

        <div>
          <label>Amount</label>
          <div>
            <input type="text" placeholder="Amount(must be of form ##.##)" pattern = '[0-9]{1,}\.[0-9]{2}' title = 'Must be in format ##.##' required{...amount}/>
          </div>
        </div>
        <div>
        <h3>Members Involved</h3>
        {this.props.currentGroupUsers.map(function(user,index){
          //console.log(members[index],'what is this')
          // console.log('big thing',this)
       //members.push({value:true})
         var string = 'members'+index
         if(this.props.userInfo.id===user.user_id){
         // console.log('pj',true)
       }
          return (
          <label>
              {this.props.userInfo.id===user.user_id ?
               <PureInput type="checkbox"   checked='checked' field = {this.props.fields[string]}/>

               :
               <PureInput type="checkbox"  field = {this.props.fields[string]}/>

             } <span>{user.name}</span>
          </label>)
          }.bind(this))
            }
        </div>

        <div>
          <button type="submit" className="button primary float-left tiny button" disabled={submitting}>
            {submitting ? <i/> : <i/>} Update
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Reset Values
          </button>
        </div>
      </form>
      </Modal>
      </div>
    )
  }
}

export default reduxForm({
  form: 'updateX',
  fields
})(UpdateExpense)
