beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

import 'cypress-file-upload'

describe('Visual tests for registration form 3', () => {

    it('Check that CH logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('[data-testid="picture"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Country dropdown is correct', () => {
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Spain', 'Estonia', 'Austria']
        cy.get('#country option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )

    })
    it('City dropdown is correct for Spain', () => {
        cy.get('#country').select(1)
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo']
        cy.get('#city option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })

    it('City dropdown is correct for Estonia', () => {
        cy.get('#country').select(2)
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Tallinn', 'Haapsalu', 'Tartu']
        cy.get('#city option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })

    it('City dropdown is correct for Austria', () => {
        cy.get('#country').select(3)
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Vienna', 'Salzburg', 'Innsbruck']
        cy.get('#city option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes work correctly', () => {
        cy.get('[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('[type="checkbox"]').eq(0).uncheck().should('not.be.checked')
        cy.get('[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('[type="checkbox"]').eq(1).should('be.checked')
    })

    it('Check that link works correctly', () => {
        cy.get('button').children().eq(0).should('have.attr', 'href').should('include', 'cookiePolicy')
        cy.get('button').click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_3.html')
    })

    it('Check email format error message', () => {
        cy.get('input[name="email"]').type('validemail@yeap.com')
        cy.get('#emailAlert').should('not.be.visible')
        cy.get('input[name="email"]').clear().type('validemail')
        cy.get('#emailAlert').should('be.visible')
        cy.get('input[name="email"]').clear().type('validemail@')
        cy.get('#emailAlert').should('be.visible')
        cy.get('input[name="email"]').clear().type('validemail@yeap')
        cy.get('#emailAlert').should('be.visible')
        cy.get('input[name="email"]').clear().type('validemail@yeap.')
        cy.get('#emailAlert').should('be.visible')
        cy.get('input[name="email"]').clear().type('validemail@yeap.com')
        cy.get('#emailAlert').should('not.be.visible')
    })

})

describe('Functional tests for registration form 3', () => {

    it('Check that form can be submitted with all fields filled', () => {
        cy.get('input[onclick="postYourAdd()"]').should('be.disabled')
        inputAllData('John')
        cy.get('input[onclick="postYourAdd()"]').should('be.enabled').click()
        cy.url().should('contain', 'upload_file.html')
        cy.go('back')
    })

    it('Check that form can be submitted with mandatory fields filled', () => {
        cy.get('input[onclick="postYourAdd()"]').should('be.disabled')
        inputValidData('so@methi.ng')
        cy.get('input[onclick="postYourAdd()"]').should('be.enabled').click()
        cy.url().should('contain', 'upload_file.html')
        cy.go('back')
    })

    it('Check that form can not be submitted with email field missing', () => {
        cy.get('input[onclick="postYourAdd()"]').should('be.disabled')
        inputValidData('so@methi.ng')
        cy.get('input[onclick="postYourAdd()"]').should('be.enabled')
        cy.get('input[name="email"]').clear()
        cy.get('input[onclick="postYourAdd()"]').should('be.disabled')
        cy.get('span[ng-show="myForm.email.$error.required"]').should('be.visible')
    })

    it('Check that changeing country removes chosen city', () => {
        cy.get('#country').select(1)
        cy.get('#city').select(1)
        cy.get('#country').should('contain', 'Spain')
        cy.get('#country').select(2).should('contain', 'Estonia')
        cy.get('#city').should('contain', '')
    })

    it('Check that file can be added', () => {
        const fixtureFile = 'demo.jpg';
        cy.get('#myFile').attachFile(fixtureFile)
    })

})

function inputValidData(email) {
    cy.log('Mandatory fields will be filled')
    cy.get('input[name="email"]').type(email)
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('h2').contains('Birthday').click()
    cy.get('[type="checkbox"]').eq(0).check()

}

function inputAllData(name) {
    cy.log('All fields will be filled')
    cy.get('#name').clear().type(name)
    cy.get('input[name="email"]').type('validemail@yeap.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('input').eq(2).type('2000-01-01')
    cy.get('input[type="radio"]').eq(0).check()
    cy.get('[type="checkbox"]').eq(0).check()
    cy.get('[type="checkbox"]').eq(1).check()
    cy.get('h2').click()
    cy.get('#birthday').clear().type('2000-01-01')
}