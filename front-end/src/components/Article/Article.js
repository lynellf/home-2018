import React, { Component } from 'react';
import { createImg, createLi } from '../helpers/functions';

export default class Article extends Component {

  setClasses() {
    const images = this.props.images,
      skills = this.props.skills,
      max = Math.floor(images.length),
      min = 0,
      randomNum = Math.floor(Math.random() * (max - min) + min);

      images.forEach(image => {
        image.className = 'slideshow__image--inactive';
      });

      skills.forEach(skill => {
        skill.className = 'article__item';
      });

      images[randomNum].className = 'slideshow__image--active';

    this.setState({
      images, skills
    });
  }

  componentWillMount() {
    this.setClasses();
  }

  componentDidMount() {
    setInterval(() => {
      this.setClasses();
    }, 8000);
  }

  render() {
    const createMarkup = () => {
      const markup = this.props.post;
      return { __html: markup };
    };

    return (
      <div className="article__container">
        <div
          className="article__post"
          dangerouslySetInnerHTML={createMarkup()}
        />
        <div className="article__details">
          <div className="slideshow">
            { (this.props.images[0].image !== '') ? <div className="slideshow__reel">{createImg(this.props.images)}</div>: null}
          </div>
          <div className="article__extra">
            {(this.props.skills[0].tag !== '') ? (
              <div className="article__skills">
                <h4 className="article__title">
                  Related Skills and Technologies
                </h4>
                <ul className="article__list">{createLi(this.props.skills)}</ul>
              </div>
            ) : null}
            <div className="article__more">
              {this.props.git ? (
                <a href={this.props.git} className="button">
                  View Source Code
                </a>
              ) : null}
              {this.props.url ? (
                <a href={this.props.url} className="button">
                  View Live Project
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
