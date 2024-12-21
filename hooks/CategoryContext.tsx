import { createContext, useContext, useState } from "react";

type CategoryContextType = {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};
const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);
export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeCategory, setActiveCategory] = useState("bread");
  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
