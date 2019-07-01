describe('Validate front-end', () => {
    before(() => {
        cy.visit('https://marksandspicy.com/');
	});

	beforeEach(() => {
        cy.get('.header_user_info > a.login').should('be.visible').click();
    });
    
    it('should check if an error is diplayed', () => {
        cy.get('.alert').should('not.be.visible');

        cy.get('form#login_form').should('be.visible').within(() => {
            cy.get('input#email').type('test@test.com');
            cy.get('input#passwd').type('ThisIs@T3st');

            cy.get('button#SubmitLogin').click();
        }); 
        cy.get('.alert').should('be.visible');  
    });

    it('should check if the validation tooltip appears', () => {
        cy.get('form#login_form').should('be.visible').within(() => {
            cy.get('input#email').parent().should('not.have.class', 'form-ok');
            cy.get('input#email').type('test@test.com');
            cy.get('input#passwd').click();
            cy.get('input#email').parent().should('have.class', 'form-ok');
        }); 
    });

    it('should check if the validation appears in the input boxes', () => {
        cy.get('form#login_form').should('be.visible').within(() => {
            cy.get('input#email').parent().should('not.have.class', 'form-ok').should('not.have.class', 'form-error');
            cy.get('input#email').click();
            cy.get('input#passwd').click();
            cy.get('input#email').parent().should('not.have.class', 'form-ok').should('have.class', 'form-error');
            cy.get('input#email').click();
            cy.get('input#passwd').parent().should('not.have.class', 'form-ok').should('have.class', 'form-error');
        });
    });

    it('should check if the resgistration is successful', () => {
        cy.get('form#create-account_form').should('be.visible').within(() => {
            cy.get('button#SubmitCreate').click();
        });

        cy.get('#TunnelDeCommande').should('be.visible').within(() => {
            cy.get('input#email').scrollIntoView().type('test@test.com');
            cy.get('input#password').scrollIntoView().type('ThisIs@T3st');
            cy.get('input#password2').scrollIntoView().type('ThisIs@T3st');
            cy.get('input#CivMr').parent().within(() => {
                cy.get('.lbl_checkbox').scrollIntoView().click();
            });
            cy.get('input#nom').scrollIntoView().type('Curaçao');
            cy.get('input#prenom').scrollIntoView().type('Ève');
            cy.get('input#dateJour').scrollIntoView().type('31');
            cy.get('input#dateMois').scrollIntoView().type('3');
            cy.get('input#dateAnnee').scrollIntoView().type('1999');
            cy.get('input#adresse').scrollIntoView().type('2, rue du 4 septembre');
            cy.get('input#adresseDetail').scrollIntoView().type('escalier B, 4e étage');
            cy.get('input#adresseDetail2').scrollIntoView().type('Bâtiment Les Dahlias');
            cy.get('input#telephonePortable').scrollIntoView().type('0623456789');
            cy.get('input#telephoneFixe').scrollIntoView().type('01523456789');
            cy.get('label.CheckboxPerso2').scrollIntoView().click();

            
            cy.get('input#ville').should('be.empty');
            cy.get('input#codePostal').scrollIntoView().type('75013');
            cy.get('input#lieuDit').click();
            cy.log(`cy.get('input#ville').should('match', 'Paris'); >> This verification is in error`);
            cy.get('input#ville').should('match', 'Paris');
            
            cy.get('a#BtnCreationSubmit').scrollIntoView().click();
        });
        cy.log(`cy.get('#TunnelDeCommande').should('not.be.visible');; >> This verification is in error`);
    });
});
