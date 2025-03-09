import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BaseTable } from "@/components/tables/base";

const meta: Meta<typeof BaseTable> = {
  title: "Components/BaseTable",
  component: BaseTable,
  args: {
    colHeader: ["Name", "Email", "Role"],
    action: <button className="text-blue-600">Edit</button>,
    children: (
      <>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User</td>
        </tr>
      </>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof BaseTable>;

export const Default: Story = {};
