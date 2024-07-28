describe('Property Management', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
    cy.contains('Add Property').click();
    cy.get('input[name="propertyName"]').type('Test Property');
    cy.get('textarea[name="propertyDescription"]').type('Test Property Description');
    cy.get('input[type="file"]').attachFile('property1.jpg');
    cy.get('button').contains('Submit').click();
  });

  it('should create a new property', () => {
    // Verify that the new property is displayed in the property list
    cy.contains('Test Property').should('be.visible');
    cy.contains('Test Property Description').should('be.visible');
  });

  it('should edit an existing property', () => {
    // Edit the created property
    cy.contains('Test Property').parent().find('.propertyEdit').click();
    cy.get('input[name="propertyName"]').clear().type('Updated Property');
    cy.get('textarea[name="propertyDescription"]').clear().type('Updated Property Description');
    cy.get('button').contains('Submit').click();

    // Verify that the property is updated
    cy.contains('Updated Property').should('be.visible');
    cy.contains('Updated Property Description').should('be.visible');
  });

  it('should delete an existing property', () => {
    // Delete the created property
    cy.contains('Test Property').parent().find('.propertyDelete').click();

    // Verify that the property is deleted
    cy.contains('Test Property').should('not.exist');
  });
});
