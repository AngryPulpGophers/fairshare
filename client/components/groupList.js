import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

//a helpful function when looking at retrieved data
// function puke (obj) {
//   return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
// }
function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}



export default class GroupList extends Component {
  componentWillMount(){
    //call our get groups function
    this.props.getGroups()
  }

  render(){
    //console.log('get groups!:',this.props.groups)
    return (
      <div>
         {this.props.groups.map(function(group){
            return <div className="callout secondary">


                    <p>{group.name} <Link  to={{pathname:'/groupView',query:{ id: group.id }}} title="groupView"  className="button primary float-left tiny button">View Group</Link> </p>


                  </div>;
          })}
        {/*puke(this.props.groups)*/}
      </div>
    )
  }
}

