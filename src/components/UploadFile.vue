<template>
  <form action="upload.php" method="post" enctype="multipart/form-data" name="fileUploadForm" v-on:submit.prevent="uploadFile">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload File" name="submit" >
  </form>
</template>


<script>

  import axios from 'axios';

  export default {
    name : 'component-stuff',
    methods : {
      uploadFile : function(){
        var form = document.forms.namedItem('fileUploadForm');
        var formData = new FormData(form);
        axios.post('http://localhost/product/upload.php', formData)
          .then(function(resp) { window.console.log(resp) })
          //.catch(function(err) {  })

      }
    }
  }
</script>
