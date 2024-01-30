import { Meta, StoryObj } from "@storybook/react";

import SignIn from "./SignIn";

const meta = {
  title: "Page/SignIn",
  component: SignIn,
  decorators: [
    (Story: any) => (
      <div className="flex items-center justify-center my-10 md:w-screen">
        <Story />
      </div>
    ),
  ],
} as Meta;

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {
  args: {
    actions: {
      google: async () => {
        console.log("Google");
      },
      twitch: async () => {
        console.log("Twitch");
      },
      discord: async () => {
        console.log("Discord");
      },
    },
    formState: {
      state: { message: null, errors: null },
      dispatch: (payload: any) => {
        for (const [key, value] of Object.entries(payload)) {
          console.log(`${key}: ${value}`);
        }
      },
    },
  },
};
