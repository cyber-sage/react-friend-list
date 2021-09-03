import React from 'react';
import ReactDOM from 'react-dom';

import './friend.css';
function Friend (props) {
      const { friend, remove, deactivate, activate } = props
      return (
        <div>
          
          {friend.active ? (
            
            <div className="Friend-div">
              <div>
              {friend.name}
              </div>
              <div className="Friend-div-Action">
              <button onClick={() => remove(friend.name)}>Remove</button> 
              {/* <IconButton>
                <FavoriteBorderIcon></FavoriteBorderIcon>
                </IconButton>  */}
              {/* <button onClick={() => deactivate(friend.name)}>Deactivate</button> */}
              </div>
             </div>
            
               )   : (
            <span>
              {friend.name}
              <button onClick={() => activate(friend.name)}>Activate</button>
            </span>
          )}
          
        </div>
      )
    }

    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          friends: [
            { name: 'Juan', active: true ,fav: false},
            { name: 'Tyler', active: true ,fav:true},
            { name: 'Michael', active: false , fav:false},
            { name: 'Charles', active: true ,fav:false}
          ],
          input: ''
        }
        
        // Bind here, it's more performant
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
        this.handleAddFriend = this.handleAddFriend.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.clearAllFriends = this.clearAllFriends.bind(this)
        this.deactivateFriend = this.deactivateFriend.bind(this)
        this.activateFriend = this.activateFriend.bind(this)
      }

      handleAddFriend () {
        this.setState((currentState) => {
          return {
            friends: currentState.friends.concat({name: currentState.input, active: true,fav:false }),
            input: ''
          }
        })
      }

      handleRemoveFriend (name) {
        // Remove the friend
        this.setState((currentState) => {
          
          // This object will be returned and merged..
          return {
            friends: currentState.friends.filter((friend) => friend.name !== name)
          }
        })
      }

      deactivateFriend (name) {
        let friendToDeactivate = {
          name: name,
          active: false
        }

        let updatedFriends = this.state.friends.map((friend) => {
          if (friend.name === name) {
            return friendToDeactivate
          }
          return friend
        })

        this.setState({
          friends: updatedFriends
        })
      }

      activateFriend (name) {
        let friendToActivate = {
          name: name,
          active: true
        }

        let updatedFriends = this.state.friends.map((friend) => {
          if (friend.name === name) {
            return friendToActivate
          }
          return friend
        })

        this.setState({
          friends: updatedFriends
        })


      }

      clearAllFriends() {
        this.setState({
          friends: [],
        })
      }

      updateInput (e) {
        const value = e.target.value
        this.setState({
          input: value
        })
      }
      
      render () {
        const { friends } = this.state
 
        return (
          <div className="Card">
            <div className="Card-data">
              <div className="head"><b>Friends List</b></div>
              <div className="Button">
              <input 
              type="text"
              placeholder="New Friend.."
              value={this.state.input}
              onChange={this.updateInput}
            />
            <button onClick={this.handleAddFriend}>
              Submit
            </button>
              </div>
            
            {/* <div>
              <button onClick={this.clearAllFriends}>
                Clear All
              </button>
            </div> */}

            {/* <h2>Active Friends</h2> */}
            {/* <ul> */}
             
                {friends.map(friend => friend.active && 
                <Friend key={friend.name} friend={friend} remove={this.handleRemoveFriend} deactivate={this.deactivateFriend} />)
                
                }
              
            {/* </ul> */}
            {/* <h2>Inactive</h2> */}
            {/* <ul>
              {friends.map(friend => friend.active == false && <Friend key={friend.name} friend={friend} activate={this.activateFriend} />)}
            </ul> */}
            </div>
          </div>
        )
      }
    }

    // ReactDOM.render(
    //   <App />,
    //   document.getElementById('app')
    // )
    export default App;