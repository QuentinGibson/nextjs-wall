import { Meta, StoryObj } from "@storybook/react";
import StartScreen from "./StartScreen";

const meta = {
  title: "component/Start",
  component: StartScreen,
} as Meta;

export default meta;

type Story = StoryObj<typeof StartScreen>;

export const Default: Story = {
  args: {},
};
