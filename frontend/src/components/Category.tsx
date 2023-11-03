import Link from "next/link";

export type CategoryType = {
  id: number;
  type: string;
};

export type CategoryProps = CategoryType & {
  onClick: () => void;
};

export function Category(props: CategoryProps): React.ReactNode {
  return (
    <Link
      href={`/categories/${props.id}`}
      onClick={props.onClick}
      className="category-navigation-link"
    >
      {props.type}
    </Link>
  );
}
