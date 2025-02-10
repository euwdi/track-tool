import type { Meta, StoryObj } from "@storybook/react";

import { LoginForm } from "./LoginForm";
import { MemoryRouter, Route, Routes } from "react-router";

const meta = {
  component: LoginForm,
  decorators: [
    (Story) => (
      <div style={{ margin: "3em", width: "600px" }}>
        <Story />
      </div>
    ),
    (Story) => {
      return (
        <MemoryRouter>
          <Routes>
            <Route path="/*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
