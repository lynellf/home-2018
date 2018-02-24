$('#textEditor').trumbowyg({
  btns: ['strong', 'em', '|', 'insertImage'],
  autogrow: true,
});

Dropzone.autoDiscover = false;
jQuery(document).ready(function() {
  $('#dropzone').dropzone({
    url: '/image/upload',
    dictDefaultMessage: 'Drop files here or<br>click to upload...',
  });
});