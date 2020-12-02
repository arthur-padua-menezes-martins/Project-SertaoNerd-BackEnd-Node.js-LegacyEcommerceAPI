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
* ✔️ *inserção das informações no banco de dados*
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
* ✔️ *inserção das informações no banco de dados*</br>
</br></br>
</br></br>
**CONTA**
</br></br>
* 🏆 *atualização*</br>
* ✔️ *armazenamento de informações pertinentes a conta*</br>
* ✔️ *atualização das informações do banco de dados*</br>
* ✔️ *atualização das informações da sessão*</br>
</br></br>
* 🏆 *desativação*</br>
* ✔️ *atualização do status de desativação da conta*</br>
* ✔️ *desativação da sessão*</br>
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
* 🏆 *busca geral*</br>
* ✔️ *definição do tipo de ordenação (sort)*</br>
* ✔️ *definição do número de registros retornados (offset, limit, skip)*
* ✔️ *busca por determinadas informações (select)*
* ✔️ *busca por registros relacionados (populate)*
* ✔️ *busca por determinado número de registros (paginação)*
* ✔️ *busca por diversos registros*
* ✔️ *busca por determinado registro*
* ✔️ *filtro por tipo, tags, categoria*
</br></br>
</br></br>
**ENVIO DE E-MAIL**
</br></br>
* 🏆 *configuraçãos*</br>
* ✔️ *definição do host / serviço de envio, porta, tipo de segurança, dados da conta*</br>
* 🏆 *envio*</br>
* ✔️ *definição dos parâmetros obrigatórios*</br>
* ✔️ *leitura de arquivos (corpo do e-mail)*</br>
* ✔️ *aplicação dinâmica dos dados referentes ao envio do determinado e-mail*</br>
* ✔️ *disparo do e-mail*</br>
</br></br>
</br></br>
**AVALIAÇÕES**
</br></br>
* 🏆 *criação*</br>
* ✔️ *verificação de campos*</br>
* ✔️ *busca por produto avaliado*</br>
* ✔️ *definição e relacionamento de nova avaliação*</br>
</br></br>
* 🏆 *atualização*</br>
* ✔️ *verificação de campos*</br>
* ✔️ *atualização das informações do banco de dados*</br>
</br></br>
</br></br>
**ENTREGAS**
</br></br>
* 🏆 *integrações*</br>
* ✔️ *PRODUÇÃO: Correios*
* ✔️ *DESENVOLVIMENTO: Correios*
* 🏆 *cálculo do frete*</br>
* ✔️ *utilização de CEP de destino e das dimensões dos produtos*</br>
</br></br>
</br></br>
**PAGAMENTOS**
</br></br>
* 🏆 *integrações*</br>
* ❌ *PRODUÇÃO: PagSeguro*
* ✔️ *DESENVOLVIMENTO: PagSeguro SANDBOX*
* 🏆 *pagamento*</br>
* ❌ *PRODUÇÃO: online*
* ✔️ *DESENVOLVIMENTO: online*
* 🏆 *método de pagamento*</br>
* ❌ *PRODUÇÃO: boleto ou cartão*
* ✔️ *DESENVOLVIMENTO: boleto ou cartão*
</br></br>
</br></br>
**PEDIDOS**
</br></br>
* 🏆 *novo pedido*</br>
* ✔️ *recebimento de informações iniciais sobre o carrinho, entrega e pagamento*</br>
* ✔️ *verificação da disponibilidade da quantidade de produtos selecionados*</br>
* ✔️ *definição e relacionamento de um novo pedido, entrega e pagamento*</br>
* ✔️ *atualização da quantidade e disponibilidade dos produtos*</br>
</br></br>
* 🏆 *visualização dos pedidos*</br>
* ✔️ *seleção de informações gerais dos pedidos*</br>
</br></br>
* 🏆 *visualização do pedido*</br>
* ✔️ *seleção de informações da conta, carrinho, entrega e pagamento do pedido*</br>
</br></br>
* 🏆 *visualização do carrinho*</br>
* ✔️ *seleção dos dados do carrinho do pedido*</br>
</br></br>
* 🏆 *cancelamento de pedido*</br>
* ✔️ *atualização do status de cancelamento do pedido*</br>
* ✔️ *atualização da quantidade e disponibilidade dos produtos*</br>







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
