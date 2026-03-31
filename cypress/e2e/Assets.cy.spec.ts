describe('asset page', () => {
  beforeEach(() => {
    cy.visit('/assets');
    cy.intercept('GET', '/v2/assets*', { fixture: 'assets-list' });
    cy.intercept('GET', '/v2/assets/options*', { fixture: 'list-options' });
    cy.intercept('GET', '/v2/assets/:id', { fixture: 'detail-asset' });
  });

  it('should have correct breadcrumb', () => {});
});
