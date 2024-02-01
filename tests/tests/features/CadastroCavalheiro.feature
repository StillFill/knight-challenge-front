Feature: Gerenciamento

  @CadastrarCavalheiro
  Scenario: Atualizar Cavalheiro
    Given Usuário está na tela de listagem de cavalheiros
    And Ao entrar no formulario para criar um novo cavalheiro
    And Preenche os dados do cavalheiro com '<nome>', '<apelido>', '<DataNascimento>'
    And Preenche os atributos do cavalheiro com '<AtributoForca>', '<AtributoDestreza>', '<AtributoConstituicao>', '<AtributoInteligencia>', '<AtributoSabedoria>', '<AtributoCarisma>'
    And Selecione o atributo principal '<AtributoPrincipal>'
    And Preenche os dados da arma do cavalheiro com '<NomeArma>', '<AtributoArma>', '<ModArma>'
    And Clique no botão cadastrar para finalizar o cadastro
    # Then Seja possivel localizar o cavalheiro '<nome>' na lista de cavalheiros

    Examples: 
      | nome              | apelido | DataNascimento | AtributoPrincipal | AtributoForca | AtributoDestreza | AtributoConstituicao | AtributoInteligencia | AtributoSabedoria | AtributoCarisma | NomeArma | AtributoArma | ModArma |
      | Mauricio Gregorio | Mau     |     03/08/1998 | Força             |             5 |                5 |                    5 |                    5 |                 5 |               5 | Arco     | Fogo         |       5 |
      | Rodrigo Roberto   | Robs    |     03/08/2020 | Destreza          |            12 |                5 |                   11 |                   13 |                 3 |               2 | Espada   | Gelo         |      10 |

  @AtualizarApelidoCavalheiro
  Scenario: Atualizar Cavalheiro
    Given Usuário está na tela de listagem de cavalheiros
    And Ao selecionar o primeiro cavalheiro
    And Modifica o apelido do cavalheiro para '<apelido>'
    And Clique no botão cadastrar para finalizar o cadastro
    And Ao selecionar o primeiro cavalheiro
    Then Seja possivel verificar que seu apelido é '<apelido>'

    Examples: 
      | apelido       |
      | NovoApelido 1 |
      | NovoApelido 2 |

  @RemoverCavalheiro
  Scenario: Remover Cavalheiro
    Given Usuário está na tela de listagem de cavalheiros
    And Ao selecionar o primeiro cavalheiro
    And Seja possivel clicar no botão para torna-lo heroi e confirmar a validação
