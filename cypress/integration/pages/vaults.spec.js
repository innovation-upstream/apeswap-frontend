describe('Vaults Page', () => {
  it('Load Vaults Page', () => {
    cy.visit('/vaults')
  })

  it('Load Vaults History', () => {
    cy.visit('/vaults/history')
  })
})
