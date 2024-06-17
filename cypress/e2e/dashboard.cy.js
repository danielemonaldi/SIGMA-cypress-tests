import 'cypress-file-upload';

/*
  VAR
*/
let nMachines = 11;
let onlineMachines = 0;
let offlineMachines = 0;

const dashboardURL = "...";

// Prevent Cypress from failing tests on uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  return false
});

describe("SIGMA Dashboard tests", () => {

  beforeEach(() => {
    // Open the dashboard URL and login
    cy.login("...", "...");
    cy.visit(dashboardURL);
    cy.get("#warning-back-button > div > div > button").click();
    cy.get("#warning-message-cookie > div > div > button").click();
  });

  describe("Languages tests", () => {

    it("English", () => {
      cy.get("#headerLogin\\:j_idt32 > div.localization-container > div.localization-label > span").should("have.text", "Language: ");
    });
    
    it("Deutsch", () => {
      cy.get("#headerLogin\\:selectedLanguageImage").click();
      cy.get("#headerLogin\\:j_idt35\\:0\\:j_idt37").click();
      cy.get("#headerLogin\\:j_idt32 > div.localization-container > div.localization-label > span").should("have.text", "Sprache: ");
    });

    it("Italiano", () => {
      cy.get("#headerLogin\\:selectedLanguageImage").click();
      cy.get("#headerLogin\\:j_idt35\\:1\\:j_idt37").click();
      cy.get("#headerLogin\\:j_idt32 > div.localization-container > div.localization-label > span").should("have.text", "Lingua: ");
    });

    it("Français", () => {
      cy.get("#headerLogin\\:selectedLanguageImage").click();
      cy.get("#headerLogin\\:j_idt35\\:2\\:j_idt37").click();
      cy.get("#headerLogin\\:j_idt32 > div.localization-container > div.localization-label > span").should("have.text", "Langue: ");
    });
  });

  describe("Machines tests", () => {

    it("Add new machine", () => {
      cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(6)").click();
      cy.get("#machine\\:j_idt131").type("MACHINE-NAME");
      cy.get("#machine\\:model").type("machine-model");
      cy.get("#machine\\:serial").type("machine-serial");
      cy.get("#machine\\:customer").type("machine-customer");
      cy.get("#machine\\:saveButton").click();
      cy.get("#machine\\:j_idt143").click();

      cy.get("#displayTvm\\:allTvmDataTable_data > tr")
        .contains("td:nth-child(1)", "MACHINE-NAME")
        .should("exist");
    });

    describe("Machines table tests", () => {

      beforeEach(() => {
        // Click "Bashboard" from left menu
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(2) > a").click();
      });

      it("Machines number", () => {
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 23);
      });

      it("Machines list settings", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt156").click();
        cy.get("#displayTvm\\:machineSettingsDT_head_checkbox").click();
        cy.get("#displayTvm\\:j_idt253").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt174").should("exist");
      });

      it("Machines list name filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt160\\:filter").type("TEST");
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 10);
      });

      it("Machines list teller code filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt156").click();
        cy.get("#displayTvm\\:machineSettingsDT_head_checkbox").click();
        cy.get("#displayTvm\\:j_idt253").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt174\\:filter").type("539426847");
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 2);
      });

      it("Machines list IP address filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt176\\:filter").type("10.128.254.238");
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 1);
      });

      it("Machines list type filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt182").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt182_1").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 3);
      });

      it("Machines list city filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt192\\:filter").type("Monterubbiano");
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 4);
      });

      it("Machines list location filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt194\\:filter").type("Rubbianello");
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 3);
      });

      it("Machines list no-obsolete filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineStates").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineStates_0").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 23);
      });

      it("Machines list obsolete filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineStates").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineStates_1").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 1);
      });

      it("Machines list online filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineState").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineState_1").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 2);
      });

      it("Machines list offline filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineState").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:chooseMachineState_2").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 21);
      });

      it("Machines list error state devices filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt215").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt215_1").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 4);
      });

      it("Machines list warning state devices filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt215").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt215_2").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 8);
      });

      it("Machines list success state devices filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt215").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt215_3").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 15);
      });

      it("Machines list error state application filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt230").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt230_1").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 2);
      });

      it("Machines list warning state application filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt230").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt230_2").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 3);
      });

      it("Machines list success state application filter", () => {
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt230").click();
        cy.get("#displayTvm\\:allTvmDataTable\\:j_idt230_3").click();
        cy.get("#displayTvm\\:allTvmDataTable_data > tr").should("have.length", 20);
      });

      it("Open the correct machine view", () => {

        let machineName;

        cy.get("#displayTvm\\:allTvmDataTable_data > tr:nth-child(1) > td:nth-child(1) > span")
          .then(($span) => {
            machineName = $span.text();
            cy.get("#displayTvm\\:allTvmDataTable\\:0\\:j_idt244").click();
            cy.get("#divTitleBody > h2 > small").should("have.text", machineName);
            cy.get("#treePanel\\:editMachineDetailsForm\\:j_idt147 > tbody > tr:nth-child(1) > td.ui-panelgrid-cell.ui-grid-col-4 > span").should("have.text", machineName);
          });
      });
    });
  });

  describe("Machine view tests", () => {

    describe("Machine details tab tests", () => {

      beforeEach(() => {
        // Click "Bashboard" from left menu
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(2) > a").click();

        // Open machine view of "ANTARES"
        cy.get("#displayTvm\\:allTvmDataTable_data > tr")
          .contains("td:nth-child(1)", "ANTARES")
          .parent("tr")
          .find("button")
          .click();
      });

      it("Edit details", () => {
        cy.get("#treePanel\\:editMachineDetailsForm\\:editButton").click();

        cy.get("#treePanel\\:editMachineDetailsForm\\:j_idt152")
          .clear()
          .type("new-type")

        cy.get("#treePanel\\:editMachineDetailsForm\\:j_idt155")
          .clear()
          .type("new-customer")

        cy.get("#treePanel\\:editMachineDetailsForm\\:saveButtons").click();
        cy.get("#treePanel\\:confirmSettinsUpdateForm\\:j_idt219").click();

        cy.get("#treePanel\\:editMachineDetailsForm\\:j_idt147 > tbody > tr:nth-child(2) > td.ui-panelgrid-cell.ui-grid-col-4 > span").should("have.text", "new-type");
        cy.get("#treePanel\\:editMachineDetailsForm\\:j_idt147 > tbody > tr:nth-child(3) > td.ui-panelgrid-cell.ui-grid-col-4 > span").should("have.text", "new-customer");
      });
    });

    describe("Machine settings tab tests", () => {

      beforeEach(() => {
        // Click "Bashboard" from left menu
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(2) > a").click();

        // Open machine view of "ANTARES"
        cy.get("#displayTvm\\:allTvmDataTable_data > tr")
          .contains("td:nth-child(1)", "ANTARES")
          .parent("tr")
          .find("button")
          .click();

        cy.get(".ui-tabs-nav > li:nth-child(2) > a").click();
      });

      it("Edit settings", () => {
        cy.get("#treePanel\\:editMachineConfigForm\\:j_idt224").click();

        cy.get("#treePanel\\:editMachineConfigForm\\:j_idt235").click();
        cy.get("#treePanel\\:editMachineConfigForm\\:j_idt237").click();

        cy.get("#treePanel\\:editMachineConfigForm\\:j_idt225").click();

        cy.get("#treePanel\\:editMachineConfigForm\\:j_idt235")
          .should("have.class", "ui-inputswitch-checked");

        cy.get("#treePanel\\:editMachineConfigForm\\:j_idt237")
          .should("have.class", "ui-inputswitch-checked");
      });
    });

    describe("Remote tools tests", () => {

      beforeEach(() => {
        // Click "Bashboard" from left menu
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(2) > a").click();

        // Open machine view of "ANTARES"
        cy.get("#displayTvm\\:allTvmDataTable_data > tr")
          .contains("td:nth-child(1)", "ANTARES")
          .parent("tr")
          .find("button")
          .click();

        cy.get(".ui-tabs-nav > li:nth-child(5) > a").click();
      });
    });

    describe("Machine tree view tests", () => {

      beforeEach(() => {
        // Click "Bashboard" from left menu
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(2) > a").click();

        // Open machine view of "SITVM02"
        cy.get("#displayTvm\\:allTvmDataTable_data > tr")
          .contains("td:nth-child(1)", "SITVM02")
          .parent("tr")
          .find("button")
          .click();
      });
    
      it("All tree view", () => {
        cy.get("#treePanelForm\\:treeState\\:0 > ul").children().should("have.length", 33);

        const length = [8, 2, 2, 3, 1, 16, 0, 8, 2, 3, 0, 3, 2, 2, 9, 5, 3, 3, 4, 4, 1, 0, 16, 1, 1, 1, 1, 1, 1, 11, 1, 4, 10];
    
        length.forEach((l, i) => {
          const selector = `#treePanelForm\\:treeState\\:0_${i} > ul`;
          cy.get(selector).then(($element) => {
            if ($element.children().length > 0) {
              cy.wrap($element.children().length).should("eq", l);
            } else {
              cy.wrap(0).should("eq", l);
            }
          });
        });
      });
    
      it("Success element tree view", () => {
        cy.get("#treePanelForm\\:j_idt547").click();
        cy.get("#treePanelForm\\:j_idt548").click();
        cy.get("#treePanelForm\\:treeState\\:0 > ul").children().should("have.length", 28);

        const length = [8, 2, 2, 3, 1, 16, 0, 2, 3, 0, 3, 2, 2, 5, 3, 3, 4, 4, 1, 0, 1, 1, 1, 1, 11, 1, 4, 10];
    
        length.forEach((l, i) => {
          const selector = `#treePanelForm\\:treeState\\:0_${i} > ul`;
          cy.get(selector).then(($element) => {
            if ($element.children().length > 0) {
              cy.wrap($element.children().length).should("eq", l);
            } else {
              cy.wrap(0).should("eq", l);
            }
          });
        });
      });
    
      it("Warning element tree view", () => {
        cy.get("#treePanelForm\\:j_idt547").click();
        cy.get("#treePanelForm\\:j_idt546").click();
        cy.get("#treePanelForm\\:treeState\\:0 > ul").children().should("have.length", 4);
        
        const length = [8, 9, 1, 1];
    
        length.forEach((l, i) => {
          const selector = `#treePanelForm\\:treeState\\:0_${i} > ul`;
          cy.get(selector).then(($element) => {
            if ($element.children().length > 0) {
              cy.wrap($element.children().length).should("eq", l);
            } else {
              cy.wrap(0).should("eq", l);
            }
          });
        });
      });
    
      it("Error element tree view", () => {
        cy.get("#treePanelForm\\:j_idt546").click();
        cy.get("#treePanelForm\\:j_idt548").click();
        cy.get("#treePanelForm\\:treeState\\:0 > ul").children().should("have.length", 1);
        cy.get("#treePanelForm\\:treeState\\:0_0 > ul").children().should("have.length", 16);
      });
    });
  });

  describe("Resume panel tests", () => {

    describe("Statistic tab tests", () => {

      beforeEach(() => {
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(5) > a").click();
      });
      
      it("Online and offline machines number", () => {
      
        cy.get("#resumePanel > div:nth-child(3) > div > div:nth-child(2) > div > div.panel-heading > div > div.col-xs-9.text-right > div")
          .then(($div) => {
            const onlineText = $div.text();
            onlineMachines = parseInt(onlineText);
            expect(onlineMachines).to.be.at.least(0);
            expect(onlineMachines).to.be.at.most(nMachines);
          });
      
        cy.get("#resumePanel > div:nth-child(3) > div > div:nth-child(3) > div > div.panel-heading > div > div.col-xs-9.text-right > div")
          .then(($div) => {
            const offlineText = $div.text();
            offlineMachines = parseInt(offlineText);
            expect(offlineMachines).to.be.at.least(0);
            expect(offlineMachines).to.be.at.most(nMachines);
          });
      
        cy.wrap().then(() => {
          const totalMachines = onlineMachines + offlineMachines;
          expect(totalMachines).to.equal(nMachines);
        });
      });

      it("Device\\Application error\\warning number", () => {

        const tests = [
          { selector: "#resumePanel > div:nth-child(3) > div > div:nth-child(4) > div > div.panel-heading > div > div.col-xs-9.text-right > div"},
          { selector: "#resumePanel > div:nth-child(3) > div > div:nth-child(5) > div > div.panel-heading > div > div.col-xs-9.text-right > div"},
          { selector: "#resumePanel > div:nth-child(3) > div > div:nth-child(6) > div > div.panel-heading > div > div.col-xs-9.text-right > div"},
          { selector: "#resumePanel > div:nth-child(3) > div > div:nth-child(7) > div > div.panel-heading > div > div.col-xs-9.text-right > div"}
        ];

        tests.forEach((test) => {
          cy.get(test.selector)
            .invoke("text")
            .then((text) => {
              expect(parseInt(text.trim())).to.be.at.most(nMachines);
          });
        });
      });

      it("Group type filter", () => {
        cy.get("#resumePanelTable\\:resume-panel-item-table\\:j_idt172\\:filter").type("ATAC");
        cy.get("#resumePanelTable\\:resume-panel-item-table > div.ui-datatable-tablewrapper > table").should("have.length", 1);
      });

      it("Installed machines number", () =>{
        let totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(2) > span").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.equal(nMachines);
        });
      });

      it("Online machines number", () => {
        let totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(3) > div > div").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.equal(onlineMachines);
        });
      });

      it("Offline machines number", () => {
        let totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(4) > div > div").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.equal(offlineMachines);
        });
      });

      it("Device\\Application error\\warning number", () => {

        let totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(5) > div > div").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.be.at.most(nMachines);
        });

        totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(6) > div > div").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.be.at.most(nMachines);
        });

        totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(7) > div > div").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.be.at.most(nMachines);
        });

        totalSum = 0;

        cy.get("[id^='resumePanelTable']:visible td:nth-child(8) > div > div").each(($div) => {
          const value = parseFloat($div.text());
          totalSum += value;
        }).then(() => {
          expect(totalSum).to.be.at.most(nMachines);
        });
      });
    });

    describe("OSS Status tab tests", () => {

      beforeEach(() => {
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(5) > a").click();
        cy.get("#menuNavForm\\:j_idt116 > ul > li:nth-child(2)").click();
      });

      it("Table name filter", () => {
        cy.get("#resumePanel\\:j_idt236").click();
        cy.get("#input_resumePanel\\:researchByDeviceName").type("Ticket");
        cy.get("#resumePanel\\:j_idt562 > tbody > tr").should("have.length", 0);
      });

      it("Warning filter", () => {
        cy.get("#resumePanel\\:j_idt236").click();
        cy.get("#resumePanel\\:j_idt562 > tbody > tr").should("have.length", 0);
      });

      it("Error filter", () => {
        cy.get("#resumePanel\\:j_idt241").click();
        cy.get("#resumePanel\\:j_idt562 > tbody > tr").should("have.length", 0);
      });
    })

    describe("Device status tab tests", () => {

      beforeEach(() => {
        cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(5) > a").click();
        cy.get("#menuNavForm\\:j_idt116 > ul > li:nth-child(3)").click();
      });

      it("Table name filter", () => {
        cy.get("#resumePanel\\:j_idt319").click();
        cy.get("#input_resumePanel\\:researchByDeviceName").type("Mobile");
        cy.get("#resumePanel\\:j_idt490 > tbody > tr").should("have.length", 0);
      });

      it("Warning filter", () => {
        cy.get("#resumePanel\\:j_idt314").click();
        cy.get("#resumePanel\\:j_idt490 > tbody > tr").should("have.length", 0);
      });

      it("Error filter", () => {
        cy.get("#resumePanel\\:j_idt319").click();
        cy.get("#resumePanel\\:j_idt490 > tbody > tr").should("have.length", 0);
      });
    });
  });

  describe("Profiles panel tests", () => {

    beforeEach(() => {
      cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(9)").click();
    });

    it("Add new profile", () => {
      cy.get("#request-groups-form\\:all-request-groups\\:j_idt119").click();
      cy.get("#add-new-profile-form\\:name").type("test-profile");
      cy.get("#add-new-profile-form\\:description").type("test-profile");
      cy.get("#add-new-profile-form\\:j_idt139").click();
      
      cy.get("#request-groups-form\\:all-request-groups_data tr")
        .contains("test-profile")
        .should("exist");
    });

    describe("Profile settings tests", () => {

      beforeEach(() => {
        cy.get("#request-groups-form\\:all-request-groups_data tr")
          .contains("td:nth-child(2)", "test-profile")
          .parent("tr")
          .find("button")
          .click();
      });

      it("Export profile", () => {
        cy.get("#synth-device-group-view-form\\:j_idt124").click();
        cy.checkDownloadedFile("profile*");
      })

      it("Add new setting to profile", () => {
        cy.get("#treePanel\\:setting-form\\:all-setting-groups\\:j_idt128").click();
        cy.get("#add-new-setting-dialog-form\\:confKey").type("test-key");
        cy.get("#add-new-setting-dialog-form\\:confValue").type("test-value");
        cy.get("#add-new-setting-dialog-form\\:j_idt181").click();
    
        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr td:nth-child(1) span")
          .contains("test-key")
          .should("exist");
      });
    
      it("Add existing setting to profile", () => {
        cy.get("#treePanel\\:setting-form\\:all-setting-groups\\:j_idt137").click();
        cy.get("#profile-setting-form-dialog\\:all-setting-groups\\:0\\:j_idt200").click();
        cy.get("#profile-setting-form-dialog-suggested\\:existing-setting-value").type("test-value");
        cy.get("#profile-setting-form-dialog-suggested\\:btn-save-setting-existing").click();
        cy.get("#j_idt184 > div.ui-dialog-titlebar.ui-widget-header.ui-helper-clearfix.ui-corner-top.ui-draggable-handle > a").click();
    
        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr td:nth-child(1) span")
          .contains("atac.defaultlanguage")
          .should("exist");
      });

      it("Edit profile setting value", () => {
        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr")
          .contains("td:nth-child(1)", "test-key")
          .parent("tr")
          .find("button")
          .eq(0)
          .click();
        
        cy.get("#edit-setting-dialog-form\\:confValue")
          .clear()
          .type("new-value");
          
        cy.get("#edit-setting-dialog-form\\:j_idt172").click();

        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr")
          .contains("td:nth-child(1)", "test-key")
          .parent("tr")
          .find("td:nth-child(2)")
          .should("contain", "new-value");
      });
    
      it("Remove setting to profile", () => {
        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr")
          .contains("td:nth-child(1)", "test-key")
          .parent("tr")
          .find("button")
          .eq(1)
          .click();

        cy.get("#remove-setting-dialog-form\\:j_idt250").click();

        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr td:nth-child(1) span")
          .contains("test-key")
          .should("not.exist");
      });

      it("Import settings to profile", () => {
        cy.get("#treePanel\\:setting-form\\:all-setting-groups\\:j_idt134").click();

        cy.fixture("settings_profile.json", "base64", {timeout: 50000}).then((fileContent) => {
          cy.get("#uploadSettingsProfileDialog\\:j_idt241_input").attachFile({
            fileContent: fileContent,
            fileName: "settings_profile.json",
            encoding: "base64",
          });
        });  

        cy.get("#uploadSettingsProfileDialog\\:j_idt243").click();
        cy.reload();

        cy.get("#treePanel\\:setting-form\\:all-setting-groups_data tr td:nth-child(1) span")
          .contains("defaultlanguage")
          .should("exist");
      });
    });
  });

  describe("Customer panel tests", () => {

    beforeEach(() => {
      cy.get("#menuLeftForm\\:dashboard-menu > ul > li:nth-child(10)").click();
    });

    it("Add new customer", () => {
      cy.get("#request-groups-form\\:all-request-groups\\:j_idt119").click();
      cy.get("#add-customer-form\\:name").type("test-customer");
      cy.get("#add-customer-form\\:j_idt135").click();

      cy.get("#request-groups-form\\:all-request-groups_data tr")
        .contains("test-customer")
        .should("exist");
    });

    describe("Customer profiles tests", () => {

      beforeEach(() => {
        cy.get("#request-groups-form\\:all-request-groups_data tr")
          .contains("td:nth-child(2)", "test-customer")
          .parent("tr")
          .find("button")
          .click();
      });

      it("Add profiles to customer", () => {
        cy.get("#treePanel\\:profile-form\\:select-checkbox-menu-selected-profile > ul").click();

        cy.get("#treePanel\\:profile-form\\:select-checkbox-menu-selected-profile_panel")
          .contains("div.ui-selectcheckboxmenu-items-wrapper > ul > li label", "test-profile")
          .closest("li")
          .find("div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default")
          .click();
        
        cy.get("#treePanel\\:profile-form\\:j_idt129").click();
        cy.get("#display-items-form\\:btn-save-order-profile").click();

        cy.get("#treePanel\\:profile-form\\:all-profile-groups_data > tr")
          .contains("test-profile")
          .should("exist");
      });

      it("Customer profiles reorder", () => {

        cy.get("#treePanel\\:profile-form\\:select-checkbox-menu-selected-profile > ul").click();

        cy.get("#treePanel\\:profile-form\\:select-checkbox-menu-selected-profile_panel")
          .contains("div.ui-selectcheckboxmenu-items-wrapper > ul > li label", "MDP")
          .closest("li")
          .find("div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default")
          .click();

        cy.get("#treePanel\\:profile-form\\:j_idt129").click();

        cy.get("#display-items-form\\:displayItems-orderlist > div > div.ui-g-12.ui-md-10 > ul > li:nth-child(1)").click();

        cy.get("#display-items-form\\:displayItems-orderlist > div > div.ui-orderlist-controls.ui-g-12.ui-md-2 > button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-orderlist-button-move-bottom").click();
        
        cy.wait(1000);
        cy.get("#display-items-form\\:btn-save-order-profile").click();
        
        cy.get("#treePanel\\:profile-form\\:all-profile-groups_data")  
          .contains("td:nth-child(1)", "test-profile")
          .parent("tr")
          .find("td:nth-child(2)")
          .should("contain", "1");
        
        cy.get("#treePanel\\:profile-form\\:all-profile-groups_data")  
          .contains("td:nth-child(1)", "MDP")
          .parent("tr")
          .find("td:nth-child(2)")
          .should("contain", "0");
      });
    });
  });

  describe("Other tests", () => {

    it("404 test", () => {
      cy.request({url: "...", failOnStatusCode: false}).its("status").should("equal", 404);
      cy.visit("...", {failOnStatusCode: false});
    });
  });

  after(() => {
    Cypress.session.clearAllSavedSessions();
  });
});