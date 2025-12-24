const { logingPage } = require('../../support/POM/Log.ing')

const {homePage, home} = Cypress.env('endpoint')

describe ('Inicio de sesión', () => {

    beforeEach (() => {
        //Arrange
        cy.visit('/')
        //Assert
        cy.url().should("contain", homePage)
    })

    it('Login exitoso con credenciales válidas', () => {
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.contains('Swag Labs').should('be.visible')
        cy.url().should("contain", home)
    })

    it('Login error con credenciales válidas', () => {
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.contains('Swag Labss').should('contain', 'Swag Labs')
    })

    it('Login exitoso con credenciales válidas y luego desloguear', () => {
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.contains('Swag Labs').should('be.visible')
        cy.url().should("contain", home)
        logingPage.Desloguear()
        cy.url().should("contain", homePage)
    })

    it('Ingresar en el campo Username un Espacio despues de ingresar el Usuario', () => {
        //Act
        logingPage.EspacioEnUsername()
        cy.url().should("contain", homePage)
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this servic').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Ingresar en el campo Password un Espacio despues de ingresar la Contraseña', () => {
        //Act
        logingPage.EspacioEnPassword()
        cy.url().should("contain", homePage)
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Hacer login con Username en Blanco', () => {
        //Act
        logingPage.userNameBlanco()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Username is required').should('have.text', 'Epic sadface: Username is required')
    })

    it('Hacer login con Password en Blanco', () => {
        //Act
        logingPage.passwordBlanco()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Password is required').should('have.text', 'Epic sadface: Password is required')
    })

    it('Hacer login en Blanco', () => {
        //Act
        logingPage.LoginBlanco()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Username is required').should('have.text', 'Epic sadface: Username is required')
    })

    it('Ingresar un Usuario invalido', () => {
        //Act
        logingPage.UsuarioInvalido()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Ingresar un password invalido', () => {
        //Act
        logingPage.PasswordInvalido()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Ingresar un Usuario bloqueado', () => {
        //Act
        logingPage.UsuarioBlocked()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Sorry, this user has been locked out.').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('Login con usuario performance_glitch_user', () => {
        //Act
        logingPage.UsuarioPerformanceGlitch()
        //Assert
        cy.url().should("contain", homePage)
        cy.url().should("contain", home)
    })

    it('Acceso a URL protegida sin Login', () => {
        //Act
        logingPage.AccesoURLProtegidaSinLogin()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: You can only access \'/inventory.html\' when you are logged in.').should('have.text', 'Epic sadface: You can only access \'/inventory.html\' when you are logged in.')
    })

    it('Username con case sensitive', () => {
        //Act
        logingPage.UsernameCaseSensitive()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Password con case sensitive', () => {
        //Act
        logingPage.PasswordCaseSensitive()
        //Assert
        cy.url().should("contain", homePage)
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
})