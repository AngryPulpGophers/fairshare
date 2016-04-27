import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import SelectSearch from 'react-select-search';
export default class GroupList extends Component {
  
  
  render(){
    const options = this.props.users
    // function onValueChanged(option, state) {
    //   console.log(option);
    //   this.props.handleNewMem(option.value, option.name) 
    // }

    return(
      <div className="row">
        <div className="small-12 large-7">
          <h2>Add some members</h2>
          <label>
            { options.length === 0 ? null :  
              <div className="input-group">
                <SelectSearch valueChanged={this.props.handleNewMem} options={options} name="users" />
                <a onClick={() => { this.props.addMember(this.props.newMem) }} className="input-group-button button">+ add</a>

              </div>
              }
            {/*<input 
              type="text" 
              placeholder="add user" 
              onChange={this.handleMemberChange}
            />*/}
          </label>
          <ul>
          
          </ul>
        </div><div className="small-12 large-5"></div>
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