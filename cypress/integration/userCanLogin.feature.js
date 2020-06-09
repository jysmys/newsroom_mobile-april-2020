describe("User can login", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/articles",
      response: "fixture:article_list.json",
    });
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.wait(1000);
  });

  describe("successfully", () => {
    beforeEach(() => {
      //   cy.route({
      //     method: "POST",
      //     url: "**/auth/*",
      //     response: "fixture:successful_login.json",
      //     headers: {
      //       uid: "user@mail.com",
      //     },
      //   });
      //   cy.route({
      //     method: "GET",
      //     url: "**/auth/*",
      //     response: "fixture:successful_login.json",
      //     headers: {
      //       uid: "user@mail.com",
      //     },
      //   });
      //   cy.route({
      //     method: "DELETE",
      //     url: "**/auth/*",
      //     response: "fixture:logout.json",
      //     headers: {
      //       uid: "user@mail.com",
      //     },
      //   });

      cy.get("[data-testid=Loginbutton]").click();
      cy.get("[data-testid=login-form]").within(() => {
        cy.get("[data-testid=email]").type("subscriber@mail.com");
        cy.get("[data-testid=password]").type("password");
        cy.get("[data-testid=submit]").contains("Submit").click();
      });
    });

    it("logout button is shown", () => {
      cy.get("[data-testid=Logoutbutton]").should("be.visible");
      cy.get("[data-testid=article-1]").should("exist");
    });

    xit("clicking the Log out button", () => {
      cy.get("[data-testid=Logoutbutton]").click();
      cy.get("[data-testid=Logoutbutton]").should("not.exist");
      cy.get("[data-testid=Loginbutton]").should("exist");
      cy.get("[data-testid=article-1]").should("exist");
    });
  });

  xdescribe("check window functionality", () => {
    it("check that the login pop up is working", () => {
      cy.get("[data-testid=Loginbutton]").click();
      cy.get("[data-testid=loginText]").should("exist").click();
      cy.get("[data-testid=loginText]").should("not.exist");
    });
  });

  xdescribe("unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/auth/*",
        response: "fixture:unsuccessful_login.json",
        headers: {
          uid: "user@mail.com",
        },
        status: 400,
      });
      cy.get("[data-testid=Loginbutton]").click();
      cy.get("[data-testid=login-form]").within(() => {
        cy.get("[data-testid=email]").type("user@mail.com");
        cy.get("[data-testid=password]").type("wrongpassword");
        cy.get("[data-testid=submit]").contains("Submit").click();
      });
    });
    it("with invalid credentials", () => {
      cy.get("[data-testid=error-message]").should(
        "contain",
        "Invalid login credentials. Please try again."
      );
    });
  });
});
