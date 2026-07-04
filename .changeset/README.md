# Changesets

Cada pacote deste monorepo (`apps/*`, `packages/*`) versiona de forma independente com [Changesets](https://github.com/changesets/changesets).

Fluxo:

1. Depois de uma mudança relevante em algum pacote, rode `npm run changeset` na raiz e responda ao prompt (quais pacotes mudaram, `patch`/`minor`/`major`, e uma descrição).
2. Isso cria um arquivo `.md` aqui em `.changeset/` descrevendo a mudança — commite esse arquivo junto com o código.
3. No merge para `main`, o workflow `.github/workflows/release.yml` abre (ou atualiza) automaticamente um PR "Version Packages" com as versões e o `CHANGELOG.md` de cada pacote atualizados.
