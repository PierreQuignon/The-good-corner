import { CategoryType } from "@/components/Category";
import { Layout } from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { queryCategories } from "@/GraphQL/queryCategories";
import { useMutation, useQuery } from "@apollo/client";
import { queryAllAds } from "@/GraphQL/queryAllAds";
import { mutationUpdateAd } from "@/GraphQL/UpdateAd";

export type AdFormData = {
  id?: string;
  title: string;
  description: string;
  picture: string;
  price: number;
  location: string;
  owner: string;
  category: { id: number; type: string };
};

export default function EditAd(props: { ad: AdFormData }) {
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState(false);

  const [title, setTitle] = useState<string>(props.ad.title);
  const [description, setDescription] = useState<string>(props.ad.description);
  const [picture, setpicture] = useState<string>(props.ad.picture);
  const [price, setPrice] = useState<number>(props.ad.price);
  const [location, setLocation] = useState<string>(props.ad.location);
  const [owner, setOwner] = useState<string>(props.ad.owner);
  const [categoryId, setCategoryId] = useState<null | number>(
    props.ad.category.id
  );
  const [category, setCategory] = useState<string>(props.ad.category.type);

  const router = useRouter();

  const { data: dataCategories } = useQuery<{ items: CategoryType[] }>(
    queryCategories
  );
  const categories = useMemo(
    () => (dataCategories ? dataCategories.items : []),
    [dataCategories]
  );

  useEffect(() => {
    if (categories.length) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const [doUpdate] = useMutation(mutationUpdateAd, {
    refetchQueries: [queryAllAds],
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const data: AdFormData = {
      title,
      description,
      picture,
      price,
      location,
      owner,
      category: { id: Number(categoryId), type: String(category) },
    };

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      const result = await doUpdate({
        variables: {
          data: {
            title: title,
            description: description,
            owner: owner,
            price: price,
            picture: picture,
            location: location,
            category: categoryId
              ? {
                  id: categoryId,
                }
              : null,
            tags: [],
          },
          updateAdId: props.ad.id,
        },
      });
      // if ("id" in result.data.item) {
      //   setTitle("");
      //   setDescription("");
      //   setPrice(0);
      //   setpicture("");
      //   setCategoryId(null);
      //   setOwner("");
      //   setLocation("");
      //   setHasBeenSent(true);
      //   setTimeout(() => {
      //     router.push(`/ads/${result.data.item.id}`);
      //   }, 1000);
      // }
    }
  }

  return (
    <Layout title="Nouvelle offre">
      <main className="main-content">
        <Link href={`/`}>Retour aux annonces</Link>
        {hasBeenSent ? (
          <p>Modification de votre annonce en cours...</p>
        ) : (
          <>
            <p>
              Modification de votre annonce <strong>{props.ad.title}</strong>
            </p>
            {error === "price" && <p>Le prix doit être positif</p>}
            {error === "title" && (
              <p>Le titre est requis et doit faire plus de 3 caractères</p>
            )}
            <form onSubmit={onSubmit}>
              <input
                className="text-field"
                type="text"
                name="title"
                placeholder="Titre de l'annonce"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <input
                className="text-field"
                type="text"
                name="description"
                placeholder="Description de l'annonce"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <br />
              <input
                className="text-field"
                type="text"
                name="picture"
                placeholder="Lien de l'image"
                value={picture}
                onChange={(e) => setpicture(e.target.value)}
              />
              <br />
              <br />
              <input
                className="text-field"
                type="number"
                name="price"
                placeholder="0,00€"
                value={props.ad.price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <br />
              <br />
              <input
                className="text-field"
                type="text"
                name="owner"
                placeholder="Nom du vendeur"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
              <br />
              <br />
              <input
                className="text-field"
                type="text"
                name="location"
                placeholder="Localisation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <br />
              <br />
              <select
                className="text-field"
                name="category"
                onChange={(e) => setCategoryId(Number(e.target.value))}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <button type="submit" className="button">
                Sauvegarder les modifications
              </button>
            </form>
          </>
        )}
      </main>
    </Layout>
  );
}
