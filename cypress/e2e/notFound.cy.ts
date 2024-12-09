describe('Not Found Page', () => {
  beforeEach(() => {
    cy.visit('/non-existent-route', { failOnStatusCode: false });
  });

  it('should render the logo correctly', () => {
    cy.get('header.navbar .logo img')
      .should('be.visible')
      .and('have.attr', 'src', 'assets/images/logos/logo_lonche.png');
  });

  it('should not display the "Sign In" and "Sign Up" buttons', () => {
    cy.get('header.navbar .navbar-elements').should('not.exist');
  });

  it('should display the "NOT FOUND" message', () => {
    cy.contains('NOT FOUND').should('be.visible');
  });
});
