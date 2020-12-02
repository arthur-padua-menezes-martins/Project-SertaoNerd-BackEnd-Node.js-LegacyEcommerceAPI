# **[ E-COMMERCE API ]**
> # TECNOLOGIAS

**Express**
  **Bcrypt**
  **Cors**
  **Crypto Js**
  **EJS ( template engine )**
  **jsonwebtoken**
  **Moment**
  **Express Session**
  **Morgan**
  **Node Correios**
  **Node PagSeguro**
  **Nodemailer**
  
**Mongoose**
  **Mongoose Paginate**
  
<br/></br></br>

> # PROJETO

**API**

* 🏆 *cadastro de usuário*
* ✔️ *validação de campos obrigatórios*
* ✔️ *verificação preliminar da existância das informações*
* ✔️ *encriptação de senha*
* ✔️ *inserção das informções no banco de dados*
* ✔️ *tratamento de erros*

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

**4xx**
* ⚠️ *400 bad request, se campos obrigarórios forem omitidos ou inválidos*
* ⚠️ *401 unauthorized, se as informações não forem autênticas*
* ⚠️ *403 forbidden, se as informações forem restritas baseadas no tipo de acesso*
* ⚠️ *404 not foud, se o conteúdo buscado não foi encontado*
* ⚠️ *422 unprocessable, se a requisição não pode ser processada*

**5xx**
* 🐞 *500 server error, se ocorrer quaisquer erros do servidor*
