import type { Preview } from '@storybook/react';

import '../src/styles/base.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
  },
};

export default preview;
