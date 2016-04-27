import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import SelectSearch from 'react-select-search';
export default class GroupList extends Component {

  renderMembers(data) {
    console.log('called', data)
    //const refName = `callout-${data.id}`;
    return (
      <li>{data.name}</li>
    )
  }
  
  render(){
    const groupData = this.props.groupForm
    const options = this.props.users

    const memberElements = this.props.members.map((data) => {
      return this.renderMembers(data);
    })
//     // Need to set the search field value because otherwise it is cleared when the value changes.
//     this.SelectSearch.refs.search.value = getSelectedOptionDisplayName();
//     this.SelectSearch.refs.search.select();
//     // Trick the SelectSearch into acting like it was blurred.
//     this.SelectSearch.onBlur();
//     var $input = $(ReactDOM.findDOMNode(this.SelectSearch.refs.search));
// // If it's the tab key, return true to let the event continue. Otherwise trick the SelectSearch to act like it was focused.
//     $input.one('keydown', (event) => (event.which == 9 ? true : this.SelectSearch.onFocus()));
    return(

      <div className="row">
        <div className="small-12 columns">
          <h2>Add somone to the group:</h2>
        </div>
        <div className="small-12 large-6 columns">
          <label>
            { options.length === 0 ? null :  
              <div className="input-group">
                <SelectSearch valueChanged={this.props.handleNewMem} options={options} name="users" refs="search" />
                <a onClick={() => { this.props.addMember(this.props.newMem, this.props.groupForm) }} className="input-group-button button">+ add</a>

              </div>
              }
            {/*<input 
              type="text" 
              placeholder="add user" 
              onChange={this.handleMemberChange}
            />*/}
          </label>
        </div>
        <div className="small-12 large-6 columns">
          <h5>Current Members</h5>
          <ul>
            {[...memberElements]}
          </ul>
        </div>
        <div className="small-12 columns">
          { groupData.length === 0 ? null :
          <a onClick={() => { this.props.createGroup(this.props.members,groupData) }} className="expanded success button">+ Create New Group!</a>
          }
        </div>
      </div>

    )
  }
}
// export default class GroupList extends Component {
//   renderUser (data) {
//     console.log(data)
//   }
  
//   render(){
//     const options = this.props.users

//     const newUsers = this.props.members.map((data) => {
//       return this.renderUser(data);
//     })

//     return (
//       <div>
//         <div className="row">
//           <div className="small-7 columns">
//             { options.length === 0 ? null :  
//               <SelectSearch options={options} name="users" />
//             }
//           </div>
//           <div className="small-5 columns">

//             <a onClick={() => { this.props.addMember() }} className="button add-member">+ add</a>
//           </div>
//         </div>
//         <div className="row">
//           <div className="small-12 columns">
//             <ul>
//               <li>Member Name <a onClick={this.props.removeMember} href="#">Remove</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }