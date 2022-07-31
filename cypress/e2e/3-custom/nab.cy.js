/// <reference types="cypress" />

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

    it('will count the search items of the first tab', () => {

        // Getting the results count of the first tab and if > 10 do an item count
        cy.get('.tabs-navigation-container > ul > li').first().then(($listItem) => {

            cy.wrap($listItem).find('.item-count').then(($span) => {
                const $resultCount = $span.text()

                // const $searchResults = cy.get('.search-results-container .search-result-container')
                const $searchResults = cy.get('.search-results-container').find('.search-result-container');
                
                if(parseInt($resultCount) >= 10) {
                    $searchResults.should('have.length', 10)
                } else {
                    $searchResults.should('be.lt', 10)
                }
            })
        })
    })

    it('will select the second tab and click on the first search result if results are available', () => {

        const $secondTabSelector = cy.get('.tabs-navigation-container > ul > li').eq(1)

        $secondTabSelector.then(($secondTab) => {
            cy.wrap($secondTab).find('.item-count').then(($itemCountSpan) => {
                const $resultCount = $itemCountSpan.text()

                if(parseInt($resultCount) >= 1) {
                    $secondTabSelector.click()
                    cy.get('.search-results-container').find('.search-result-container .search-result-heading').eq(0).click()
                }
            })
        })
    })

    it('will scan for each title of the search results and see at least one matches partially or full', () => {
        
        const $searchTerm = 'home loan'

        cy.get('.nab-header-bar__search > .nab-button-icon--white > .nab-button').click()
        cy.get('.nab-header-bar__header .nab-header-bar__search-container input[type=search]').type($searchTerm).type('{enter}')

        const $searchResults = cy.get('.search-results-container').find('.search-result-container');

        /**
         * Method 1: by iterating over each element using "each". 
         * Note: need to use 'return false' when the first result is found in order to break out of "each" loop since further execution could result in DOM not found error.
         */
        $searchResults.each(($el, $index, $list) => {
            const $searchResultBlock = $el.find('.search-result-heading')
            const $elementHeaderText =  $searchResultBlock.text()
            if($elementHeaderText.includes($searchTerm)){
                cy.wrap($el).find('.search-result-heading').click()
                return false;
            }
        })

        //Method 2: without using iteration
        // $searchResults.get('a').contains($searchTerm).click()
    })
});