# Portfólio - Luiz Gustavo

Portfólio profissional criado para apresentar minhas habilidades, tecnologias, projetos e currículo.

## Sobre o projeto

Este projeto foi desenvolvido com HTML, CSS, JavaScript, Markdown, Docker e Nginx.

A página principal apresenta minhas informações profissionais, tecnologias que utilizo, projetos desenvolvidos e formas de contato.

O projeto também contém um currículo em Markdown e pode ser executado com Docker.

## Objetivo

Criar uma apresentação profissional para divulgar meus conhecimentos como Desenvolvedor Full Stack Júnior.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Markdown
- Docker
- Nginx

## Projeto em destaque

### LG Trambicagens

Sistema web de loja online desenvolvido com React, Next.js, TypeScript, Node.js, SQLite e Sequelize.

Funcionalidades principais:

- Cadastro de usuários
- Login com autenticação
- Validação de dados no backend
- Cadastro de produtos
- Upload de imagens
- Carrinho de compras
- Sistema de pedidos
- Perfil do usuário
- Favoritos
- Cupons
- Notificações
- Painel administrativo
- Tema claro e escuro

## O que este portfólio demonstra

- Organização de arquivos em um projeto web
- Criação de interface responsiva
- Uso de JavaScript para animações e carrossel
- Apresentação de projeto real
- Uso de Docker para executar o site
- Criação de currículo em Markdown

## Estrutura do projeto

```txt
curriculo-luiz/
├── index.html
├── curriculo.md
├── README.md
├── Dockerfile
├── .dockerignore
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/
    ├── lg-trambicagens-1.png
    ├── lg-trambicagens-2.png
    ├── lg-trambicagens-3.png
    ├── lg-trambicagens-4.png
    ├── lg-trambicagens-5.png
    ├── lg-trambicagens-6.png
    ├── lg-trambicagens-7.png
    ├── lg-trambicagens-8.png
    ├── lg-trambicagens-9.png
    └── lg-trambicagens-10.png
```

## Como rodar sem Docker

Abra o arquivo `index.html` diretamente no navegador.

## Como rodar com Docker

Entre na pasta do projeto:

```bash
cd "C:\Users\Luiz Gustavo\Desktop\curriculo-luiz"
```

Crie a imagem Docker:

```bash
docker build -t portfolio-luiz .
```

Rode o container:

```bash
docker run -d -p 8080:80 --name portfolio-luiz portfolio-luiz
```

Acesse no navegador:

```txt
http://localhost:8080
```

## Como parar o container

```bash
docker stop portfolio-luiz
```

## Como remover o container

```bash
docker rm portfolio-luiz
```

## Recriar o container depois de alterações

```bash
docker stop portfolio-luiz
docker rm portfolio-luiz
docker build -t portfolio-luiz .
docker run -d -p 8080:80 --name portfolio-luiz portfolio-luiz
```

## Autor

Luiz Gustavo  
Desenvolvedor Full Stack Júnior

GitHub: https://github.com/luizgus1213  
LinkedIn: https://www.linkedin.com/in/luiz-gustavo-66a3b93a0  
Email: luizgus397@gmail.com
