import { cva } from 'class-variance-authority';
import React from 'react';

interface TableProps {
    colHeader: string[];
    action?: React.ReactNode;
    children: React.ReactNode;
}

export const Column = cva(
    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
)

export function BaseTable({ colHeader, action, children }: TableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {colHeader.map((header, key) => (
                            <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-right uppercase tracking-wider">
                            {action}
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                </tbody>
            </table>
        </div>
    );
}