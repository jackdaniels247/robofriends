import React from 'react';

import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

class App extends React.Component {
  constructor(){
      super();
      this.state={
         robots:[],
         searchfields:''
      }
      
  }
 componentDidMount(){
   fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
   .then(users => this.setState({robots:users}));
 }

  onSearchChange = (event) => {
   this.setState({searchfields:event.target.value});
  }
  
  render() {
    const filteredbot= this.state.robots.filter(robots => {
      return robots.name.toLowerCase().includes(this.state.searchfields.toLowerCase());
    });
    if(this.state.robots.length===0){
      return <h1>Loading...</h1>
    }
    else{
      return(
        <div className='tc' >
           <h1 className='f1'>Robofriends</h1>
           <SearchBox searchChange={this.onSearchChange}/>
           <Scroll>
             <ErrorBoundary>
             <CardList robots={filteredbot}/>
             </ErrorBoundary>
           
           </Scroll>
           
        </div>
        
      );
    }
    
    
  }
  
}

export default App;
