FROM ruby:2.7.1

# Define o ambiente de produção
ENV RAILS_ENV development

# Substitui shell por bash para que possamos obter os arquivos de origem
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Cria diretório de trabalho
RUN mkdir -p /app

# Define pasta da aplicação como pasta de trabalho
WORKDIR /app

# Pacote necessário para gem do Mysql
RUN apt-get install -y default-libmysqlclient-dev

# Copia arquivos de depdências para o container
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

# Instala o bundler
RUN gem install bundler

# Instala as depedências
RUN bundle install --verbose --jobs 20 --retry 5 --quiet
