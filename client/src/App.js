import React from 'react';
import ContactCard from './components/contact-card/ContactCard'

import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {

  state = {
    contacts: []
  }

  constructor() {
    super();
    this.loadData();
  }

  async loadData() {
    const response = await fetch('http://localhost:8080/api/contacts');
    const data = await response.json();
    this.setState({contacts: data});
  }

  render() {
    return (
      <div class='px-5 my-5'>
        <ContactCard data={ this.state.contacts }/>
      </div>
    );
  }
}

export default App;
