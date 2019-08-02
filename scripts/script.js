if(localStorage.getItem('token')) {
  executeToken();
} else {
  if(['/main.html','/'].indexOf(window.location.pathname) >= 0) goLogin();

  document.getElementById('isLoading').style.display = 'none';
  document.getElementById('isntLogged').style.display = 'block';
}

async function executeToken() {
  var userResponse = await checkToken();

  if(!userResponse || userResponse.error) {
    cleanStorage();

    if(['/main.html','/'].indexOf(window.location.pathname) >= 0) return goLogin();

    document.getElementById('isLogged').style.display = 'none';
    document.getElementById('isntLogged').style.display = 'block';
    document.getElementById('isLoading').style.display = 'none';

  } else {
    if(window.location.pathname == '/access.html') {
      document.getElementById('logo').src = userResponse.picture;
      document.getElementById('userName').innerHTML = userResponse.name;
      document.getElementById('userEmail').innerHTML = userResponse.email;
      document.getElementById('lastLogin').innerHTML = formatDate(userResponse.iat);

      document.getElementById('isLogged').style.display = 'block';
      document.getElementById('isntLogged').style.display = 'none';
      document.getElementById('hasLogo').style.display = 'none';
      document.getElementById('isLoading').style.display = 'none';
    }
  }

}

function formatDate(iat) {
  let date = new Date(iat * 1000);
  return `
            ${ date.getDate() < 10 ? '0' : '' }${ date.getDate() }/${ date.getMonth() < 10 ? '0' : '' }${ date.getMonth() + 1 }/${ date.getFullYear() }
            ${ date.getHours() < 10 ? '0' : '' }${ date.getHours() }:${ date.getMinutes() < 10 ? '0' : '' }${ date.getMinutes() }:${ date.getSeconds() < 10 ? '0' : '' }${ date.getSeconds() }
          `;
}

function cleanStorage() {
  localStorage.removeItem('userAuth');
  localStorage.removeItem('token');
}

function checkToken() {
  let token = localStorage.getItem('token');
  let url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`

  return fetch(url).then(response => response.json());
}

var renderButton = () => {
    gapi.signin2.render('btn-access', {
        'scope': 'email profile https://www.googleapis.com/auth/plus.login',
        'width': 300,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function onSuccess(googleUser) {
    let profile = googleUser.getBasicProfile();
    let user = {
      'id': profile.getId(),
      'name': profile.getName(),
      'image': profile.getImageUrl(),
      'email': profile.getEmail()
    }

    localStorage.setItem('userAuth', JSON.stringify(user));
    localStorage.setItem('token', googleUser.getAuthResponse().id_token);

    signIn();
}

function signIn() {
  return window.location.href = '/main.html';
}

function goLogin() {
  return window.location.href = '/access.html';
}

function onFailure(error) {
    console.log(error);
}

function signOut() {
    cleanStorage();
    executeToken();
    return gapi.auth2.getAuthInstance().signOut();
}

function accessWithEmail() {
    return document.getElementById('alert-email').style.display = 'block';
}

function closeAlert() {
    return document.getElementById('alert-email').style.display = 'none';
}
