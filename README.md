# **[ E-COMMERCE API ]**
> # TECNOLOGIAS

**Express**</br>
  **Bcrypt**</br>
  **Cors**</br>
  **Crypto Js**</br>
  **EJS ( template engine )**</br>
  **jsonwebtoken**</br>
  **Moment**</br>
  **Express Session**</br>
  **Mongoose**</br>
  **Mongoose Paginate**
  **Morgan**</br>  
  **Node Correios**</br>
  **Node PagSeguro**</br>
  **Nodemailer**</br>
  
<br/></br></br>

> # FUNCIONALIDADES

**USUÁRIOS**
* 🏆 *tratamento de erros*
* ✔️ *direcionamento para rotas exclusivas ao tratamento de erros*
* ✔️ *acoplamento de código de status baseando-se no tipo do erro*
* ✔️ *envio de mensagem personalziada baseando-se no tipo de erro*
* ✔️ *400 bad request, se campos obrigarórios forem omitidos ou inválidos*
* ✔️ *401 unauthorized, se as informações não forem autênticas*
* ✔️ *404 not found, se o conteúdo buscado não foi encontado*
* ✔️ *422 unprocessable, se a requisição não pode ser processada*

* 🏆 *registro de usuário*
* ✔️ *validação de campos obrigatórios*
* ✔️ *verificação preliminar da existância das informações*
* ✔️ *encriptação de senha*
* ✔️ *inserção das informções no banco de dados*

* 🏆 *login de usuário*
* ✔️ *validação de campos obrigatórios*
* ✔️ *verificação preliminar da existância das informações*
* ✔️ *decodificação e verificação da compatibilidade entre senha cadastrada e senha enviada*
* ✔️ *criação de sessão*

* 🏆 *pedido de redefinição de senha*
* ✔️ *validação de campos obrigatórios*
* ✔️ *verificação preliminar da existância das informações*
* ✔️ *definição do período para redefinição de senha*
* ✔️ *envio de e-mail com a chave necessária para a redefinição da senha*

* 🏆 *redefinição de senha*
* ✔️ *validação de campos obrigatórios*
* ✔️ *verificação preliminar da existância das informações e validade do período de redefinição de senha*
* ✔️ *retirada do período de redefinição de senha*
* ✔️ *encriptação de senha*
* ✔️ *inserção das informções no banco de dados*

* 🏆 *autenticação*
* ✔️ *verificação de campos obrigatórios*
* ✔️ *busca por sessões existentes e compatíveis com os dados recebidos*
* ✔️ *definição de usuário autenticado ou não autenticado*




**/api/signin - POST**
* 🏆 *autenticar informações e disponibilizar acessos*
* ✔️ *log de erros*
* ✔️ *verificar a procedência das informações*
* ✔️ *retornar o token de acesso*

**/api/survey - POST**
* 🏆 *autenticar informações e disponibilizar opções referentes à enquete*
* ✔️ *log de erros*
* ❌ *somente acesso administrativo*
* ✔️ *verificar a procedência das informações (**question** e **answers**)*
* ✔️ *criação da enquete*

<br/></br></br>

> # SUCCESS

**2xx**
* ✨ *200 ok, requisição completa e retorno das informações*
* ✨ *201 created, requisição completa e criação de um novo recurso*
* ✨ *202 accepted, requisição completa*
* ✨ *204 no content, requisição completa e nenhum retorno*

<br/></br></br>

> # ERRORS


⚠️
**5xx**
* 🐞 *500 server error, se ocorrer quaisquer erros do servidor*
