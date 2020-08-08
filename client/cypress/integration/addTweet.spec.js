describe('Add tweet form test', () => {
  it('Can get the form', () => {
    cy.visit('/')
    cy.get('form')
  })
  it('Can fill the form', () => {
    cy.visit('/')
    cy.get('form')

    cy.get('input[name="userHandle"]').type('test').should('have.value', 'test')
    cy.get('input[name="userName"]').type('Cypress test')
    cy.get('input[name="text"]').type('Cypress tweets')

    cy.get('form').submit()
  })
})
