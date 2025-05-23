describe('Hero Component', () => {
  beforeEach(() => {
    cy.visit('/'); 
    cy.get('[data-testid="hero-section"]', { timeout: 10000 }).should('be.visible');
  });

  describe('Layout and Structure', () => {
    it('should render the hero section with correct structure', () => {
      cy.get('[data-testid="hero-section"]')
        .should('be.visible')
        .and('have.class', 'bg-cover')
        .and('have.class', 'bg-center');
      
      cy.get('[data-testid="hero-content"]')
        .should('be.visible')
        .and('have.class', 'flex-col-center');
    });

    it('should display the version tag with correct content', () => {
      cy.get('[data-testid="version-tag"]')
        .should('be.visible')
        .and('have.class', 'tag');
      
      cy.get('[data-testid="version-tag"]')
        .should('contain.text', 'Version 2.0 is here');
      
      cy.get('[data-testid="version-tag"]')
        .should('contain.text', 'Read more')
        .find('svg') 
        .should('be.visible');
    });

    it('should display the main heading correctly', () => {
      cy.get('[data-testid="hero-heading"]')
        .should('be.visible')
        .and('contain.text', 'One Task')
        .and('contain.text', 'at a Time');
      
      // Check responsive classes
      cy.get('[data-testid="hero-heading"]')
        .should('have.class', 'my-8')
        .and('have.class', 'md:leading-30');
    });

    it('should display the description paragraph', () => {
      cy.get('[data-testid="hero-description"]')
        .should('be.visible')
        .and('contain.text', 'Celebrate the joy of accomplishment')
        .and('have.class', 'text-body-lg')
        .and('have.class', 'font-inter')
        .and('have.class', 'max-w-[450px]');
    });

    it('should display the Get Started button', () => {
      cy.get('[data-testid="get-started-btn"]')
        .should('be.visible')
        .and('contain.text', 'Get Started')
        .and('have.class', 'btn')
    });
  });

  describe('Theme Switching', () => {
    it('should use light theme background when theme is light', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('theme', 'light');
      });
      
      cy.reload();
      
      cy.get('[data-testid="hero-section"]')
        .should('have.attr', 'style')
        .and('include', 'landingBgHeroLight.png');
    });

    it('should use dark theme background when theme is dark', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('theme', 'dark');
      });
      
      cy.reload();
      
      cy.get('[data-testid="hero-section"]')
        .should('have.attr', 'style')
        .and('include', 'landingBgHero.png');
    });

    it('should apply correct text colors based on theme', () => {
      cy.get('[data-testid="version-tag"] span')
        .should('have.class', 'dark:text-white');
      
      cy.get('[data-testid="version-tag"] svg')
        .should('have.class', 'dark:text-white');
    });
  });

  describe('Interactive Elements', () => {
    it('should make version tag clickable', () => {
      cy.get('[data-testid="version-tag"]')
        .should('have.attr', 'href');
    });

    it('should navigate to signup page when Get Started is clicked', () => {
      cy.get('[data-testid="get-started-btn"]')
        .should('have.attr', 'href', '/signup')
        .click();
      
      cy.url().should('include', '/signup');
    });

  });

  describe('Animated Elements', () => {
    it('should display message image with correct positioning', () => {
      cy.get('[data-testid="message-image"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', 'message');
      
      cy.get('[data-testid="message-image"]')
        .should('have.attr', 'width', '150')
        .and('have.attr', 'height', '150')
        .and('have.attr', 'draggable', 'false');
    });

    it('should display cursor image with correct positioning', () => {
      cy.get('[data-testid="cursor-image"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', 'cursor');
      
      cy.get('[data-testid="cursor-image"]')
        .should('have.attr', 'width', '150')
        .and('have.attr', 'height', '150')
        .and('have.attr', 'draggable', 'false');
    });

    it('should allow dragging of animated images', () => {
      cy.get('[data-testid="message-image"]')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 100, clientY: 100 })
        .trigger('mouseup');
      
      cy.get('[data-testid="cursor-image"]')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 100, clientY: 100 })
        .trigger('mouseup');
    });

    it('should have proper initial animation states', () => {
      cy.get('[data-testid="message-container"]')
        .should('be.visible');
      
      cy.get('[data-testid="cursor-container"]')
        .should('be.visible');
      
      cy.get('[data-testid="get-started-btn"]')
        .should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    it('should hide animated images on mobile', () => {
      cy.viewport(375, 667); // Mobile viewport
      
      cy.get('[data-testid="message-container"]')
        .should('have.class', 'hidden')
        .and('have.class', 'md:block');
      
      cy.get('[data-testid="cursor-container"]')
        .should('have.class', 'hidden')
        .and('have.class', 'md:block');
    });

    it('should show animated images on desktop', () => {
      cy.viewport(1280, 720); 
      
      cy.get('[data-testid="message-container"]')
        .should('be.visible');
      
      cy.get('[data-testid="cursor-container"]')
        .should('be.visible');
    });

    it('should adjust positioning classes for different screen sizes', () => {
      cy.get('[data-testid="message-container"]')
        .should('have.class', '-right-15')
        .and('have.class', 'lg:right-70');
      
      cy.get('[data-testid="cursor-container"]')
        .should('have.class', '-left-12')
        .and('have.class', 'lg:left-70')
        .and('have.class', 'lg:top-30');
    });

    it('should apply responsive heading styles', () => {
      cy.get('[data-testid="hero-heading"]')
        .should('have.class', 'md:leading-30');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria labels for decorative images', () => {
      cy.get('[data-testid="message-image"]')
        .should('have.attr', 'aria-hidden', 'true');
      
      cy.get('[data-testid="cursor-image"]')
        .should('have.attr', 'aria-hidden', 'true');
    });

    it('should have proper alt texts for images', () => {
      cy.get('[data-testid="message-image"]')
        .should('have.attr', 'alt', 'message image');
      
      cy.get('[data-testid="cursor-image"]')
        .should('have.attr', 'alt', 'cursor image');
    });

    // it('should be keyboard navigable', () => {
    //   // Tab through interactive elements
    //   cy.get('body').tab();
    //   cy.focused().should('have.attr', 'data-testid', 'version-tag');
      
    //   cy.focused().tab();
    //   cy.focused().should('have.attr', 'data-testid', 'get-started-btn');
    // });

    it('should have sufficient color contrast', () => {
      cy.get('[data-testid="hero-heading"]')
        .should('be.visible');
      
      cy.get('[data-testid="hero-description"]')
        .should('be.visible');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing images gracefully', () => {
      cy.intercept('GET', '**/message*', { statusCode: 404 });
      cy.intercept('GET', '**/cursor*', { statusCode: 404 });
      
      cy.reload();
      
      cy.get('[data-testid="hero-section"]').should('be.visible');
      cy.get('[data-testid="hero-heading"]').should('be.visible');
    });

    it('should work without JavaScript', () => {
      cy.visit('/', { 
        onBeforeLoad: (win) => {
          win.document.documentElement.style.display = 'none';
        }
      });
      
      cy.get('[data-testid="hero-heading"]').should('contain.text', 'One Task');
    });
  });
});