describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.intercept('GET', '/v2/assets*', { fixture: 'assets-list' });
    cy.intercept('GET', '/v2/assets/options*', { fixture: 'list-options' });
    cy.intercept('GET', '/v2/assets/:id', { fixture: 'detail-asset' });
  });

  it('should have correct breadcrumb', () => {
    /*
     * Cy.getByName('breadcrumb').within(() => {
     *   cy.contains('Wangs');
     *   cy.contains('Home');
     * });
     */
  });

  it('navigate to another page and should have correct breadcrumb', () => {
    /*
     * Cy.get('wangs-tab-menu').within(() => {
     *   cy.contains('Another Page').click();
     * });
     */
    /*
     * Cy.getByName('breadcrumb').within(() => {
     *   cy.contains('Wangs');
     *   cy.contains('Another Page');
     * });
     */
  });
});
