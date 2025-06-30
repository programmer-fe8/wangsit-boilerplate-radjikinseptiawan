import { MultiSelectFilterField } from '@fewangsit/wangsvue/filtercontainer';
import { filterFields, quickFilterFields } from './filterFields';

describe('Filter Fields', () => {
  describe('Quick Filter fetchOptionsFns', () => {
    beforeEach(() => {
      cy.intercept('options*', {
        fixture: 'user-options.json',
      });
    });

    it('country options', async () => {
      const option = quickFilterFields.find(
        (field) => field.label === 'Country' && field.type === 'multiselect',
      ) as MultiSelectFilterField<Record<string, boolean>>;

      const options = await option.fetchOptionFn?.({ country: true });

      expect(options).to.have.length(19);
    });
  });

  describe('Filter Container fetchOptionsFns', () => {
    beforeEach(() => {
      cy.intercept('options*', {
        fixture: 'user-options.json',
      });
    });

    it('country options', async () => {
      const option = filterFields.find(
        (field) => field.label === 'Country' && field.type === 'multiselect',
      ) as MultiSelectFilterField<Record<string, boolean>>;

      const options = await option.fetchOptionFn?.({ country: true });

      expect(options).to.have.length(19);
    });
  });

  describe('Quick Filter fetchOptionsFns - Fails', () => {
    beforeEach(() => {
      cy.intercept('options*', (res) => res.destroy());
    });

    it('country options', async () => {
      const option = quickFilterFields.find(
        (field) => field.label === 'Country' && field.type === 'multiselect',
      ) as MultiSelectFilterField<Record<string, boolean>>;

      const options = await option.fetchOptionFn?.({ country: true });

      expect(options).to.have.length(0);
    });
  });

  describe('Filter Container fetchOptionsFns - Fails', () => {
    beforeEach(() => {
      cy.intercept('options*', (res) => res.destroy());
    });

    it('country options', async () => {
      const option = filterFields.find(
        (field) => field.label === 'Country' && field.type === 'multiselect',
      ) as MultiSelectFilterField<Record<string, boolean>>;

      const options = await option.fetchOptionFn?.({ country: true });

      expect(options).to.have.length(0);
    });
  });
});
