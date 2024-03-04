describe('Search component tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/characters');
    });

    it('Переключение видимости поля ввода', () => {
        cy.get('#searchInput').should('not.be.visible');
        cy.get('#searchButton').click();
        cy.get('#searchInput').should('be.visible');
    });

    it('Обновление поисковой строки', () => {
        cy.get('#searchInput').then(($input) => {
            if ($input.is(':hidden')) {
                cy.get('#searchButton').click();
            }
        });
        const query = 'Rick';
        cy.get('#searchInput').type(query);
        cy.get('#searchInput').should('have.value', query);
    });
});