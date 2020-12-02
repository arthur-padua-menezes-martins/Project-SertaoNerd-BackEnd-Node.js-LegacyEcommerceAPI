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
</br></br>
**MIDDLEWARE**
</br></br>
* 🏆 *autenticação*</br>
* ✔️ *verificação de campos obrigatórios*</br>
* ✔️ *busca por sessões existentes e compatíveis com os dados recebidos*</br>
* ✔️ *definição de usuário autenticado*</br>
* ✔️ *liberação de determinadas rotas basenado-se no nível de acesso da conta*</br>
</br></br>
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
</br></br>
**CONTA**
</br></br>
* 🏆 *atualização de informações da conta*</br>
* ✔️ *armazenamento de informções pertinentes a conta*</br>
* ✔️ *atualização das informções do banco de dados*</br>
* ✔️ *atualização das informções da sessão*</br>
</br></br>
* 🏆 *remoção da conta*</br>
* ✔️ *atualização do status de desativação da conta*</br>
* ✔️ *remoção da sessão*</br>
</br></br>
</br></br>
**BUSCA**
</br></br>
* 🏆 *busca por termos*</br>
* ✔️ *definição do tipo de ordenação (sort)*</br>
* ✔️ *definição do número de registros retornados (offset, limit, skip)*
* ✔️ *busca por diversos segmentos da mesma frase (termos)*
* ✔️ *busca por registros relacionados (populate)*
* ✔️ *busca por determinado número de registros (paginação)*
</br></br>
* 🏆 *busca geral de produtos*</br>
* ✔️ *definição do tipo de ordenação (sort)*</br>
* ✔️ *definição do número de registros retornados (offset, limit, skip)*
* ✔️ *busca por determinadas informações (select)*
* ✔️ *busca por registros relacionados (populate)*
* ✔️ *busca por determinado número de registros (paginação)*
* ✔️ *busca por determinado registro*
* ✔️ *filtro por tipo, tags, categoria*
</br></br>
</br></br>
**ENVIO DE E-MAIL**
</br></br>
* 🏆 *definição de informações*</br>
* ✔️ *definição do host / serviço de envio, porta, tipo de segurança, dados da conta*</br>
* 🏆 *envio*</br>
* ✔️ *definição dos parâmetros obrigatórios*</br>
* ✔️ *leitura de arquivos (corpo do e-mail / HTML)*</br>
* ✔️ *aplicação dinâmica dos dados referentes ao envio do determinado e-mail*</br>









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
