var prelogin = document.getElementById('preLoginStuff');
var postlogin = document.getElementById('postLoginStuff');
var loginvalue = '';
function createLoginCookie(){
  if(loginvalue == ''){
    document.cookie = 'isAuthenticated=false';
  }
  else if(loginvalue == 'false'){
    document.cookie = 'isAuthenticated=false';
  }
  else if(loginvalue == 'true'){
    document.cookie='isAuthenticated=true'
  }
  
}
function getLoginCookie(){
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split('; ');
  var logincookie = cookies[1];
  for(i = 16; i < logincookie.length; i++){
    if(loginvalue != 'true'){
      loginvalue+=logincookie[i];
    }
  }
}
function toggleLogin(){
  if (loginvalue == 'true') {
    prelogin.style = "display: none";
    postlogin.style ="display: block";
  } else {
    postlogin.style = "display: none";
    prelogin.style = "display: block";
  }
}
getLoginCookie();
createLoginCookie();
getLoginCookie();
toggleLogin();