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
      dispatch: async (payload: FormData) => {
        payload.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
      },
    },
  },
};

export const Error: Story = {
  args: {
    actions: {
      discord: async () => {
        console.log("Discord");
      },
      google: async () => {
        console.log("Google");
      },
      twitch: async () => {
        console.log("Twitch");
      },
    },
    formState: {
      state: {
        message: "There was an error",
        errors: {
          email: ["Email is required"],
          password: ["Password is required"],
        },
      },
      dispatch: async (payload: FormData) => {
        payload.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
      },
    },
  },
};
