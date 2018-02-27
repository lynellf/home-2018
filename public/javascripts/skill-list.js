function getSkills() {
    var skillList = document.querySelector('.skills');
    $.ajax({
        type: 'GET',
        url: '/skill/all'
    }).done(function(data){
        renderSkills(grouper(data), skillList);
        classFilter(0);
        pagination(data);
        selectPage();
        postSkill();
    })
}

function renderSkills(array, node) {
    for (let a = 0; a < array.length; a++) {
      for (let b = 0; b < array[a].length; b++) {
        var row = document.createElement('tr'),
          nameCell = document.createElement('td');
        optionCell = document.createElement('td');
        renameBtn = document.createElement('button');
        ratingBtn = document.createElement('button');
        deleteBtn = document.createElement('button');
        renameBtn.textContent = 'Rename';
        ratingBtn.textContent = 'Rate';
        deleteBtn.textContent = 'Delete';
        nameCell.textContent = array[a][b]['name'];
        row.className = 'skills__row d-flex justify-content-between';
        optionCell.className = 'd-flex justify-content-around w-25';
        deleteBtn.className = 'skills__delete btn btn-outline-danger';
        ratingBtn.className = 'skills__rate btn btn-outline-primary';
        renameBtn.className = 'skills__rename btn btn-outline-primary';
        node.appendChild(row);
        row.appendChild(nameCell);
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
        submit = document.getElementById('submitSkill'),
        nameInput = document.getElementById('skillTitle').value,
        rating = parseInt(document.getElementById('skillExp').value),
        formData = {
            name: '',
            rating: 0
        };

        submit.addEventListener('click', function(event) {
            event.preventDefault();
            formData.name = nameInput;
            formData.rating = rating;

            $.ajax({
                type: 'POST',
                url: '/skill/new',
                data: formData
            }).done(function(response) {
                if(response === true) {
                    nameInput = '';
                    rating = 0;
                }
            });
        });
}

getSkills();