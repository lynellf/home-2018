import React, { Component } from 'react';
import Jumbotron from './Jumbotron/Jumbotron';
import Navbar from './Navbar/Navbar';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import loading from '../icons/loading.svg';
import $ from 'jquery';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      about: [],
      links: [],
      project: [],
      blog: [],
      skills: [],
      isLoading: true,
    };
  }
  componentWillMount() {
    // GET navigation links
    $.ajax({ type: 'GET', url: 'nav/all' })
      .done(links => {
        this.setState({ links });
        // GET about section
        $.ajax({ type: 'GET', url: '/about' })
          .done(about => {
            this.setState({ about });
            // GET project entries
            $.ajax({ type: 'GET', url: '/post/projects/live' })
              .done(post => {
                this.setState({ project: post });
                // GET blog entries
                $.ajax({ type: 'GET', url: '/post/journal/live' })
                  .done(post => {
                    this.setState({ blog: post });
                    // GET skills
                    $.ajax({
                      type: 'GET',
                      url: '/skill/all',
                    }).done(skill => {
                      this.setState({ skills: skill, isLoading: false });
                    });
                  })
                  .fail(function(error) {
                    console.log('An error occurred:', error);
                  });
              })
              .fail(function(error) {
                console.log('An error occurred:', error);
              });
          })
          .fail(function(error) {
            console.log('An error occurred:', error);
          });
      })
      .fail(function(error) {
        console.log('An error occurred:', error);
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
          <Navbar links={this.state.links}/>
          <Jumbotron posts={this.state.project} links={this.state.links} />
          <Main projects={this.state.project} blog={this.state.blog} skill={this.state.skills}/>
          <Footer about={this.state.about}/>
        </div>
      );
    }
  }
}
