## *Cypress E2E Test (Dashboard e Digital Signage)*

### Strumenti e versioni

* [Cypress](https://www.cypress.io/) v13.7.2
* [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) v3.8.2
* Node v20.11.1
* npm v10.2.4

### Contenuto della directory
* `cypress.config.js`: file di configurazione di Cypress.

Directory `cypress/`:

* `e2e/`: contiene le *suites* dei test Cypress. Una suite è un insieme di test raggruppati in un file js.
  * `auth.cy.js`: test di autenticazione.
  * `dashboard.cy.js`: test della Dashboard.
  * `digital-signage.cy.js`: test del Digital Signage (file upload).
* `support/`:
  * `command.js`: al suo interno sono stati definiti due comandi custom per effettuare il login con il mantenimento della sessione.
* `download/`: contiene i file scaricati durante eventuali test di download.
* `fixtures`: contiene alcuni file di esempio utilizzati nei test di upload.
* `reports/html/`: contiene il report HTML dei test, generato con la libreria *cypress-mochawesome-reporter*.
* `screenshots`: contiene gli screenshots generali durante i test, in caso di fallimenti.
* `video/`: contiene i video dei test, se l'opzione è abilitata nel file di configurazione di Cypress.

### Esecuzione dei test
Utilizzare il comando:
```console
$ npx cypress run
```
O in alternativa l'App Cypress.
___
## Procedura di base: installazioni e configurazioni

### Requisiti
* [NodeJs](https://nodejs.org/en/download)
* comando *npm init* eseguito all'interno di una directory dedicata ai test

### Installazione di Cypress
[Guida completa](https://docs.cypress.io/guides/getting-started/installing-cypress)

Eseguire il comando:
```console
$ npm install cypress --save-dev
```

Una volta installato, aprire l'App:
```console
$ npx cypress open
```
e configurare l'ambiente come mostrato [qui](https://docs.cypress.io/guides/getting-started/opening-the-app), selezionando la tipologia "E2E Testing" e un browser su cui si vuole eseguire i test.

Successivamente si possono creare le suites per i test come mostrato [qui](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test).

In alternativa, dopo aver configurato l'ambiante attraverso l'App, possiamo creare manualmente le suites all'interno della directory `cypress/e2e`, creando file con estensione `.cy.js`.

### Configurazione di Cypress
Attraverso il file `cypress.config.js` è possibile configurare Cypress. Le opzioni di configurazione sono disponibili [qui](https://docs.cypress.io/guides/references/configuration).

## Installazione di cypress-mochawesome-reporter

Eseguire il comando:

```console
$ npm install cypress-mochawesome-reporter --save-dev
```

Configurare Cypress per elaborare i risultati del test aggiungendo la seguente voce al file di configurazione (cypress.config.js):
```
reporter: 'cypress-mochawesome-reporter'
```

Altre configurazioni, come il path dove salvare il report, sono disponibili [qui](https://www.npmjs.com/package/cypress-mochawesome-reporter).
___
## Esecuzione dei test

> Le suites dei test dovranno avere l'estensione `.cy.js`.

Per eseguire i test possiamo utilizzare l'App.

In alternativa, possiamo eseguire i test anche in modalità headless, ovvero senza alcuna interfaccia grafica, e visualizzare i risultati direttamente sul terminale, con il comando:
```console
$ npx cypress run
```
oppure, per eseguire una suites in particolare:
```console
$ npx cypress run --record --spec "cypress/e2e/home.cy.js"
```