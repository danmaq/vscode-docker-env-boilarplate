# Vim および最新の Git をインストールします。
# (Docker 10 標準の Git は、バージョン 2.20)
# TODO: git-completion を手動で強引にインストールしていますが、
# make で一緒にインストールできないか、要調査。
ARG VARIANT=0-14-buster
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}
ARG GIT_VERSION=2.30.1
RUN bash -xc " \
  apt update && export DEBIAN_FRONTEND=noninteractive \
  && apt autoremove -y && apt upgrade -y \
  && apt -y install --no-install-recommends asciidoc dh-autoreconf docbook2x gettext install-info libcurl4-gnutls-dev libexpat1-dev libssl-dev libz-dev vim xmlto \
  && mkdir -p /usr/src/git && pushd /usr/src/git \
  && curl -L -o - https://github.com/git/git/archive/v${GIT_VERSION}.tar.gz | tar zx -C /usr/src/git --strip-components=1 \
  && make configure && ./configure --prefix=/usr && make all doc info \
  && make install install-doc install-html install-info && make clean \
  && cp contrib/completion/git-completion.bash ~/.git-completion.bash \
  && chmod a+x ~/.git-completion.bash \
  && echo 'source ~/.git-completion.bash' >> ~/.bashrc && popd \
  && apt clean -y && rm -rf /var/lib/apt/lists/* /usr/src/git \
  "
