import { Meta, StoryObj } from "@storybook/react";
import LoadingScreen from "./LoadingScreen";

const meta = {
  title: "component/LoadingScreen",
  component: LoadingScreen,
} as Meta;

export default meta;

type Story = StoryObj<typeof LoadingScreen>;

export const Loading: Story = {
  args: {
    progress: 50,
  },
};
