import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../app/globals.css";
import React from "react";
import { Layout } from "../app/layout";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: any) => <Layout>{Story()}</Layout>,
    // withThemeByDataAttribute<ReactRenderer>({
    //   themes: { valentine: "valentine", dark: "dark" },
    //   defaultTheme: "valentine",
    //   attributeName: "data-theme",
    // }),
  ],
};

export default preview;
