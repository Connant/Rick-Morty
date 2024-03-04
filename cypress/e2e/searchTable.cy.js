describe('Search Table component tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/characters');
    });

    it('Переключение видимости поля ввода', () => {
        cy.get('#searchInput').should('not.be.visible');
        cy.get('#searchButton').click();
        cy.get('#searchInput').should('be.visible');
    });

    it('Результаты поиска', () => {
        cy.get('#searchInput').should('not.be.visible');
        cy.get('#searchButton').click();
        cy.get('#searchInput').should('be.visible');

        const query = 'Rick';
        cy.get('#searchInput').type(query);
        cy.get('[data-testid^="character-name"]').should('contain', query);
    });
});