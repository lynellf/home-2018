var dataFiles = [],
  rawFiles = [];

function getFiles() {
  var fileList = document.querySelector('.files');
  $.ajax({
    type: 'GET',
    url: '/files/list',
  })
    .done(function(data) {
      rawFiles = data.files;
      dataFiles = grouper(data.files);
      renderFiles(dataFiles, fileList);
      classFilter(0);
      pagination(dataFiles);
      selectPage();
      deleteFile();
      renameFile();
    })
    .fail(function(error) {
      console.log('An error occured:', error);
    });
}

function renderFiles(array, node) {
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      var row = document.createElement('tr'),
        nameCell = document.createElement('td');
      optionCell = document.createElement('td');
      hyperLink = document.createElement('a');
      renameBtn = document.createElement('button');
      deleteBtn = document.createElement('button');
      renameBtn.textContent = 'Rename';
      deleteBtn.textContent = 'Delete';
      hyperLink.setAttribute('href', '/uploads/' + array[a][b]);
      hyperLink.textContent = array[a][b];
      row.className = 'files__row d-flex justify-content-between';
      optionCell.className = 'd-flex justify-content-around w-25';
      deleteBtn.className = 'files__delete btn btn-outline-danger';
      renameBtn.className = 'files__rename btn btn-outline-primary';
      node.appendChild(row);
      row.appendChild(nameCell);
      row.appendChild(optionCell);
      nameCell.appendChild(hyperLink);
      optionCell.appendChild(renameBtn);
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
  var array = grouper(document.querySelectorAll('.files__row'));
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
    var array = grouper(document.querySelectorAll('.files__row')),
      items = document.querySelectorAll('.page-link');
    for (let i = 0; i < array.length; i++) {
      items[i].addEventListener('click', function(event) {
        classFilter(parseInt(event.target.textContent - 1));
      });
    }
  }
}

function deleteFile() {
  var files = document.querySelectorAll('.files__row'),
    nav = document.querySelector('#pagination'),
    pagination = document.createElement('ul'),
    newFiles = rawFiles,
    fileList = document.querySelector('.files'),
    nodes = Array.prototype.slice.call(
      document.querySelector('.files').children
    ),
    index,
    fileName;
  pagination.className = 'pagination justify-content-center';

  for (let i = 0; i < files.length; i++) {
    files[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Delete') {
        var row = event.target.parentNode.parentNode,
          index = nodes.indexOf(row);
        fileName =
          event.target.parentNode.previousElementSibling.children[0]
            .textContent;
        // Server action
        $.ajax({
          type: 'GET',
          url: '/files/delete:' + fileName,
        }).done(function() {
          newFiles.splice(index, 1);
          fileList.textContent = '';
          renderFiles(grouper(newFiles), fileList);
          nav.textContent = '';
          nav.appendChild(pagination);
          classFilter(0);
          if (grouper(newFiles).length > 1) {
            for (var i = 0; i < grouper(newFiles).length; i++) {
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
          deleteFile();
          renameFile();
          selectPage();
        });
      }
    });
  }
}

function renameFile() {
  var files = document.querySelectorAll('.files__row'),
    nodes = Array.prototype.slice.call(
      document.querySelector('.files').children
    ),
    index,
    names = {
      oldName: '',
      newName: '',
    };

  for (var i = 0; i < files.length; i++) {
    files[i].addEventListener('click', function(event) {
      if (event.target.textContent === 'Rename') {
        var row = event.target.parentNode.parentNode,
          index = nodes.indexOf(row);
        names.oldName =
          event.target.parentNode.previousElementSibling.children[0].textContent;
        names.newName = prompt('Please enter a new file name');
        // Server action
        $.ajax({
            type: 'POST',
            url: '/files/rename',
            data: {
                oldName: names.oldName,
                newName: names.newName
            }
        }).done(function() {
            event.target.parentNode.previousElementSibling.children[0].textContent = names.newName;
            event.target.parentNode.previousElementSibling.children[0].setAttribute('href', '/uploads/' + names.newName);
        });
      }
    });
  }
}

getFiles();
