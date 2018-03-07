import React, { Component } from 'react';
import PostArticle from '../Article/Article';
import {
  defaultClass,
  grouper,
  filterPosts,
  toggleElement,
  createPost,
  smoothScroll,
} from '../helpers/functions';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: filterPosts(
        grouper(createPost(this.props.posts, 'post')),
        0,
        'post'
      ),
      pagination: 0,
    };
    this.showPost = this.showPost.bind(this);
    this.closePost = this.closePost.bind(this);
    this.nextPost = this.nextPost.bind(this);
    this.previousPost = this.previousPost.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  // Click post name, list item expands, revealing article details
  showPost(array, index, id) {
    this.closePost();
    let posts = this.state.posts,
      newPost = toggleElement(array, index, 'articleClass', 'post__article');
    newPost = toggleElement(
      array,
      index,
      'titleClass',
      'post__title-container'
    );
    newPost = toggleElement(array, index, 'controlsClass', 'post__controls');
    posts[this.state.pagination] = newPost;
    this.setState({
      posts,
    });
    // Browser window scrolls to top of article
    smoothScroll(id);
  }

  // Click X icon and list item will collapse, hiding article details
  closePost() {
    let posts = this.state.posts,
      newPost = defaultClass(
        this.state.posts[this.state.pagination],
        'articleClass',
        'post__article'
      );
    newPost = defaultClass(
      this.state.posts[this.state.pagination],
      'titleClass',
      'post__title-container'
    );
    newPost = defaultClass(
      this.state.posts[this.state.pagination],
      'controlsClass',
      'post__controls'
    );
    posts[this.state.pagination] = newPost;
    this.setState({ posts });
  }

  // Click > icon and list item will collapse, open next list item, and scroll to top
  nextPost(array, index, nextId) {
    this.closePost();
    let posts = this.state.posts,
      newPost = toggleElement(
        array,
        index,
        'articleClass',
        'post__article',
        true,
        false
      );
    newPost = toggleElement(
      array,
      index,
      'titleClass',
      'post__title-container',
      true,
      false
    );
    newPost = toggleElement(
      array,
      index,
      'controlsClass',
      'post__controls',
      true,
      false
    );
    posts[this.state.pagination] = newPost;
    this.setState({ posts });
    // Browser window scrolls to top of article
    smoothScroll(nextId);
  }

  // Click < icon and list item will collapse, open prev list item, and scroll to top
  previousPost(array, index, prevId) {
    this.closePost();
    let posts = this.state.posts,
      newPost = toggleElement(
        array,
        index,
        'articleClass',
        'post__article',
        false,
        true
      );
    newPost = toggleElement(
      array,
      index,
      'titleClass',
      'post__title-container',
      false,
      true
    );
    newPost = toggleElement(
      array,
      index,
      'controlsClass',
      'post__controls',
      false,
      true
    );
    posts[this.state.pagination] = newPost;
    this.setState({ posts });
    // Browser window scrolls to top of article
    smoothScroll(prevId);
  }

  selectPage(index) {
    this.closePost();
    this.setState({ pagination: index });
  }

  render() {
    const posts = array => {
        return array.map((post, index) => (
          <div className={post.parentClass} key={post.id} id={post.id}>
            <div className={post.titleClass}>
              <h2
                className="post__title"
                onClick={event => this.showPost(array, index, post.id)}
              >
                {post.title}
              </h2>
              <div className={post.controlsClass}>
                {index !== 0 && (
                  <span
                    className="controls__back"
                    onClick={event =>
                      this.previousPost(
                        array,
                        index,
                        array[index - 1].id
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path d="M10 20l3-3-7-7 7-7-3-3L0 10l10 10z" />
                    </svg>
                  </span>
                )}
                {index !== array.length - 1 && (
                  <span
                    className="controls__forward"
                    onClick={event =>
                      this.nextPost(array, index, array[index + 1].id)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path d="M3 20l-3-3 7-7-7-7 3-3 10 10L3 20z" />
                    </svg>
                  </span>
                )}
                <span
                  className="controls__close"
                  onClick={event => this.closePost()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M20.775 2.52a.81.81 0 0 1 0 1.14l-6.276 6.269a.81.81 0 0 0 0 1.141l6.273 6.271a.81.81 0 0 1 0 1.14l-2.285 2.277a.814.814 0 0 1-1.142 0l-6.271-6.271a.812.812 0 0 0-1.141 0l-6.276 6.267a.81.81 0 0 1-1.141 0l-2.282-2.28a.808.808 0 0 1 0-1.139l6.278-6.269a.81.81 0 0 0 0-1.14L.24 3.653a.81.81 0 0 1 0-1.14L2.524.235a.81.81 0 0 1 1.141.001l6.271 6.27a.808.808 0 0 0 1.141.001L17.353.24a.812.812 0 0 1 1.141 0l2.281 2.28z" />
                  </svg>
                </span>
              </div>
            </div>

            <article className={post.articleClass}>
              <PostArticle
                post={post.post}
                images={post.images}
                skills={post.tags}
                title={post.title}
                date={post.date}
                update={post.update}
                git={post.git}
                url={post.url}
              />
            </article>
          </div>
        ));
      },
      pagination = array => {
        return array.map((item, index) => (
          <li key={index}>
            <button className="button" onClick={event => this.selectPage(index)}>{index + 1}</button>
          </li>
        ));
      };

    return (
      <div>
        <div className="post__list" id="posts">
        <h1 className="post__title">{this.props.title}</h1>
          {posts(this.state.posts[this.state.pagination])}
        </div>
        <div className="post__nav">
          <ul className="post__pagination">{pagination(this.state.posts)}</ul>
        </div>
      </div>
    );
  }
}
