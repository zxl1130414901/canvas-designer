import React from 'react';

interface PropertySectionProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * Reusable property section wrapper
 * Provides consistent styling for property groups
 */
export const PropertySection: React.FC<PropertySectionProps> = ({ title, children }) => {
  return (
    <div className="property-group">
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
};
