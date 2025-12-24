class LogingPage {

    get = {

        //Inputs
            username: () => cy.get('[name="user-name"]'),
            password: () => cy.get('[name="password"]'),
            loginButton: () => cy.get('[name="login-button"]'),

        // Burger menu
        burgerMenu: () => cy.get('#react-burger-menu-btn'),
        logout: () => cy.get('[data-test="logout-sidebar-link"]'),
    }

    //field action
    userNameBlanco(){
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    passwordBlanco(){
        this.get.username().type('standard_user')
        this.get.loginButton().click()
    }

    LoginBlanco(){
        this.get.loginButton().click()
    }

    UsuarioInvalido(){
        this.get.username().type('kendell_rodriguez')
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    PasswordInvalido(){
        this.get.username().type('standard_user')
        this.get.password().type('secret_sauce123')
        this.get.loginButton().click()
    }   

    UsuarioBlocked(){
        this.get.username().type('locked_out_user')
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    UsuarioPerformanceGlitch(){
        this.get.username().type('performance_glitch_user')
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    UsuarioValido(){
        this.get.username().type('standard_user')
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    Desloguear(){
        this.get.burgerMenu().click()
        this.get.logout().click()
    }

    EspacioEnUsername(){
        this.get.username().type('standard_user ')
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    EspacioEnPassword(){
        this.get.username().type('standard_user')
        this.get.password().type(' secret_sauce')
        this.get.loginButton().click()
    }

    AccesoURLProtegidaSinLogin(){
        cy.visit('/inventory.html', { failOnStatusCode: false })
    }

    UsernameCaseSensitive(){
        this.get.username().type('STANDARD_USER')
        this.get.password().type('secret_sauce')
        this.get.loginButton().click()
    }

    PasswordCaseSensitive(){
        this.get.username().type('standard_user')
        this.get.password().type('Secret_sauce')
        this.get.loginButton().click()
    }
}

export const logingPage = new LogingPage();