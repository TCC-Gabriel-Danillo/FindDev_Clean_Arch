# FindDev MVC

[![codecov](https://codecov.io/github/TCC-Gabriel-Danillo/FindDev_Clean_Arch/branch/main/graph/badge.svg?token=4655GHLADL)](https://codecov.io/github/TCC-Gabriel-Danillo/FindDev_Clean_Arch)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=bugs)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=TCC-Gabriel-Danillo_FindDev_Clean_Arch&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=TCC-Gabriel-Danillo_FindDev_Clean_Arch)

### Encontre incríveis desenvolvedores próximos a você.

Esse é um aplicativo destinado para comunidade de desenvolvedores encontrar outros desenvolvedores próximos.

<div style="display: flex; flex-direction: row; margin: 0 0 50px 0">
  <img src="assets/screen1.png" height="350px" width="200px" style="margin: 0 5px"/> 
  <img src="assets/screen2.png" height="350px" width="200px" style="margin: 0 5px"/> 
  <img src="assets/screen3.png" height="350px" width="200px" style="margin: 0 5px"/> 
</div>

### Requisitos

- Instalar o expo local e em seu smatphone [Expo](https://expo.dev/)
- Configurar um projeto no [firebase](https://firebase.google.com/)
- Configurar um app no [github apps](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app)

### Configucação

Adicione na pasta src o arquivo .env com as seguintes informações

```
# GITHUB
GIT_CLIENT_SECRET=
GIT_CLIENT_ID=
GIT_AUTHORIZATION_ENDPOINT=
GIT_TOKEN_ENDPOINT=
GIT_REVOCATION_ENDPOINT=

# FIREBASE
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

# GENEREAL
APP_SCHEME=
```

### Executar

Para executar o projeto, basta entrar na pasta raiz do projeto e executar o seguinte comando:

```
  expo start
```
