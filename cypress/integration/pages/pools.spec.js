describe('Pools Page', () => {
  it('Load Pools Page', () => {
    cy.visit('/pools')
  })

  it('Load Pools History', () => {
    cy.visit('/pools/history')
  })
})
