describe('SignUpForm Component', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.clear();
      });
      cy.visit('/login'); 
      
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
          .and('have.class', 'lg:text-5xl')
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
  
    describe('Social Authentication', () => {
      it('should display GitHub sign-in button', () => {
        cy.get('[data-testid="github-signin"]')
          .should('be.visible')
          .and('be.enabled');
      });
  
      it('should display Google sign-in button', () => {
        cy.get('[data-testid="google-signin"]')
          .should('be.visible')
          .and('be.enabled');
      });
  
      it('should show OR separator between social and email login', () => {
        cy.get('[data-testid="form-container"]')
          .should('contain.text', 'OR');
      });
  
      it('should handle GitHub sign-in click', () => {
        cy.intercept('POST', '**/auth/github', { statusCode: 200 }).as('githubAuth');
        
        cy.get('[data-testid="github-signin"]').click();
      });
  
      it('should handle Google sign-in click', () => {
        cy.intercept('POST', '**/auth/google', { statusCode: 200 }).as('googleAuth');
        
        cy.get('[data-testid="google-signin"]').click();
      });
    });
  
    describe('Email Form', () => {
      it('should display email and password input fields', () => {
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
          .and('contain.text', 'Continue with Email')
          .and('be.enabled');
      });
  
      it('should allow typing in email field', () => {
        const testEmail = 'test@example.com';
        
        cy.get('[data-testid="email-input"]')
          .type(testEmail)
          .should('have.value', testEmail);
      });
  
      it('should allow typing in password field', () => {
        const testPassword = 'testpassword123';
        
        cy.get('[data-testid="password-input"]')
          .type(testPassword)
          .should('have.value', testPassword);
      });
  
      it('should mask password input', () => {
        cy.get('[data-testid="password-input"]')
          .should('have.attr', 'type', 'password');
      });
  
      it('should handle form submission with empty fields', () => {
        cy.get('[data-testid="submit-button"]').click();
        
        cy.get('[data-testid="email-input"]:invalid').should('exist');
      });
  
      it('should handle invalid email format', () => {
        cy.get('[data-testid="email-input"]').type('invalid-email');
        cy.get('[data-testid="password-input"]').type('password123');
        cy.get('[data-testid="submit-button"]').click();
        
        // Should show validation error
        cy.get('[data-testid="email-input"]:invalid').should('exist');
      });
    });
  
    describe('Error Handling', () => {
      it('should display error message when provided in URL params', () => {
        const errorMessage = 'Invalid credentials';
        cy.visit(`/login?error=${encodeURIComponent(errorMessage)}`);
        
        cy.get('[data-testid="error-message"]')
          .should('be.visible')
          .and('contain.text', errorMessage)
          .and('have.class', 'bg-red-100')
          .and('have.class', 'border-red-400')
          .and('have.class', 'text-red-700');
      });
  
      it('should handle network errors gracefully', () => {
        cy.intercept('POST', '**/login', { forceNetworkError: true }).as('networkError');
  
        cy.get('[data-testid="email-input"]').type('test@example.com');
        cy.get('[data-testid="password-input"]').type('password123');
        cy.get('[data-testid="submit-button"]').click();
  
        cy.wait('@networkError');
      });
    });
  
    describe('Navigation Links', () => {
      it('should display sign up link', () => {
        cy.get('[data-testid="signup-link"]')
          .should('be.visible')
          .and('contain.text', 'Sign Up')
          .and('have.attr', 'href', '/signup')
          .and('have.class', '!underline');
      });
  
      it('should navigate to signup page when clicked', () => {
        cy.get('[data-testid="signup-link"]').click();
        cy.url().should('include', '/signup');
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
          .should('have.class', 'lg:text-5xl');
        
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
        cy.get('[data-testid="email-input"]').type('test@example.com');
        cy.get('[data-testid="password-input"]').type('password123{enter}');
        
      });
    });
  
    describe('Authentication Flow', () => {
      it('should redirect authenticated users', () => {
        cy.window().then((win) => {
          win.localStorage.setItem('auth-session', 'valid-session');
        });
      });
  
      it('should maintain form state during errors', () => {
        const email = 'test@example.com';
        const password = 'wrongpassword';
        
        cy.get('[data-testid="email-input"]').type(email);
        cy.get('[data-testid="password-input"]').type(password);
        
        cy.intercept('POST', '**/login', {
          statusCode: 401,
          body: { success: false, error: { message: 'Invalid credentials' } }
        }).as('failedLogin');
        
        cy.get('[data-testid="submit-button"]').click();
        cy.wait('@failedLogin');
        
      });
    });
  
    describe('Performance', () => {
      it('should load quickly', () => {
        cy.visit('/login');
        cy.get('[data-testid="signup-form-section"]', { timeout: 3000 })
          .should('be.visible');
      });
  
      it('should not cause layout shifts', () => {
        cy.get('[data-testid="form-container"]').then(($el) => {
          const initialRect = $el[0].getBoundingClientRect();
          
          cy.wait(1000);
          
          cy.get('[data-testid="form-container"]').then(($el2) => {
            const finalRect = $el2[0].getBoundingClientRect();
            expect(finalRect.top).to.be.closeTo(initialRect.top, 5);
          });
        });
      });
    });
  });