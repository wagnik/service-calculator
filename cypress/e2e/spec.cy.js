describe('My first test', () => {
  it('finds the content "type" ', () => {

    cy.visit('http://localhost:3000');
    //  Verify that the value has been updated
    cy.get('header').should('exist');

    cy.get('header').should('contain', 'Kalkulator cen usług telekomunikacyjnych');
  })
})