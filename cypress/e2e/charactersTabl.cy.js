describe('CharactersTable component tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/characters');
    });

    it('Открытие модального окна при клике на имя персонажа', () => {
        cy.get('[data-testid^="character-name-"]').first().click();
        cy.get('[data-testid="character-modal"]').should('be.visible');
    });

    it('Закрытие модального окна по книку на кнопку закрытия', () => {
        cy.get('[data-testid^="character-name-"]').first().click();
        cy.get('[data-testid="close-modal"]').click();
        cy.get('[data-testid="character-modal"]').should('not.exist');
    });
});