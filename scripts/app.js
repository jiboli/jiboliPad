
(function() {
  'use strict';

  var f;
var downloadLink;
var decrypt_control = 0;
var textarea = document.getElementById("t");
var urlInput = document.getElementById("urlInput");
var urlInput2 = document.getElementById("urlInput2");
var decode = document.getElementById("decode");
var code = document.getElementById("code");
var download = document.getElementById('download');
var xhr = new XMLHttpRequest();

var content = LZString.decompressFromBase64(window.location.hash.slice(1));
if(content) {
    textarea.value = content;
}

  var app = {
    visibleCards: {},
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    bitlyDialog: document.querySelector('.bitly-dialog-container'),
    decryptDialog: document.querySelector('.decrypt-dialog-container'),
    downloadDialog: document.querySelector('.download-dialog-container'),
    inverteDialog: document.querySelector('.inverte-dialog-container'),
    shareDialog: document.querySelector('.share-dialog-container'),
    newDialog: document.querySelector('.new-dialog-container')
  };

   // Toggles the visibility of the add new city dialog.
   app.toggleDialog = function(){
    //app.toggleAddDialog(false);
    app.toggleBitlyDialog(false);
    app.toggleDecryptDialog(false);
    //app.toggleDownloadDialog(false);
    app.toggleInverteDialog(false);
    app.toggleNewDialog(false);
    app.toggleShareDialog(false);
   };
   
   app.toggleNewDialog = function(visible) {
    if (visible) {
      app.newDialog.classList.add('new-dialog-container--visible');
    } else {
      app.newDialog.classList.remove('new-dialog-container--visible');
    }
  };
  app.toggleShareDialog = function(visible) {
    if (visible) {
      app.shareDialog.classList.add('share-dialog-container--visible');
    } else {
      app.shareDialog.classList.remove('share-dialog-container--visible');
    }
  };
  app.toggleDownloadDialog = function(visible) {
    if (visible) {
      app.downloadDialog.classList.add('download-dialog-container--visible');
    } else {
      app.downloadDialog.classList.remove('download-dialog-container--visible');
    }
  };
  app.toggleBitlyDialog = function(visible) {
    if (visible) {
      app.bitlyDialog.classList.add('bitly-dialog-container--visible');
    } else {
      app.bitlyDialog.classList.remove('bitly-dialog-container--visible');
    }
  };
  app.toggleDecryptDialog = function(visible) {
    if (visible) {
      app.decryptDialog.classList.add('decrypt-dialog-container--visible');
    } else {
      app.decryptDialog.classList.remove('decrypt-dialog-container--visible');
    }
  };
  app.toggleInverteDialog = function(visible) {
    if (visible) {
      app.inverteDialog.classList.add('inverte-dialog-container--visible');
    } else {
      app.inverteDialog.classList.remove('inverte-dialog-container--visible');
    }
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
  
  document.getElementById('new').addEventListener('click', function() {
    // Refresh all of the forecasts
    app.toggleNewDialog(true);
  });

  document.getElementById('share').addEventListener('click', function() {
    share();
    app.toggleShareDialog(true);
  });
  document.getElementById('download').addEventListener('click', function() {
    prepara_down();
    //app.toggleDownloadDialog(true);
  });
  document.getElementById('bitly').addEventListener('click', function() {
    bitly();
    app.toggleBitlyDialog(true);
  });
  document.getElementById('decrypt').addEventListener('click', function() {

    app.toggleDecryptDialog(true);
  });
  document.getElementById('inverte').addEventListener('click', function() {
    
    app.toggleInverteDialog(true);
  });

  document.getElementById('cancelar').addEventListener('click', function() {
     
    app.toggleDialog(false);
  });
  document.getElementById('cancelar2').addEventListener('click', function() {
     
    app.toggleDialog(false);
  });
  document.getElementById('cancelar3').addEventListener('click', function() {
     
    app.toggleDialog(false);
  });
  document.getElementById('cancelar4').addEventListener('click', function() {
     
    app.toggleDialog(false);
  });
  document.getElementById('cancelar5').addEventListener('click', function() {
     
    app.toggleDialog(false);
  });

  document.getElementById('novoDocumento').addEventListener('click', function(){
    app.toggleNewDialog(false);
    clear();
    

  });

  document.getElementById('decodificar').addEventListener('click', function(){
    app.toggleDialog(false);
    clear();
    window.location.hash = decode.value;
    urlInput.value = window.location;
    document.title = title();
    //download.setAttribute('download', filename());
    //download.href = downloadUri();
    textarea.value = LZString.decompressFromBase64(window.location.hash.slice(1));
    

  });

  document.getElementById('codificar').addEventListener('click', function(){
    //app.toggleDialog(false);
    encrypt();
    

  });

  window.addEventListener('beforeinstallprompt', function(e) {
    // beforeinstallprompt Event fired
  
    // e.userChoice will return a Promise.
    // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
    e.userChoice.then(function(choiceResult) {
  
      console.log(choiceResult.outcome);
  
      if(choiceResult.outcome == 'dismissed') {
        console.log('User cancelled home screen install');
      }
      else {
        console.log('User added to home screen');
      }
    });
  });
  /*document.getElementById('btnShare').addEventListener('click', function(){
    app.toggleNewDialog(false);
    
    

  });
*/

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/


  app.newFile = function(key, label) {
  };



//jiboli messed code, sorry about that



processContent(); 

function processContent() {
    window.location.hash = hash();
    urlInput.value = window.location;
    document.title = title();

}

function inputChanged(){
     clearInterval(f);
    f = setTimeout(function() {
        decrypt_url();

    }, 500);
}

function hash() {
    return LZString.compressToBase64(textarea.value);
}

function title() {
    return textarea.value ? textarea.value.slice(0,30) : 'JiboliPad';
}

function filename() {
    return title().replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.txt';
}

function downloadUri() {
    return "data:text/plain," + encodeURIComponent(textarea.value);
}
 function downloadUriCRY() {
    return "data:text/plain," + LZString.compressToBase64(textarea.value);
}

function encrypt(){
  code.select();
  code.value = hash();
    return false;
}

 function decrypt(){
   urlInput.style.display = "block";
    urlInput.value = "";
     urlInput.focus();
    decrypt_control = 1;




}

function decrypt_url(){
   window.location.hash = urlInput.value;
    urlInput.value = window.location;
    document.title = title();
    //download.setAttribute('download', filename());
    //download.href = downloadUri();
    textarea.value = LZString.decompressFromBase64(window.location.hash.slice(1));
}

function contentChanged() {
    clearInterval(f);
    f = setTimeout(function() {
        processContent();
    }, 500);
}

function share() {
    urlInput.value = window.location;
    urlInput.style.display = "block";
    urlInput.select();
    new ClipboardJS('.clipboardButton');
    return false;
}

function unshare() {
    urlInput.style.display = "none";
}

function clear() {
    textarea.value = '';
    unshare();
    textarea.focus();
    processContent();
    return false;
}

function bitly() {
  new ClipboardJS('.clipboardButton2');
    urlInput2.value = '';
    
    
    xhr.open('GET', "https://api-ssl.bitly.com/v3/shorten?access_token=1792e3e104fa834c2df8934897a2d09252fda169&longUrl=" + encodeURIComponent(window.location) +"&format=txt", true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);


}
function processRequest(e){
    if (xhr.readyState == 4 && xhr.status == 200) {
      
        urlInput2.value = xhr.responseText;            
        urlInput2.style.display = "block";
    urlInput2.select();
    }else{
      urlInput2.value = "Modo Offline! Fique online para utilizar.";            
        urlInput2.style.display = "block";
    urlInput2.select();
    //xhr.DONE;
    }
}


function prepara_down(){
var file = saveTextAsFile();
file.click();

file = '';

}


function saveTextAsFile()
{
var textToWrite = textarea.value;
var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
var fileNameToSaveAs = "JiboliPAD" + filename();

var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
if (window.URL != null)
{
// Chrome allows the link to be clicked
// without actually adding it to the DOM.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
}
else
{
// Firefox requires the link to be added to the DOM
// before it can be clicked.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.onclick = destroyClickedElement;
downloadLink.style.display = "none";
document.body.appendChild(downloadLink);
}

//downloadLink.click();
return downloadLink;
}

function destroyClickedElement(event)
{
document.body.removeChild(event.target);
}

function loadFileAsText()
{
var fileToLoad = document.getElementById("fileToLoad").files[0];

var fileReader = new FileReader();
fileReader.onload = function(fileLoadedEvent) 
{
var textFromFileLoaded = fileLoadedEvent.target.result;
document.getElementById("inputTextToSave").value = textFromFileLoaded;
};
fileReader.readAsText(fileToLoad, "UTF-8");
}


function destroyClickedElement(event) {
// remove the link from the DOM
document.body.removeChild(event.target);
}




urlInput.onpaste =  inputChanged;


textarea.onkeyup = contentChanged;
textarea.onpaste = contentChanged;
textarea.onfocus = unshare;


//Dynnamic style changer




})();