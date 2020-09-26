import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchMedicine } from './components/RetrieveMedicine';
import './custom.css'
import { AddMedicine } from './components/addMedicne';
import NotFound from './components/NotFound';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={FetchMedicine} />
            <Route path='/retrieveMedicine' component={FetchMedicine} />
            <Route path='/addMedicine' component={AddMedicine} />
            <Route exact={true} path='*' component={NotFound} />
            
      </Layout>
    );
  }
}
