import React from 'react';
import $ from 'jquery';

// Reset classes on project elements
export const defaultClass = (array, classGroup, defaultName) => {
    array.forEach((item, index) => {
      array[index][`${classGroup}`] = defaultName;
    });
    return array;
  },
  createImgObjFromPost = post => {
    return post.images.map((image, index) => {
      return {
        image: image,
        key: index,
        alt: `${post.title} ${index}`,
        className: '',
      };
    });
  },
  createTagObjFromPost = post => {
    return post.tags.map((tag, index) => {
      return { tag: tag, key: index, className: '' };
    });
  },
  createPost = (data, postType) => {
    const newArray = [];
    data.forEach(item => {
      const post = {
        id: item._id,
        title: item.title,
        date: item.date,
        update: item.lastUpdated,
        git: item.gitHub,
        url: item.projectUrl,
        post: item.body,
        images: createImgObjFromPost(item),
        tags: createTagObjFromPost(item),
        parentClass: `${postType}`,
        titleClass: `${postType}__title`,
        controlsClass: `${postType}__controls`,
        articleClass: `${postType}__article`,
      };
      newArray.push(post);
    });
    return newArray;
  },
  toggleElement = (array, index, classGroup, defaultName, next, prev) => {
    if (next === true) {
      array[index][`${classGroup}`] = defaultName;
      array[index + 1][`${classGroup}`] = `${defaultName}--active`;
      return array;
    } else if (prev === true) {
      array[index][`${classGroup}`] = defaultName;
      array[index - 1][`${classGroup}`] = `${defaultName}--active`;
      return array;
    } else {
      array[index][`${classGroup}`] = `${defaultName}--active`;
    }
    return array;
  },
  grouper = array => {
    let groups = [],
      group = [];
    // We want to push 10 posts into the group array
    for (let i = 0; i < array.length; i++) {
      group.push(array[i]);
      // When the group array length is equal to ten, we want to push it to the groups array and start over
      if (group.length === 10) {
        groups.push(group);
        group = [];
      }
    }
    // Whatever remains in the group array shall get pushed into the groups array and return the array
    if (group.length > 0) {
      groups.push(group);
    }
    return groups;
  },
  smoothScroll = id => {
    setTimeout(() => {
      document.getElementById(`${id}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, 50);
  },
  filterPosts = (array, index, defaultName) => {
    if (array.length > 1) {
      array.forEach(group => {
        group.forEach(post => {
          post.parentClass = `${defaultName}--inactive`;
        });
      });
      if (index !== undefined) {
        array[index].forEach(post => {
          post.parentClass = `${defaultName}--active`;
        });
      }
    } else {
      array[0].forEach(post => {
        post.parentClass = `${defaultName}--active`;
      });
    }
    return array;
  },
  // Iterate virtual dom elements

  // Images
  createImg = array => {
    return array.map((image, index) => (
      <img
        src={image.image}
        key={index}
        className={image.className}
        alt={image.alt}
      />
    ));
  },
  // List Items
  createLi = array => {
    return array.map((item, index) => (
      <li className={item.className} key={index}>
        {item.tag}
      </li>
    ));
  },
  // GET all site data
  getData = () => {
    const data = {
      about: [],
      blog: [],
      link: [],
      project: [],
      skill: []
    };
    // GET navigation links
    $.ajax({ type: 'GET', url: 'nav/all' })
      .done(links => {
        data.link = links;
        // GET about section
        $.ajax({ type: 'GET', url: '/about' })
          .done(about => {
            data.about = about;
            // GET project entries
            $.ajax({
              type: 'GET',
              url: '/post/projects',
            })
              .done(post => {
                data.project = post;
                // GET blog entries
                $.ajax({
                  type: 'GET',
                  url: '/post/journal',
                })
                  .done(post => {
                    data.blog = post;
                    // GET skills
                    $.ajax({
                      type: 'GET',
                      url: '/skill/all',
                    }).done(skill => {
                      data.skill = skill;
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
      console.log(data);
      return data;
  };
