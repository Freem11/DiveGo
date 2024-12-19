// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import PlainTextInput from './index';


const meta: Meta<typeof PlainTextInput> = {
  title:      'Components/Reusables/TextAreaInput',
  component:  PlainTextInput,
  tags:       ['autodocs'],
  args:       { onSubmit: (value) => { console.log(value); } },
  decorators: [
    Story => (
      <div style={{ width: '400px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlainTextInput>;


export const Text: Story = {
  args: {
  },
};
