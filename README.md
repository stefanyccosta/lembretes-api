## Sobre a aplicação

Esta é uma aplicação simples que permite o gerenciamento de lembretes através de uma página web. 

## Ferramentas Utilizadas

Este projeto foi desenvolvido utilizado as seguintes tecnologias:
 
- [SprintBoot versão 3.0.7](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [H2 Database](https://www.h2database.com/html/main.html)
- [Lombok](https://projectlombok.org/)
- Java 17
- HTML
- CSS
- Javascript

## Executando o Projeto

Seguindo os passos a seguir, você obterá uma cópia deste projeto em sua máquina e poderá executá-la em ambiente local.
### Requisitos de ambiente

Para executar este projeto, você deve:

- Ter instalado em sua máquina o Java Development Kit (JDK) na versão 17 ou superior. Durante o desenvolvimento, foi utilizado o JDK 17 distribuído pela Amazon Corretto 17.0.0, que pode ser baixado através do endereço https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html. Na mesma página podem ser encontradas as instruções detalhadas de instalação para os principais sistemas operacionais do mercado.
- Ter instalado em sua máquina o Git. As instruções de instalação podem ser encontradas na página https://git-scm.com/downloads. 
- Um navegador web, de preferência Google Chrome, Microsoft Edge ou Firefox.

### Executando a Aplicação

Para os próximos passos, é necessário que você utilize um terminal compatível com comandos Unix. Caso esteja utilizando o sistema operacional Windows, 
recomenda-se a utilização do git-bash (ferramenta instalada em conjunto com o git).


1. Usando o terminal, clone o repositório para a sua máquina local: `$ git clone https://github.com/stefanyccosta/lembretes-api.git`

2. Acesse o diretório raiz do projeto: `$ cd lembretes-api`

3. Inicie a aplicação rodando o comando de acordo com o seu sistema operacional: 
   - `$ ./gradlew bootRun` (Linux ou Mac)  ou
   - `$ ./gradlew.bat bootRun` (Windows)

4. Após alguns segundos você já poderá acessar a página da aplicação no endereço: http://localhost:8080/index.html.

## Próximos Passos

- Implementar testes unitários no projeto usando [JUnit](https://junit.org/junit5/);
- Deployar a aplicação em algum servidor em nuvem.
