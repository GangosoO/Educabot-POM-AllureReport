describe('API de Mercado Libre', () => {

    it('Verifica que el menú contenga departments', () => {
        cy.request({
            method: 'GET',
            url: 'https://www.mercadolibre.com.ar/menu/departments',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('departments');
            console.log(response.body);
            cy.log(JSON.stringify(response.body, 2));
        });
    });

    it('Verifica que el menú contenga departments y lo ordene en el test runner', () => {
        cy.request({
            method: 'GET',
            url: 'https://www.mercadolibre.com.ar/menu/departments',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            // Formatea la respuesta de manera ordenada
            const formattedResponse = JSON.stringify(response.body, null, 2);
            
            // Muestra información estructurada en la consola
            console.log('\n=== RESPUESTA DE LA API ===');
            console.log('Status:', response.status);
            console.log('Body:', formattedResponse);
            console.log('===========================\n');
            
            // Muestra en el test runner de Cypress de forma ordenada
            cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            cy.log('📡 RESPUESTA API - Status: ' + response.status);
            cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            // Si el body es un objeto, muestra información estructurada
            if (response.body && typeof response.body === 'object') {
                const keys = Object.keys(response.body);
                cy.log('📦 Propiedades: ' + keys.join(', '));
                
                // Si tiene departments, muestra información detallada
                if (response.body.departments) {
                    const depts = response.body.departments;
                    const deptCount = Array.isArray(depts) ? depts.length : 'N/A';
                    cy.log('🏷️  Total Departments: ' + deptCount);
                    
                    // Muestra los departments si es un array
                    if (Array.isArray(depts) && depts.length > 0) {
                        cy.log('📋 Lista de Departments:');
                        depts.forEach((dept, index) => {
                            const deptInfo = dept.name || dept.id || JSON.stringify(dept);
                            cy.log(`   ${index + 1}. ${deptInfo}`);
                        });
                    }
                }
                
                // Muestra el JSON completo formateado
                cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                cy.log('📄 Body completo (JSON formateado):');
                // Divide el JSON en líneas para mejor visualización en el test runner
                const lines = formattedResponse.split('\n');
                lines.forEach(line => {
                    cy.log(line);
                });
            } else {
                cy.log('⚠️  Body: ' + response.body);
            }
            
            cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            // Verificaciones
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('departments');
        });
    });
});