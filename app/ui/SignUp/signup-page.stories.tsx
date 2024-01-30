import { Meta, StoryObj } from "@storybook/react";
import SignUp from "./SignUp";

const meta = {
  title: "Page/SignUp",
  component: SignUp,
} as Meta;

export default meta;

type Story = StoryObj<typeof SignUp>;

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
          verify: ["Please verify your password"],
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
