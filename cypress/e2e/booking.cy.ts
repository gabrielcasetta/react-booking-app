describe('Booking Management', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should display the booking management page when Manage Bookings is clicked', () => {
    // Click on the "Add Booking" button
    cy.contains('Manage Bookings').click();

    // Verify that the booking form is displayed
    cy.contains('Add Booking').should('be.visible');
  });

  it('should create a new booking', () => {
    // Fill out the booking form
    cy.contains('Manage Bookings').click();
    cy.get('input[placeholder="John Doe"]').type('John Doe');
    cy.get('button').contains('Submit').click();

    // Verify that the new booking is displayed in the booking list
    cy.contains('John Doe').should('be.visible');
  });

  it('should edit an existing booking', () => {
    // Create a booking first
    cy.contains('Manage Bookings').click();
    cy.get('input[placeholder="John Doe"]').type('John Doe');
    cy.get('button').contains('Submit').click();

    // Edit the created booking
    cy.contains('John Doe').parent().contains('Edit').click();
    cy.get('div[role="dialog"]').find('input[placeholder="John Doe"]').clear().type('Jane Doe');
    cy.get('div[role="dialog"]').find('button').contains('Submit').click();

    // Verify that the booking is updated
    cy.contains('Jane Doe').should('be.visible');
  });

  it('should delete an existing booking', () => {
    // Create a booking first
    cy.contains('Manage Bookings').click();
    cy.get('input[placeholder="John Doe"]').type('John Doe');
    cy.get('button').contains('Submit').click();

    // Delete the created booking
    cy.contains('John Doe').parent().contains('Delete').click();

    // Verify that the booking is deleted
    cy.contains('John Doe').should('not.exist');
  });
});
