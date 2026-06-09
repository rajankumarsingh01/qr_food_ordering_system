import MenuCard from "./MenuCard";

import { MenuItem } from "@/types/menu";

interface Props {
  items: MenuItem[];
}

export default function MenuList({
  items,
}: Props) {
  if (!items.length) {
    return (
      <div>
        No menu items found
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuCard
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
}