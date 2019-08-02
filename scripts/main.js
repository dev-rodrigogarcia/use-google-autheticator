if(localStorage.getItem('token')) {

  var user = localStorage.getItem('userAuth');
  user = JSON.parse(user);
  
  document.getElementById('userImage').src = user.image;
  document.getElementById('userName').innerHTML = user.name;
  document.getElementById('userEmail').innerHTML = user.email;

  let hora = new Date().getHours();
  let welcome = '';

  if(hora >= 12 && hora < 18) welcome = 'Boa tarde';
  else if(hora >= 18 && hora <= 24) welcome = 'Bom noite';
  else welcome = 'Bom dia';

  document.getElementById('welcome').innerHTML = welcome;


  var table = [
    {
      icon: '<i class="fab fa-js-square fa-2x"></i>',
      text: 'JavaScript'
    },
    {
      icon: '<i class="fab fa-bootstrap fa-2x"></i>',
      text: 'Bootstrap'
    },
    {
      icon: '<i class="fab fa-font-awesome fa-2x"></i>',
      text: 'Font Awesome'
    },
    {
      icon: '<i class="fab fa-google fa-2x"></i>',
      text: 'Google Autheticator'
    },
    {
      icon: '<i class="fab fa-github-square fa-2x"></i>',
      text: 'Github'
    },
    {
      icon: '<i class="fas fa-laptop-code fa-2x"></i>',
      text: 'VSCode'
    },
  ];

  for(let i = 0; i < table.length; i++) {
    var tr = `
      <tr>
        <th>${ table[i].icon }</th>
        <td>${ table[i].text }</td>
      </tr>
    `;

    document.getElementById('tbodyRoot').insertAdjacentHTML('beforeEnd', tr);
  }
}
