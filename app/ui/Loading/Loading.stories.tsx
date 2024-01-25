import { Meta, StoryObj } from "@storybook/react";
import Loading from "./Loading";

const meta = {
  title: "screen/loading",
  component: Loading,
} as Meta;

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};
