const { logingPage } = require('../../support/POM/Log.ing');

describe('SauceDemo | Login con preparación vía API', () => {
    const HOME_ENDPOINT = 'https://www.saucedemo.com/';
    const { home } = Cypress.env('endpoint');

    it('Accede a la home usando estado previo', () => {
        cy.request({
            method: 'GET',
            url: HOME_ENDPOINT,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include('Swag Labs');
            
            console.log('\n=== Respuesta de la API ===');
            console.log('Status:', response.status, '| Body length:', response.body.length, 'caracteres');
            console.log('===========================\n');
        });
        
        // UI - Verificación visual de la página
        cy.visit(HOME_ENDPOINT);
        cy.contains('Swag Labs').should('be.visible');
        cy.log('Home page loaded successfully');
    });

    it('Intercepta servicios durante la carga de productos', () => {
        // Intercepta peticiones ANTES de visitar para capturar todas las que ocurran
        cy.intercept('GET', '**/*').as('allRequests');
        
        cy.visit(HOME_ENDPOINT);
        
        // Realiza el login
        logingPage.UsuarioValido();
        cy.url().should('contain', home);
        
        // Obtiene todas las peticiones interceptadas
        cy.get('@allRequests.all').then((interceptions) => {
            if (interceptions && interceptions.length > 0) {
                // Muestra información sobre las peticiones interceptadas
                console.log('\n=== Peticiones interceptadas ===');
                console.log('Total de peticiones:', interceptions.length);
                
                // Encuentra una petición relacionada con inventory si existe
                const inventoryRequest = interceptions.find(req => 
                    req.request.url.includes('inventory')
                ) || interceptions[interceptions.length - 1];
                
                if (inventoryRequest && inventoryRequest.request) {
                    console.log('URL interceptada:', inventoryRequest.request.url);
                    console.log('Status:', inventoryRequest.response?.statusCode);
                    console.log('================================\n');
                    cy.log('Request intercepted: ' + inventoryRequest.request.url);
                }
            } else {
                cy.log('No se interceptaron peticiones');
            }
        });
        
        // Verificación adicional: confirma que la página de productos está cargada
        cy.contains('Products').should('be.visible');
        cy.log('Products page loaded successfully');
    });
});
