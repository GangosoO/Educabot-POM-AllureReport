const { logingPage } = require('../../support/POM/Log.ing')
const { carritoPage } = require('../../support/POM/Carrito.de.compras')

const {homePage, home, yourCart, checkout, checkoutStepTwo, completeHeader} = Cypress.env('endpoint')

describe ('Inicio de sesión', () => {

    beforeEach (() => {
        //Arrange
        cy.visit('/')
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Swag Labs').should('be.visible')
        cy.url().should("contain", home)
    })

    it('Agregar un producto al carrito', () => {
        //Act
        carritoPage.AddToCart()
    })

    it('Agregar varios productos al carrito', () => {
        //Act
        carritoPage.AddToCartMultipleProducts()
    })

    it('Remover un producto del carrito desde products', () => {
        //Act
        carritoPage.RemoveFromCart()
    })

    it('Remover el carrito de compras desde shopping cart', () => {
        //Act
        carritoPage.RemoveShoppingCart()
        //Assert
        cy.url().should("contain", yourCart)
    })

    it('Verificando en la pantalla Checkout', () => {
        //Act
        carritoPage.Checkout()
            //Assert
        cy.url().should("contain", checkout)      
    })

    it('Checkout ingresando datos de usuario validos', () => {
        //Act
        carritoPage.YourInformation()
        //Assert
        cy.url().should("contain", checkoutStepTwo)      
    })

    it('Finalizar la compra con datos de usuario validos', () => {
        //Act
        carritoPage.YourInformation()
        carritoPage.FinishPurchase()

        //Assert
        cy.url().should("contain", completeHeader) 
        cy.contains('Thank you for your order!').should('be.visible')
        cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!').should('be.visible')
    })

    it('Finalizar la compra con datos de usuario validos y volver a la pantalla de productos', () => {
        //Act
        carritoPage.YourInformation()
        carritoPage.FinishPurchase()
        carritoPage.BackToProducts()

        //Assert
        cy.url().should("contain", home)
    })

    it('En Checkout dejar los campos de usuario en blanco', () => {
        //Act
        carritoPage.Checkout()
        carritoPage.nextContinue()
        //Assert
        cy.url().should("contain", checkout)
        cy.contains('Error: First Name is required').should('contain', 'Error: First Name is required')
    })
})