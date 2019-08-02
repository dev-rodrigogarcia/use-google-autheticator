# Problema
 O nosso cliente solicita que autenticação de uma determinada API seja realizada com segundo fator de autenticação usando Google Authenticator.

# Apresentação
### Implementação
Foi utilizado no projeto as tecnologias de maior aceitação no mercado e que atendem as boas práticas do desenvolvimento web.

| # | Name |
| ------ | ------ |
| 1 | JavaScript |
| 2 | Bootstrap |
| 3 | Font Awesome |
| 4 | Google Autheticator |
| 5 | Github |
| 6 | VSCode |

### Solução

Após a leitura do Desafio, foi feito uma verificação na Documentação do Google Authenticator (https://developers.google.com/adwords/api/docs/guides/authentication?hl=pt-br) em conjunto com o Vídeo (https://www.youtube.com/watch?v=mVIxzH4EWmA) proposto no desafio.

Antes de começar a programar foi necessário criar um projeto e um client ID no Google Developer Console, Conforme sequencia abaixo:

- Foi criado um projeto no Google Developer Console.
- Dentro do projeto foi criada uma credencial de opção “ID do cliente OAuth"
- O tipo de aplicativo definido foi “Aplicativo da Web” e foi informado as origens de JavaScript autorizadas (CORS)

### Origens autorizadas

- http://localhost:3000
- http://localhost:5500
- https://auth-with-google.herokuapp.com
- https://herokuapp.com
- https://auth-with-google.herokuapp.com:5000
- https://auth-with-google.herokuapp.com:3000
- http://localhost:8080
- http://auth-with-google.herokuapp.com:3000
- http://auth-with-google.herokuapp.com:5000
- http://herokuapp.com
- http://auth-with-google.herokuapp.com

Depois desses passos, foi inserido dentro da tag head do html o Client ID

```sh
<meta name="google-signin-client_id" content="< CLIENT ID >">
```

E ao final da tag body um arquivo .JS da própria plataforma Google para renderizar o botão seguindo o padrão deles.

```sh
<script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
```

### Funções diretamente ligadas a autenticação do usuário

#### Função de exibir o botão do Google e autenticar usuário

```sh
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
```

#### Função para revogar o acesso

```sh
function signOut() {
     cleanStorage();
     executeToken();
     return gapi.auth2.getAuthInstance().signOut();
}
```

#### Função para verificar se o Token é valido
```sh
 function checkToken() {
   let token = localStorage.getItem('token');
   let url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
   
   return fetch(url).then(response => response.json());
}
```

### Notas
- O objetivo do desafio é realizar a autenticação de uma determinada API com um segundo fator de autenticação, no caso o Google Autheticator, o Token gerado pelo mesmo foi armazenado no LocalStorage do browser para validação de acesso, assim deixando claro que não foi realizado nenhum levantamento de requisitos especifico visando construir uma API com niveis de segurança e afins.

- O código e suas dependências foram armazenados no Github para análise dos recrutarores.

- Foi feito o deploy do projeto em um servidor gratuito (Heroku), assim permitindo a experiência de uso dos recrutadores, sem a necessidade de possuir um servidor local.

- O projeto no Heroku estará disponivel até o fim do processo seletivo da empresa ou por pedido da mesma.

- E por fim agradeço a oportunidade de estar participando do processo seletivo da Sensedia, e por ter a oportunidade de conhecer na prática a ferramenta proposta no desafio.
