import { Meta, StoryObj } from "@storybook/react";
import Navigation from "./Navigation";

const meta = {
  title: "component/Navigation",
  component: Navigation,
} as Meta;

export default meta;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {},
};
