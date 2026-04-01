describe('asset page', () => {
  beforeEach(() => {
    cy.visit('/assets');
    cy.intercept('GET', '/v2/assets*', { fixture: 'assets-list' });
    cy.intercept('GET', '/v2/assets/options*', { fixture: 'list-options' });
    cy.intercept('GET', '/v2/assets/*', { fixture: 'detail-asset' });
    /*
     * TODO: Intercepts other than GET shouldn't have fixtures. Instead, put this:
     * { statusCode: 200 }
     * The 200 status code means a successful request. You can also put 400 for a failed request.
     * To read more about status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
     */
    cy.intercept('POST', '/v2/assets*', { fixture: 'assets-list' });
    cy.intercept('PUT', '/v2/assets/*', { fixture: 'assets-list' });
  });

  it('should have correct breadcrumb', () => {});
});
