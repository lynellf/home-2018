function getSkills() {
  var skillList = document.querySelector('.skills');
  $.ajax({
    type: 'GET',
    url: '/skill/all',
  }).done(function(data) {
    skillList.textContent = '';
    renderSkills(grouper(data), skillList, data);
    classFilter(0);
    pagination(grouper(data));
    selectPage();
    postSkill();
    renameSkill();
    deleteSkill();
    rateSkill();
  });
}

function renderSkills(array, node, rawArray) {
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      var index = rawArray.indexOf(array[a][b]),
        row = document.createElement('tr'),
        nameCell = document.createElement('td'),
        ratingCell = document.createElement('td'),
        optionCell = document.createElement('td'),
        renameBtn = document.createElement('button'),
        ratingBtn = document.createElement('button'),
        deleteBtn = document.createElement('button');
      renameBtn.textContent = 'Rename';
      renameBtn.setAttribute('index', index);
      renameBtn.setAttribute('key', array[a][b]['_id']);
      ratingBtn.textContent = 'Rate';
      ratingBtn.setAttribute('index', index);
      ratingBtn.setAttribute('key', array[a][b]['_id']);
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('index', index);
      deleteBtn.setAttribute('key', array[a][b]['_id']);
      nameCell.textContent = array[a][b]['name'];
      ratingCell.textContent = array[a][b]['rating'];
      row.className = 'skills__row d-flex justify-content-between';
      optionCell.className = 'd-flex justify-content-around w-25';
      deleteBtn.className = 'skills__delete btn btn-outline-danger btn-sm';
      ratingBtn.className = 'skills__rate btn btn-outline-primary btn-sm';
      renameBtn.className = 'skills__rename btn btn-outline-primary btn-sm';
      node.appendChild(row);
      row.appendChild(nameCell);
      row.appendChild(ratingCell);
      row.appendChild(optionCell);
      optionCell.appendChild(renameBtn);
      optionCell.appendChild(ratingBtn);
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
  var array = grouper(document.querySelectorAll('.skills__row'));
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
    var array = grouper(document.querySelectorAll('.skills__row')),
      items = document.querySelectorAll('.page-link');
    for (let i = 0; i < array.length; i++) {
      items[i].addEventListener('click', function(event) {
        classFilter(parseInt(event.target.textContent - 1));
      });
    }
  }
}

function postSkill() {
  var form = document.getElementById('postSkill'),
    submit = document.getElementById('submitSkill');

  submit.addEventListener('click', function(event) {
    $.ajax({
      type: 'POST',
      url: '/skill/new',
      data: {
        name: document.getElementById('skillTitle').value,
        rating: parseInt(document.getElementById('skillExp').value),
      },
    }).done(function(response) {
      if (response === true) {
        document.getElementById('skillTitle').value = '';
        document.getElementById('skillExp').value = '';
      }
    });
    event.preventDefault();
    getSkills();
  });
}

function deleteSkill() {
  var skills = document.querySelectorAll('.skills__row');

  for (var i = 0; i < skills.length; i++) {
    skills[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Delete') {
        var id = event.target.getAttribute('key');

        $.ajax({
          type: 'POST',
          url: '/skill/delete:' + id,
        }).done(function(response) {
          if (response === true) {
            getSkills();
          }
        });
      }
    });
  }
}

function renameSkill() {
  var skills = document.querySelectorAll('.skills__row');

  for (var i = 0; i < skills.length; i++) {
    skills[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Rename') {
        var id = event.target.getAttribute('key'),
          name = prompt('Rename skill as?');

        $.ajax({
          type: 'POST',
          url: '/skill/rename:' + id,
          data: { name: name },
        }).done(function(response) {
          if (response === true) {
            getSkills();
          }
        });
      }
    });
  }
}

function rateSkill() {
  var skills = document.querySelectorAll('.skills__row');

  for (var i = 0; i < skills.length; i++) {
    skills[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Rate') {
        var id = event.target.getAttribute('key'),
          rating = prompt('Rate skill as?');

        $.ajax({
          type: 'POST',
          url: '/skill/rate:' + id,
          data: { rating: rating },
        }).done(function(response) {
          if (response === true) {
            getSkills();
          }
        });
      }
    });
  }
}

getSkills();
