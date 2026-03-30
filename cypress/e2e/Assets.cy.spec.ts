describe('Asset Page', () => {
  beforeEach(() => {
    cy.visit('/asset');
    cy.intercept('GET', '/v2/asset*', { fixture: 'assets-list' });
    // Cy.intercept('GET', '/user/options*', { fixture: 'user-options' });
  });

  it('should have correct breadcrumb', () => {
    
  });
});
