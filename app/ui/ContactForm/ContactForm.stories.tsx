import { Meta, StoryObj } from "@storybook/react";
import ContactForm from "./ContactForm";

const meta = {
  title: "component/ContactForm",
  component: ContactForm,
  decorators: [
    (Story: any) => (
      <div style={{ padding: "2rem 1rem" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export default meta;

type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {
  args: {
    dispatch: async () => {},
    pending: false,
  },
};
