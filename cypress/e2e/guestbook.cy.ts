import EntryCreate from '@/app/guestbook/entry';
import { GuestbookEntry } from '@/prisma/generated';

describe('Add a new entry to the guestbook', () => {
  const newEntry: EntryCreate = {
    name: 'John Doe',
    message: 'Testing from Cypress',
    hide: false
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000/guestbook');
    cy.get('input[name="name"]').type(newEntry.name);
    cy.get('input[name="message"]').type(newEntry.message);
    if (newEntry.hide) cy.get('input[name="hide"]').check();
  });

  it('succeeds in adding it', () => {
    cy.intercept<EntryCreate, GuestbookEntry>('POST', '/api/guestbook').as('addEntry');

    cy.get('button[type="submit"]').click();
    cy.wait('@addEntry').then(interception => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body).to.have.property('name', newEntry.name);
      expect(interception.response?.body).to.have.property('message', newEntry.message);
      expect(interception.response?.body).to.have.property('hide', newEntry.hide);
      expect(interception.response?.body).to.have.property('id');
      expect(interception.response?.body).to.have.property('createdAt');
    });

    cy.wait(1000);

    cy.get('table > tbody > tr:first-child > td:first-child').should('have.text', newEntry.name);
    cy.get('table > tbody > tr:first-child > td:nth-child(2)').should('have.text', newEntry.message);
  });

  it('fails in adding it', () => {
    cy.intercept<EntryCreate, GuestbookEntry>('POST', '/api/guestbook', { statusCode: 500 }).as('addEntry');

    const newName = 'Eve';
    cy.get('input[name="name"]').type(newName);
    cy.get('button[type="submit"]').click();
    cy.wait('@addEntry').then(interception => {
      expect(interception.response?.statusCode).to.equal(500);
    });

    cy.wait(1000);

    cy.get('table > tbody > tr:first-child > td:first-child').should('not.have.text', newName);
  });
});
