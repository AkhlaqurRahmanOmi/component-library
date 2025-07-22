import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  setup() {
    // Add any global setup here
  },
  async preVisit(page) {
    // Inject axe-core for accessibility testing
    await injectAxe(page);
  },
  async postVisit(page) {
    // Configure axe for accessibility testing
    await configureAxe(page, {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
        },
        {
          id: 'focus-order-semantics',
          enabled: true,
        },
        {
          id: 'keyboard-navigation',
          enabled: true,
        },
      ],
    });

    // Run accessibility checks
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
  tags: {
    include: ['test'],
    exclude: ['skip-test'],
    skip: ['skip-test'],
  },
};

export default config;