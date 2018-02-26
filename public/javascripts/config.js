$('#textEditor').trumbowyg({
  btns: ['strong', 'em', '|', 'insertImage'],
  autogrow: false,
});

$('#preview').trumbowyg({
  btns: ['strong', 'em', '|', 'insertImage'],
  autogrow: false,
});

Dropzone.autoDiscover = false;
jQuery(document).ready(function() {
  $('#dropzone').dropzone({
    url: '/files/upload',
    dictDefaultMessage: 'Drop files here or<br>click to upload...',
  });
});