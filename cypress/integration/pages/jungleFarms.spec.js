describe('Jungle Farms Page', () => {
  it('Load Jungle-Farms', () => {
    cy.visit('/jungle-farms')
  })

  it('Load Jungle-Farms History', () => {
    cy.visit('/jungle-farms/history')
  })
})
