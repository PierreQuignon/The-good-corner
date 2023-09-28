import Link from "next/link";

export type CategoryType = {
  id: number;
  type: string;
};


export type CategoryProps = CategoryType & {
  onClick: () => void; // permettra à l'avenir de faire un filtre par category
};

export function Category(props: CategoryProps): React.ReactNode {
  return (
    <Link href={''} onClick={props.onClick} className="category-navigation-link">
      {props.type}
    </Link>
  );
}
