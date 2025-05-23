describe('SignUpForm Registration Component', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.clear();
      });
      
      cy.visit('/signup'); 
      cy.get('[data-testid="signup-form-section"]', { timeout: 10000 }).should('be.visible');
    });
  
    describe('Layout and Structure', () => {
      it('should render the main form section with correct structure', () => {
        cy.get('[data-testid="signup-form-section"]')
          .should('be.visible')
          .and('have.class', 'w-full')
          .and('have.class', 'flex')
          .and('have.class', 'flex-col')
          .and('have.class', 'h-screen');
      });
  
      it('should display the logo and brand name', () => {
        cy.get('[data-testid="logo-container"]')
          .should('be.visible')
          .within(() => {
            cy.get('[data-testid="logo-image"]')
              .should('be.visible')
              .and('have.attr', 'alt', 'Logo')
              .and('have.attr', 'width', '50')
              .and('have.attr', 'height', '50');
            
            cy.get('[data-testid="brand-name"]')
              .should('be.visible')
              .and('contain.text', 'Chat Bot')
              .and('have.class', 'text-2xl')
              .and('have.class', 'lg:text-3xl');
          });
      });
  
      it('should display the main heading with correct styling', () => {
        cy.get('[data-testid="main-heading"]')
          .should('be.visible')
          .and('contain.text', 'Your Ideas,')
          .and('contain.text', 'Elevated')
          .and('have.class', 'text-2xl')
          .and('have.class', 'md:text-5xl')
          .and('have.class', 'font-extralight')
          .and('have.class', 'font-bricolage');
      });
  
      it('should display the subtitle', () => {
        cy.get('[data-testid="subtitle"]')
          .should('be.visible')
          .and('contain.text', 'Privacy-first AI that helps you create in confidence.')
          .and('have.class', 'dark:text-neutral-200');
      });
  
      it('should display the form container with correct styling', () => {
        cy.get('[data-testid="form-container"]')
          .should('be.visible')
          .and('have.class', 'border')
          .and('have.class', 'border-neutral-200')
          .and('have.class', 'dark:border-neutral-700')
          .and('have.class', 'shadow-2xl')
          .and('have.class', 'rounded-4xl');
      });
    });
  
    describe('Form Fields', () => {
      it('should display all required form fields', () => {
        cy.get('[data-testid="name-input"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Name')
          .and('have.attr', 'name', 'name')
          .and('have.attr', 'id', 'name');
  
        cy.get('[data-testid="email-input"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Email')
          .and('have.attr', 'name', 'email')
          .and('have.attr', 'id', 'email');
  
        cy.get('[data-testid="password-input"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Password')
          .and('have.attr', 'name', 'password')
          .and('have.attr', 'id', 'password');
      });
  
      it('should display the submit button', () => {
        cy.get('[data-testid="submit-button"]')
          .should('be.visible')
          .and('contain.text', 'Sign Up')
          .and('be.enabled');
      });
  
      it('should allow typing in all form fields', () => {
        const testData = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        };
        
        cy.get('[data-testid="name-input"]')
          .type(testData.name)
          .should('have.value', testData.name);
  
        cy.get('[data-testid="email-input"]')
          .type(testData.email)
          .should('have.value', testData.email);
  
        cy.get('[data-testid="password-input"]')
          .type(testData.password)
          .should('have.value', testData.password);
      });
  
      it('should clear form fields when needed', () => {
        cy.get('[data-testid="name-input"]').type('Test Name').clear().should('have.value', '');
        cy.get('[data-testid="email-input"]').type('test@example.com').clear().should('have.value', '');
        cy.get('[data-testid="password-input"]').type('password123').clear().should('have.value', '');
      });
    });
  
    describe('Form Validation', () => {
      it('should handle empty form submission', () => {
        cy.get('[data-testid="submit-button"]').click();
        
        cy.get('[data-testid="name-input"]:invalid').should('exist');
      });
  
      it('should validate email format', () => {
        cy.get('[data-testid="name-input"]').type('John Doe');
        cy.get('[data-testid="email-input"]').type('invalid-email');
        cy.get('[data-testid="password-input"]').type('password123');
        cy.get('[data-testid="submit-button"]').click();
        
        cy.get('[data-testid="email-input"]:invalid').should('exist');
      });
  
    });
  
    describe('Form Submission', () => {
      it('should submit form with valid data', () => {
        cy.intercept('POST', '**/signup', {
          statusCode: 200,
          body: { success: true }
        }).as('successfulRegistration');
  
        const testData = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        };
  
        cy.get('[data-testid="name-input"]').type(testData.name);
        cy.get('[data-testid="email-input"]').type(testData.email);
        cy.get('[data-testid="password-input"]').type(testData.password);
        cy.get('[data-testid="submit-button"]').click();
  
        cy.wait('@successfulRegistration');
        // cy.pause();
      });
  
    //   it('should handle registration failure', () => {
    //     cy.intercept('POST', '**/signup', {
    //       statusCode: 400,
    //       body: {
    //         success: false,
    //         error: { message: 'Email already exists' }
    //       }
    //     }).as('failedRegistration');
  
    //     cy.get('[data-testid="name-input"]').type('John Doe');
    //     cy.get('[data-testid="email-input"]').type('existing@example.com');
    //     cy.get('[data-testid="password-input"]').type('password123');
    //     cy.get('[data-testid="submit-button"]').click();
  
    //     cy.wait('@failedRegistration');
        
    //     // Should show error toast
    //     cy.get('.Toastify__toast--error').should('be.visible');
    //   });
  
    //   it('should handle network errors', () => {
    //     cy.intercept('POST', '**/signup', { forceNetworkError: true }).as('networkError');
  
    //     cy.get('[data-testid="name-input"]').type('John Doe');
    //     cy.get('[data-testid="email-input"]').type('john@example.com');
    //     cy.get('[data-testid="password-input"]').type('password123');
    //     cy.get('[data-testid="submit-button"]').click();
  
    //     cy.wait('@networkError');
        
    //     cy.get('.Toastify__toast--error').should('be.visible');
    //   });
  
    });
    describe('Navigation Links', () => {
      it('should display sign in link', () => {
        cy.get('[data-testid="signin-link"]')
          .should('be.visible')
          .and('contain.text', 'Sign In')
          .and('have.attr', 'href', '/login')
          .and('have.class', '!underline');
      });
  
      it('should navigate to login page when sign in link is clicked', () => {
        cy.get('[data-testid="signin-link"]').click();
        cy.url().should('include', '/login');
      });
  
      it('should display terms and policy links', () => {
        cy.get('[data-testid="terms-link"]')
          .should('be.visible')
          .and('contain.text', 'Consumer Terms')
          .and('have.class', '!underline');
  
        cy.get('[data-testid="usage-policy-link"]')
          .should('be.visible')
          .and('contain.text', 'Usage Policy')
          .and('have.class', '!underline');
  
        cy.get('[data-testid="privacy-policy-link"]')
          .should('be.visible')
          .and('contain.text', 'Privacy Policy')
          .and('have.class', '!underline');
      });
    });
  
    describe('Responsive Design', () => {
      it('should adapt to mobile viewport', () => {
        cy.viewport(375, 667);
        
        cy.get('[data-testid="signup-form-section"]')
          .should('be.visible');
        
        cy.get('[data-testid="brand-name"]')
          .should('have.class', 'text-2xl');
        
        cy.get('[data-testid="main-heading"]')
          .should('have.class', 'text-2xl');
        
        cy.get('[data-testid="form-container"]')
          .should('have.class', 'w-full');
      });
  
      it('should adapt to desktop viewport', () => {
        cy.viewport(1280, 720);
        
        cy.get('[data-testid="brand-name"]')
          .should('have.class', 'lg:text-3xl');
        
        cy.get('[data-testid="main-heading"]')
          .should('have.class', 'md:text-5xl');
        
        cy.get('[data-testid="form-container"]')
          .should('have.class', 'lg:w-4/6');
      });
  
      it('should have proper spacing on different screen sizes', () => {
        // Mobile spacing
        cy.viewport(375, 667);
        cy.get('[data-testid="signup-form-section"]')
          .should('have.class', 'p-4');
        
        // Desktop spacing
        cy.viewport(1280, 720);
        cy.get('[data-testid="signup-form-section"]')
          .should('have.class', 'lg:p-8');
      });
    });
  
    describe('Accessibility', () => {
      it('should have proper form labels and attributes', () => {
        cy.get('[data-testid="name-input"]')
          .should('have.attr', 'id', 'name')
          .and('have.attr', 'name', 'name');
  
        cy.get('[data-testid="email-input"]')
          .should('have.attr', 'id', 'email')
          .and('have.attr', 'name', 'email');
  
        cy.get('[data-testid="password-input"]')
          .should('have.attr', 'id', 'password')
          .and('have.attr', 'name', 'password');
      });
  
      it('should have proper heading hierarchy', () => {
        cy.get('h1[data-testid="brand-name"]').should('exist');
        cy.get('h2[data-testid="main-heading"]').should('exist');
      });
  
      it('should have alt text for logo image', () => {
        cy.get('[data-testid="logo-image"]')
          .should('have.attr', 'alt', 'Logo');
      });
  
      it('should submit form on Enter key press', () => {
        cy.get('[data-testid="name-input"]').type('John Doe');
        cy.get('[data-testid="email-input"]').type('john@example.com');
        cy.get('[data-testid="password-input"]').type('password123{enter}');
      });
  
      it('should have proper focus management', () => {
        cy.get('[data-testid="name-input"]').focus();
        cy.focused().should('have.attr', 'data-testid', 'name-input');
      });
    });
  
    describe('Edge Cases', () => {
      it('should handle special characters in form fields', () => {
        const specialData = {
          name: 'José María-O\'Connor',
          email: 'test+special@example.com',
          password: 'P@ssw0rd!123'
        };
  
        cy.get('[data-testid="name-input"]').type(specialData.name);
        cy.get('[data-testid="email-input"]').type(specialData.email);
        cy.get('[data-testid="password-input"]').type(specialData.password);
        
        cy.get('[data-testid="name-input"]').should('have.value', specialData.name);
        cy.get('[data-testid="email-input"]').should('have.value', specialData.email);
        cy.get('[data-testid="password-input"]').should('have.value', specialData.password);
      });
  
      it('should handle very long input values', () => {
        const longString = 'a'.repeat(500);
        
        cy.get('[data-testid="name-input"]').type(longString);
        cy.get('[data-testid="name-input"]').should('have.value', longString);
      });
  
      it('should work without JavaScript (progressive enhancement)', () => {
        cy.get('[data-testid="registration-form"]')
          .should('have.attr', 'action')
      });
    });
  
    describe('Performance', () => {
      it('should load quickly', () => {
        cy.visit('/signup');
        cy.get('[data-testid="signup-form-section"]', { timeout: 3000 })
          .should('be.visible');
      });
  
      it('should not cause layout shifts', () => {
        cy.get('[data-testid="form-container"]').then(($el) => {
          const initialRect = $el[0].getBoundingClientRect();
          
          // Trigger some state changes
          cy.get('[data-testid="name-input"]').type('Test Name');
          
          cy.wait(500);
          
          cy.get('[data-testid="form-container"]').then(($el2) => {
            const finalRect = $el2[0].getBoundingClientRect();
            expect(finalRect.top).to.be.closeTo(initialRect.top, 5);
          });
        });
      });
    });
  });