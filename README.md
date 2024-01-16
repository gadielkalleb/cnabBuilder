# Desafio tecnico leitor de arquivos CNAB

Este desafio tem a proposta de melhorar uma CI que le arquivos cnab.
O arquivo CNAB (Comunicação Nacional de Boleto) não se refere a um formato específico de arquivo, mas sim a um padrão de comunicação utilizado no Brasil para troca de informações entre instituições financeiras e empresas. O CNAB é um acrônimo para "Centro Nacional de Automação Bancária", e o termo geralmente está associado aos arquivos de remessa e retorno utilizados em transações bancárias, especialmente relacionadas a boletos bancários.

Os arquivos CNAB são utilizados para transmitir informações sobre transações financeiras entre empresas e bancos de forma eletrônica. Eles seguem um padrão estabelecido pela Febraban (Federação Brasileira de Bancos), que define a estrutura e o layout dos arquivos para garantir a interoperabilidade entre diferentes sistemas bancários e empresas.

Os arquivos CNAB podem ser de diversos tipos, dependendo da finalidade da transação, como CNAB 240 e CNAB 400, por exemplo. O CNAB 240 é mais comum para transações mais modernas, enquanto o CNAB 400 é um formato mais antigo.

Em resumo, o arquivo CNAB é um padrão utilizado para facilitar a comunicação e a troca de informações entre empresas e instituições financeiras no contexto de transações bancárias no Brasil.

Um CNAB é um arquivo posicional, sendo que cabeçalho é as duas primeiras linhas do arquivo e seu rodapé as duas ultimas.

Ele é dividido por segmentos *P*, *Q* e *R*, cada linha começa com um codigo que tem no final o tipo de segmento:

```
0010001300002Q 012005437734000407NTT BRASIL COMERCIO E SERVICOS DE TECNOLAVENIDA DOUTOR CHUCRI ZAIDAN, 1240 ANDARVILA SAO FRANCI04711130SAO PAULO      SP0000000000000000                                        000
```
Neste exemplo o **Q** aparece na posição/coluna 14, cada posição representa algo dentro do arquivo cnab.


hoje ao rodar:

```bash
node cnabRows.js
```

temos o seguinte output:

```bash
node cnabRows.js --help
Uso: cnabRows.js [options]

Opções:
      --help      Exibe ajuda                                         [booleano]
      --version   Exibe a versão                                      [booleano]
  -f, --from      posição inicial de pesquisa da linha do Cnab
                                                          [número] [obrigatório]
  -t, --to        posição final de pesquisa da linha do Cnab
                                                          [número] [obrigatório]
  -s, --segmento  tipo de segmento                        [string] [obrigatório]

Exemplos:
  cnabRows.js -f 21 -t 34 -s p  lista a linha e campo que from e to do cnab
```

hoje a ferramenta busca uma posição e loga isso no terminal.

desafio consiste:

* poder passar na CLI o local do arquivo.
* pesquisar por nome da empresa, e mostrar em que posição que ela foi achada e qual o tipo de segmento ela pertence.

* **Bonus**, ler o cnab e escrever um novo arquivo em formato JSON, contendo nome e endereço da empresa.

O candidato tem total liberdade de mudar a estrutura atual desse projeto, a ideía é ver a criatividade de resolver esse problema.
