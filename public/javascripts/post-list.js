function getPosts() {
  if (document.querySelector('.list').id === 'projects') {
    $.ajax({
      type: 'GET',
      url: '/post/projects',
    }).done(function(data) {
      // rawPosts = data;
      renderPosts(grouper(data), document.querySelector('.posts'));
      classFilter(0);
      pagination(grouper(data));
      selectPage();
      deletePost(data);
      editPost(data);
    });
  } else {
    $.ajax({
      type: 'GET',
      url: '/post/journal',
    }).done(function(data) {
      // rawPosts = data;
      renderPosts(grouper(data), document.querySelector('.posts'));
      classFilter(0);
      pagination(grouper(data));
      selectPage();
      deletePost(data);
      editPost(data);
    });
  }
}



function renderPosts(array, node) {
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      var row = document.createElement('tr'),
        nameCell = document.createElement('td');
      optionCell = document.createElement('td');
      hyperLink = document.createElement('a');
      editBtn = document.createElement('button');
      deleteBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      deleteBtn.textContent = 'Delete';
      hyperLink.setAttribute('href', '/posts:' + array[a][b]['_id']);
      hyperLink.textContent = array[a][b]['title'];
      row.className = 'posts__row d-flex justify-content-between';
      optionCell.className = 'd-flex justify-content-around w-25';
      deleteBtn.className = 'posts__delete btn btn-outline-danger';
      editBtn.className = 'posts__edit btn btn-outline-primary';
      node.appendChild(row);
      row.appendChild(nameCell);
      row.appendChild(optionCell);
      nameCell.appendChild(hyperLink);
      optionCell.appendChild(editBtn);
      optionCell.appendChild(deleteBtn);
    }
  }
}

function grouper(array) {
  var groups = [],
    group = [];
  // We want to push 10 posts into the group array
  for (var i = 0; i < array.length; i++) {
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
};

function classFilter(index) {
  var array = grouper(document.querySelectorAll('.posts__row'));
  if (array.length > 1) {
    for (var n = 0; n < array.length; n++) {
      for (var o = 0; o < array[n].length; o++) {
        array[n][o].classList.remove('active');
        array[n][o].classList.add('inactive');
      }
    }
  }
  for (var k = 0; k < array[index].length; k++) {
    array[index][k].classList.remove('inactive');
    array[index][k].classList.add('active');
  }
}

function pagination(array) {
  var nav = document.querySelector('#pagination'),
    pagination = document.createElement('ul');
  pagination.className = 'pagination justify-content-center';
  nav.appendChild(pagination);
  if (array.length > 1) {
    for (var i = 0; i < array.length; i++) {
      var item = document.createElement('li'),
        link = document.createElement('a');
      item.className = 'page-item';
      link.className = 'page-link';
      link.setAttribute('href', '#');
      link.textContent = i + 1;
      pagination.appendChild(item);
      item.appendChild(link);
    }
  }
}

function selectPage() {
  if (document.querySelectorAll('.page-link').length > 0) {
    var array = grouper(document.querySelectorAll('.posts__row')),
      items = document.querySelectorAll('.page-link');
    for (let i = 0; i < array.length; i++) {
      items[i].addEventListener('click', function(event) {
        classFilter(parseInt(event.target.textContent - 1));
      });
    }
  }
}

function deletePost(data) {
  var posts = document.querySelectorAll('.posts__row'),
    nav = document.querySelector('#pagination'),
    pagination = document.createElement('ul'),
    // data = rawPosts,
    fileList = document.querySelector('.posts'),
    nodes = Array.prototype.slice.call(
      document.querySelector('.posts').children
    ),
    index,
    fileName;
  pagination.className = 'pagination justify-content-center';

  for (let i = 0; i < posts.length; i++) {
    posts[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Delete') {
        var row = event.target.parentNode.parentNode,
          index = nodes.indexOf(row);
        fileName =
          event.target.parentNode.previousElementSibling.children[0]
            .textContent;
        // Server action
        $.ajax({
          type: 'POST',
          url: '/post/delete:' + data[index]['_id'],
        }).done(function() {
          data.splice(index, 1);
          fileList.textContent = '';
          renderPosts(grouper(data), fileList);
          nav.textContent = '';
          nav.appendChild(pagination);
          classFilter(0);
          if (grouper(data).length > 1) {
            for (var i = 0; i < grouper(data).length; i++) {
              var item = document.createElement('li'),
                link = document.createElement('a');
              item.className = 'page-item';
              link.className = 'page-link';
              link.setAttribute('href', '#');
              link.textContent = i + 1;
              pagination.appendChild(item);
              item.appendChild(link);
            }
          }
          getPosts();
        });
      }
    });
  }
}

function editPost(data) {
  var posts = document.querySelectorAll('.posts__row'),
    nodes = Array.prototype.slice.call(
      document.querySelector('.posts').children
    ),
    index;

  for (var i = 0; i < posts.length; i++) {
    posts[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Edit') {
        var row = event.target.parentNode.parentNode,
          index = nodes.indexOf(row);
        window.location.href = '/admin/edit:' + data[index]['_id'];
      }
    });
  }
}

getPosts();
