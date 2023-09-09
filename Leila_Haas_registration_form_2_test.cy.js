beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can not submit form when first and validation passwords do not match', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        cy.get('#username').type('Something')
        cy.get('#email').type('something@test.com')
        cy.get('input[name="name"]').type('Alex')
        cy.get('input[name="lastName"]').type('Sander')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass1')
        cy.get('input[name="confirm"]').type('Pass2')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'block')
    })

    it('User can submit form when first and validation passwords match', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which matches with first password
        // Assert that submit button is enabled
        // Assert that successful message is visible
        // Assert that error message is not visible
        cy.get('#username').type('Something')
        cy.get('#email').type('something@test.com')
        cy.get('input[name="name"]').type('Alex')
        cy.get('input[name="lastName"]').type('Sander')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass1')
        cy.get('input[name="confirm"]').type('Pass1')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#password_error_message').should('not.be.visible')
    })

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        cy.get('#username').type('Something')
        cy.get('#email').type('Something@some.com')
        cy.get('input[name="name"]').type('Alex')
        cy.get('input[name="lastName"]').type('Sander')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[type="radio"]').eq(1).check()
        cy.get('#vehicle1').click()
        cy.get('#vehicle2').click()
        cy.get('#cars').select("Saab")
        cy.get('#animal').select("Horse")
        cy.get('input[name="password"]').type('Pass1')
        cy.get('input[name="confirm"]').type('Pass1')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        cy.get('#username').type('Something')
        cy.get('#email').type('Something@some.com')
        cy.get('input[name="name"]').type('Alex')
        cy.get('input[name="lastName"]').type('Sander')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass1')
        cy.get('input[name="confirm"]').type('Pass1')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    // Add at least 1 test for checking some mandatory field's absence

    it('User can not submit form with valid data when not all mandatory fields added', () => {
        // Add test steps for filling in NOT ALL mandatory fields
        // Assert that submit button is not enabled
        cy.get('#email').type('Something@some.com')
        cy.get('input[name="name"]').type('Alex')
        cy.get('input[name="lastName"]').type('Sander')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass1')
        cy.get('input[name="confirm"]').type('Pass1')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User can not submit form with valid data when mandatory field is deleted', () => {
        // Add test steps for filling in NOT ALL mandatory fields
        // Assert that submit button is not enabled
        // Assert that system shows error message
        inputValidData('johnDoe')
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')

    })


})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that CH logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 80)
    });

    it('Check navigation first link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation second link', () => {
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that check boxes list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        const selectListOptions = ['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse']
        cy.get('#animal option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}