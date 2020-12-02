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
  
</br></br></br>

> # FUNCIONALIDADES
</br></br>
**GERAIS**
</br></br>
* 🏆 *tratamento de erros*</br>
* ✔️ *direcionamento para rotas exclusivas ao tratamento de erros*</br>
* ✔️ *acoplamento de código de status baseando-se no tipo do erro*</br>
* ✔️ *envio de mensagem personalziada baseando-se no tipo de erro*</br>
* ✔️ *400 bad request, se campos obrigarórios forem omitidos ou inválidos*</br>
* ✔️ *401 unauthorized, se as informações não forem autênticas*</br>
* ✔️ *404 not found, se o conteúdo buscado não foi encontado*</br>
* ✔️ *422 unprocessable, se a requisição não pode ser processada*</br>
</br></br>
**USUÁRIOS**
</br></br>
* 🏆 *registro de usuário*</br>
* ✔️ *validação de campos obrigatórios*</br>
* ✔️ *verificação preliminar da existância das informações*</br>
* ✔️ *encriptação de senha*</br></br>
* ✔️ *inserção das informções no banco de dados*
</br></br>
* 🏆 *login de usuário*</br>
* ✔️ *validação de campos obrigatórios*</br>
* ✔️ *verificação preliminar da existância das informações*</br>
* ✔️ *decodificação e verificação da compatibilidade entre senha cadastrada e senha enviada*</br>
* ✔️ *criação de sessão*</br>
</br></br>
* 🏆 *pedido de redefinição de senha*</br>
* ✔️ *validação de campos obrigatórios*</br>
* ✔️ *verificação preliminar da existância das informações*</br>
* ✔️ *definição do período para redefinição de senha*</br>
* ✔️ *envio de e-mail com a chave necessária para a redefinição da senha*</br>
</br></br>
* 🏆 *redefinição de senha*</br>
* ✔️ *validação de campos obrigatórios*</br>
* ✔️ *verificação preliminar da existância das informações e validade do período de redefinição de senha*</br>
* ✔️ *retirada do período de redefinição de senha*</br>
* ✔️ *encriptação de senha*</br>
* ✔️ *inserção das informções no banco de dados*</br>
</br></br>
* 🏆 *autenticação*</br>
* ✔️ *verificação de campos obrigatórios*</br>
* ✔️ *busca por sessões existentes e compatíveis com os dados recebidos*</br>
* ✔️ *definição de usuário autenticado ou não autenticado*</br>




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
