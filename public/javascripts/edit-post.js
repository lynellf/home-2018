function getPost() {
  var postId = document.getElementById('postId').textContent;
  $.ajax({
    type: 'GET',
    url: '/post/:' + postId,
  }).done(function(data) {
    setPost(data);
  });
}

function setPost(data) {
  var title = document.getElementById('postTitle'),
    body = $('#textEditor'),
    preview = $('#preview'),
    type = document.getElementById('type'),
    tags = document.getElementById('postType'),
    images = document.getElementById('postImages'),
    gitHub = document.getElementById('gitHub'),
    projectUrl = document.getElementById('projectUrl'),
    draft = document.getElementById('draft'),
    post = data[0],
    draftToggle;

    title.value = post.title,
    body.trumbowyg('html', post.body);
    preview.trumbowyg('html', post.preview);
    type.value = post.type;
    images.value = post.images;
    gitHub.value = post.gitHub;
    projectUrl.value = post.projectUrl;
    post.draft === 'on' ? (draft.checked = true) : (draft.checked = false);
}

getPost(postId);
