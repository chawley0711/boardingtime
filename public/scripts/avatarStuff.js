var selEyes = document.getElementById('selEyes');
var selNose = document.getElementById('selNose');
var selMouth = document.getElementById('selMouth');
var selColor = document.getElementById('selColor');
var imgAvatar = document.getElementById('imgAvatar');

function listeners(){
  selEyes.addEventListener('change', updateAvatar);
  selNose.addEventListener('change', updateAvatar);
  selMouth.addEventListener('change', updateAvatar);
  selColor.addEventListener('change', updateAvatar);
}
listeners();
var colorString = '24A18B';
function updateAvatar(){
  var me = event.target;
  if(me.id == 'selColor'){
    var colorString2 = '';
    for(i = 1; i < 7; i++){
      colorString2 += me.value[i];
    }
    colorString = colorString2;
  }
  imgAvatar.src = 'https://api.adorable.io/avatars/face/eyes'+selEyes.value+'/nose'+selNose.value+'/mouth'+selMouth.value+'/' + colorString;
  document.cookie = 'avatarString=' + imgAvatar.src;
}