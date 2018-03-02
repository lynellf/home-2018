// Reset classes on project elements
export const defaultClass = (array, defaultName) => {
    const newArray = [];
    array.forEach(item => {
      newArray.push(defaultName);
    });

    return newArray;
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
        images: item.images,
        tags: item.tags,
        titleClass: `${postType}__title`,
        controlsClass: `${postType}__controls`,
        articleClass: `${postType}__article`
      };
      newArray.push(post);
    });
    return newArray;
  },
  toggleElement = (array, index, classGroup, defaultName, next, prev) => {
    if(next === true) {
      array[index +1][`${classGroup}`] = `${defaultName}--active`;
    } else {
      array[index][`${classGroup}`] = `${defaultName}--active`;
    }
    if(prev === true) {
      array[index -1][`${classGroup}`] = `${defaultName}--active`;
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
    groups.push(group);
    return groups;
  },
  // We input a nested array (array of arrays) and return an array with all but
  // the first array with a 'disabled or hidden' className
  filterElements = (elementArray, classArray, elementName) => {
    let classNames = classArray;
    if (elementArray[0].length >= 10) {
      elementArray.forEach((item, index) => {
        classNames[index].forEach((name, cIndex) => {
          classNames[index][cIndex] = `${elementName}--inactive`;
        });
      });
    } else if (elementArray[0].length > 0) {
      classNames[0].forEach((className, index) => {
        classNames[0][index] = 'project--inactive';
      });

      for (let i = 0; i < elementArray.length; i++) {
        classNames[i].forEach((className, index) => {
          classNames[i][index] = 'project--active';
        });
      }
    } else {
      classNames[0].forEach((className, index) => {
        classNames[0][index] = 'project--inactive';
      });
    }
    return classNames;
  };
