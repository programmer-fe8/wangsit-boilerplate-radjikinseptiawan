describe('asset page', () => {
  beforeEach(() => {
    cy.visit('/assets');
    cy.intercept('GET', '/v2/assets/*', { fixture: 'detail-asset' });
    cy.intercept('GET', '/v2/assets/options*', { fixture: 'list-options' });
    cy.intercept('GET', '/v2/assets*', { fixture: 'assets-list' });
    cy.intercept('POST', '/v2/assets*', { statusCode: 201 });
    cy.intercept('PUT', '/v2/assets/*', { statusCode: 201 });
  });

  it('should have correct breadcrumb', () => {});
});
