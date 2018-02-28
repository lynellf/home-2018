import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import loading from '../icons/loading.svg';
import $ from 'jquery';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      about: [],
      links: [],
      entries: [],
      isLoading: true,
    };
  }
  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: 'nav/all',
    }).done(links => {
      this.setState({ links });
      $.ajax({
        type: 'GET',
        url: '/about',
      }).done(about => {
        this.setState({ about });
        $.ajax({ type: 'GET', url: '/post/projects' })
          .done(post => {
            this.setState({ entries: post, isLoading: false });
          })
          .fail(function(error) {
            console.log('An error occurred:', error);
          });
      });
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <span>
          <img src={loading} alt="loading icon" className="loading" />
        </span>
      );
    } else {
      return (
        <div className="main-site">
          <Navbar />
          <Jumbotron posts={this.state.entries} links={this.state.links} />
          <Body posts={this.state.entries} />
          <Footer about={this.state.about}/>
        </div>
      );
    }
  }
}
