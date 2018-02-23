$('#textEditor').trumbowyg({
  btns: ['strong', 'em', '|', 'insertImage'],
  autogrow: true,
});

Dropzone.autoDiscover = false;
jQuery(document).ready(function() {
  $('#dropzone').dropzone({
    url: '/file/post',
    dictDefaultMessage: 'Drop files here or<br>click to upload...',
  });
});