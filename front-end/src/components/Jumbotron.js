import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

export default class Jumbotron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      imageURL: [],
      classNames: [],
    };
  }

  displayRandomImg = () => {
    const array = this.state.imageURL,
      classNames = [],
      max = Math.floor(array.length),
      min = 0;

    let randomNum = Math.floor(Math.random() * (max - min) + min);

    for (let i = 0; i < array.length; i++) {
      classNames.push('jumbotron__img--inactive');
    }

    classNames[randomNum] = 'jumbotron__img--active';

    this.setState({ classNames });
  };

  componentWillMount() {
    const posts = this.props.posts,
      imageArray = [];
    posts.forEach(post => {
      imageArray.push(post.images[0]);
    });
    this.setState({
      imageURL: imageArray,
      links: this.props.links
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.displayRandomImg();
    }, 5000);
  }
  render() {
    const imageArray = this.state.imageURL,
      classNames = this.state.classNames,
      images = imageArray.map((image, index) => (
        <div key={index} className={classNames[index]}>
          <Parallax bgImage={image} strength={300} blur={1} />
        </div>
      ));
    const urlArray = this.state.links,
      navLinks = urlArray.map((link, index) => 
      <li key={index} className="greeting__item">
        <a href={link.url} className="button">{link.name}</a>
      </li>
    );

    return (
      <div className="jumbotron">
        <div className="greeting">
          <h1 className="greeting__name">Ezell Frazier</h1>
          <h1 className="greeting__sub">Front-End Web Developer</h1>
          <div className="greeting__navigation">
          <ul className="greeting__list">
            {navLinks}
          </ul>
        </div>
        </div>
        <div className="overlay" />
        {images}
      </div>
    );
  }
}
