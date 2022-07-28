/// <reference types="cypress" />

import { should } from "chai";

/**
 * Custom written test cases for NAB
 */


describe('Accessing NAB website', () => {
    it('It visits the NAB page', () => {
        cy.visit('https://www.nab.com.au/')
    })

    it('reveals the search bar', () => {
        cy.get('.nab-header-bar__search > .nab-button-icon--white > .nab-button').click()
    })

    it('looks for search bar and search a keyword', () => {
        cy.get('.nab-header-bar__header .nab-header-bar__search-container input[type=search]').type('home loan{enter}')
    })

    it('will count the search items', () => {

        // Getting the results count of the first tab and if > 10 do an item count
        cy.get('.tabs-navigation-container > ul > li').first().then(($listItem) => {

            cy.wrap($listItem),should('have.class', 'item-count')

            cy.wrap($listItem).find('.item-count').then(($span) => {
                const $resultCount = $span.text()
                
                if(parseInt($resultCount) >= 10) {
                    cy.get('.search-results-container .search-result-container').should('have.length', 10)
                }
            })
        })
    })
});