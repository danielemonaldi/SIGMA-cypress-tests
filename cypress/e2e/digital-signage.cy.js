import 'cypress-file-upload';

const digitalSignageURL = "...";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false
});

describe("SIGMA Digital Signage tests", () => {

  describe("Multimedia upload tests", () => {

    beforeEach(() => {
      cy.casLogin("...", "...");
      cy.visit(digitalSignageURL);
      cy.get("#Header > div > div:nth-child(1) > div > span:nth-child(1)").click();
    });

    it("IMAGE upload", () => {
      cy.wait(500);
      cy.get("#MainView > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div > div:nth-child(1) > div").click();
      cy.get("#gwt-uid-9").type("image");
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > input.gwt-FileUpload").click();

      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > input.gwt-FileUpload")
        .selectFile("cypress\\fixtures\\Screenshot.png", {timeout: 10000});

      cy.wait(500);
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > div").click();
      cy.wait(500);
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(11) > div > div.v-slot.v-slot-primary.v-slot-default > div").click();
      cy.get("#CrudBodyLayout > div > div:nth-child(3) > div > div.v-scrollable.v-table-body-wrapper.v-table-body > div:nth-child(1) > table > tbody > tr")
        .last()
        .click();

      cy.get("#MultimediaPreviewPanel > div.v-panel-content.v-scrollable > img").should("exist");
    });
      
    it("VIDEO upload", () => {
      cy.get("#MainView > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div > div:nth-child(1) > div").click();
      cy.get("#gwt-uid-9").type("video");
      cy.get("#gwt-uid-13 > span:nth-child(2)").click();
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > input.gwt-FileUpload").click();

      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > input.gwt-FileUpload")
        .selectFile("cypress\\fixtures\\video.mp4", {timeout: 10000});

      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > div").click();
      cy.wait(1000);
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(11) > div > div.v-slot.v-slot-primary.v-slot-default > div").click();
      cy.get("#CrudBodyLayout > div > div:nth-child(3) > div > div.v-scrollable.v-table-body-wrapper.v-table-body > div:nth-child(1) > table > tbody > tr")
        .last()
        .click();

      cy.get("#MultimediaPreviewPanel > div.v-panel-content.v-scrollable > video").should("exist");
    });

    it("IMAGE but VIDEO upload", () => {
      cy.get("#MainView > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div > div:nth-child(1) > div").click();
      cy.get("#gwt-uid-9").type("image but video");
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > input.gwt-FileUpload").click();

      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > input.gwt-FileUpload")
        .selectFile("cypress\\fixtures\\video.mp4", {timeout: 10000});

      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(9) > div > div.v-tabsheet-content > div > div > div > div > div:nth-child(2) > div > div.v-accordion-item.v-accordion-item-first.v-accordion-item-open > div.v-accordion-item-content.v-scrollable > div > div > form > div > div").click();
      cy.wait(1000);
      cy.get("#ssmsdsignageadmin-1366549131-overlays > div.v-window.v-widget.v-has-width > div > div > div.v-window-contents > div > div > div > div:nth-child(1) > div > div:nth-child(11) > div > div.v-slot.v-slot-primary.v-slot-default > div").click();
      cy.get("#CrudBodyLayout > div > div:nth-child(3) > div > div.v-scrollable.v-table-body-wrapper.v-table-body > div:nth-child(1) > table > tbody > tr")
        .last()
        .click();
    });

    afterEach(() => {

      const selector = "#CrudBodyLayout > div > div:nth-child(3) > div > div.v-scrollable.v-table-body-wrapper.v-table-body";

      cy.get(selector).then(($element) => {
        if ($element.children().length > 0) {
          cy.get("#CrudBodyLayout > div > div:nth-child(3) > div > div.v-scrollable.v-table-body-wrapper.v-table-body > div:nth-child(1) > table > tbody > tr")
          .last();
          cy.get("#MainView > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div > div:nth-child(5) > div").click();
          cy.get("#confirmdialog-ok-button").click(); 
        }
      });
    });
  });

  after(() => {
    Cypress.session.clearAllSavedSessions();
  });
});