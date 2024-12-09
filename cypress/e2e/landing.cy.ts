describe('Landing Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should render the landing header component', () => {
      cy.get('app-landing-header').should('be.visible');
    });
  
    it('should display the main heading and paragraph correctly', () => {
      cy.get('.landing-data h1')
        .should('be.visible')
        .and('contain.text', 'La red social que te lleva a otras ciudades');
  
      cy.get('.landing-data p')
        .should('be.visible')
        .and('contain.text', 'Conoce nuevos lugares de una nueva forma, hablemos de temas más cotidianos.');
    });
  
    it('should navigate to the login page when the "Comenzar" button is clicked', () => {
      cy.get('.landing-data a[routerLink="login"] button').click();
      cy.url().should('include', '/login');
    });
  
    it('should render the main landing image correctly', () => {
      cy.get('.img-container img')
        .should('be.visible')
        .and('have.attr', 'src', 'assets/images/landing-page/landing-main.png');
    });
  });
  