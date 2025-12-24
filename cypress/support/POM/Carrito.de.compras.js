class CarritoPage {

    get = {

        //Products
            addToCart: () => cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),
            addToCart1: () => cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]'),
            addToCart2: () => cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
            shopingCart: () => cy.get('[data-test="shopping-cart-link"]'),
            removeFromCart: () => cy.get('[data-test="remove-sauce-labs-backpack"]'),
        
        //YourCart
            checkout: () => cy.get('[data-test="checkout"]'),

        //Your Information    
            firstName: () => cy.get('[data-test="firstName"]'),
            lastName: () => cy.get('[data-test="lastName"]'),
            postalCode: () => cy.get('[data-test="postalCode"]'),
            continue: () => cy.get('[data-test="continue"]'),

        //Overview
            finish: () => cy.get('[data-test="finish"]'),
            completeHeader: () => cy.get('[data-test="complete-header"]'),
            backHome: () => cy.get('[data-test="back-to-products"]'),
    }

    //Actions
    AddToCart(){
        this.get.addToCart().click()
        //Assert
        this.get.shopingCart().contains('1').should('be.visible')
    }

    AddToCartMultipleProducts(){
        this.get.addToCart().click()
        this.get.addToCart1().click()
        this.get.addToCart2().click()
        //Assert
        this.get.shopingCart().contains('3').should('be.visible')
    }

    RemoveFromCart(){
        this.get.addToCart().click()
        this.get.removeFromCart().click()
        //Assert
        this.get.shopingCart().should('be.visible')
    }

    RemoveShoppingCart(){
        this.get.addToCart().click()
        this.get.shopingCart().click()
        this.get.removeFromCart().click()
        //Assert
        this.get.shopingCart().should('be.visible')
    }

    Checkout(){
        this.get.addToCart().click()
        this.get.shopingCart().click()
        this.get.checkout().click()
    }

    YourInformation(){
        this.get.addToCart().click()
        this.get.shopingCart().click()
        this.get.checkout().click()
        this.get.firstName().type('Kendell')
        this.get.lastName().type('Rodriguez')
        this.get.postalCode().type('C1424')
        this.get.continue().click()
    }
    FinishPurchase(){
        this.get.finish().click()
    }

    BackToProducts(){
        this.get.backHome().click()
    }

    nextContinue(){
        this.get.continue().click()
    }
}

export const carritoPage = new CarritoPage();