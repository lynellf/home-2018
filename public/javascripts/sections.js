$('#aboutEditor').trumbowyg({
  btns: ['strong', 'em', '|', 'insertImage'],
  autogrow: false,
});

function getPost() {
  var postId = document.getElementById('postId').textContent;
  $.ajax({
    type: 'GET',
    url: '/about',
  }).done(function(data) {
    setPost(data);
    postAbout();
  });
}

function getNav() {
  var navList = document.querySelector('.navLinks');
  $.ajax({
    type: 'GET',
    url: '/nav/all',
  }).done(function(data) {
    if (navList.textContent != '') {
      navList.textContent = '';
    }
    renderNavs(grouper(data), navList, data);
    classFilter(0);
    pagination(grouper(data));
    selectPage();
    postNav();
    renameNav();
    deleteNav();
    changeUrl();
  });
}

function renderNavs(array, node, rawArray) {
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      var index = rawArray.indexOf(array[a][b]),
        row = document.createElement('tr'),
        nameCell = document.createElement('td'),
        urlCell = document.createElement('td'),
        urlLink = document.createElement('a'),
        optionCell = document.createElement('td'),
        renameBtn = document.createElement('button'),
        urlBtn = document.createElement('button'),
        deleteBtn = document.createElement('button');
      renameBtn.textContent = 'Rename';
      renameBtn.setAttribute('index', index);
      renameBtn.setAttribute('key', array[a][b]['_id']);
      urlBtn.textContent = 'URL';
      urlBtn.setAttribute('index', index);
      urlBtn.setAttribute('key', array[a][b]['_id']);
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('index', index);
      deleteBtn.setAttribute('key', array[a][b]['_id']);
      urlLink.textContent = array[a][b]['name'];
      urlLink.setAttribute('href', array[a][b]['url']);
      urlCell.textContent = array[a][b]['rating'];
      row.className = 'nav__row d-flex justify-content-between';
      optionCell.className = 'd-flex justify-content-around w-25';
      deleteBtn.className = 'nav__delete btn btn-outline-danger btn-sm';
      urlBtn.className = 'nav__url btn btn-outline-primary btn-sm';
      renameBtn.className = 'nav__rename btn btn-outline-primary btn-sm';
      node.appendChild(row);
      row.appendChild(nameCell);
      row.appendChild(urlCell);
      row.appendChild(optionCell);
      nameCell.appendChild(urlLink);
      optionCell.appendChild(renameBtn);
      optionCell.appendChild(urlBtn);
      optionCell.appendChild(deleteBtn);
    }
  }
}

function grouper(array) {
  var groups = [],
    group = [];
  // We want to push 10 items into the group array
  for (var l = 0; l < array.length; l++) {
    group.push(array[l]);
    // When the group array length is equal to ten, we want to push it to the groups array and start over
    if (group.length === 10) {
      groups.push(group);
      group = [];
    }
  }
  // Whatever remains in the group array shall get pushed into the groups array and return the array
  groups.push(group);
  return groups;
}

function classFilter(index) {
  var array = grouper(document.querySelectorAll('.nav__row'));
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
    var array = grouper(document.querySelectorAll('.nav__row')),
      items = document.querySelectorAll('.page-link');
    for (let i = 0; i < array.length; i++) {
      items[i].addEventListener('click', function(event) {
        classFilter(parseInt(event.target.textContent - 1));
      });
    }
  }
}

function deleteNav() {
  var links = document.querySelectorAll('.nav__row');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Delete') {
        var id = event.target.getAttribute('key');

        $.ajax({
          type: 'POST',
          url: '/nav/delete:' + id,
        }).done(function(response) {
          if (response === true) {
            getNav();
          }
        });
      }
    });
  }
}

function postNav() {
  var form = document.getElementById('postNav'),
    submit = document.getElementById('submitNav');

  submit.addEventListener('click', function(event) {
    $.ajax({
      type: 'POST',
      url: '/nav/new',
      data: {
        name: document.getElementById('navTitle').value,
        url: document.getElementById('navUrl').value,
      },
    }).done(function(response) {
      if (response === true) {
        document.getElementById('navTitle').value = '';
        document.getElementById('navUrl').value = '';
      }
    });
    event.preventDefault();
    getNav();
  });
}

function renameNav() {
  var links = document.querySelectorAll('.nav__row');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Rename') {
        var id = event.target.getAttribute('key'),
          name = prompt('Rename link as?');

        $.ajax({
          type: 'POST',
          url: '/nav/rename:' + id,
          data: { name: name },
        }).done(function(response) {
          if (response === true) {
            getNav();
          }
        });
      }
    });
  }
}

function changeUrl() {
  var links = document.querySelectorAll('.nav__row');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'URL') {
        var id = event.target.getAttribute('key'),
          url = prompt('Change URL to?');

        $.ajax({
          type: 'POST',
          url: '/nav/url:' + id,
          data: { url: url },
        }).done(function(response) {
          if (response === true) {
            getNav();
          }
        });
      }
    });
  }
}

function setPost(data) {
  var body = $('#aboutEditor');
  body.trumbowyg('html', data[0].post);
}

function postAbout() {
  var post = $('#aboutEditor'),
    postId = document.getElementById('postId').textContent,
    submit = document.getElementById('submitAbout');

  submit.addEventListener('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/about/update',
      data: { post: post.trumbowyg('html') },
    }).done(function(response) {
      if (response === true) {
        getPost();
      }
    });
  });
}

getPost();

getNav();
