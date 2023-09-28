import { CategoryProps } from "@/components/Category";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

type AdFormData = {
  title: string;
  description: string;
  price: number;
  category: { id: number };
};

const NewAd = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState<true | false>();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as AdFormData;

    if ("categoryId" in data) {
      data.category = { id: Number(data.categoryId) };
      delete data.categoryId;
    }

    data.price = Number(data.price);

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      const result = await axios.post("http://localhost:5000/ads", data);
      if ("id" in result.data) {
        form.reset();
        setHasBeenSent(true);
        const adSentId = result.data.id;
        router.push(`/ads/${adSentId}`);
      }
    }
  }

  return (
    <main className="main-content">
      <form onSubmit={onSubmit}>
        <label>
          {error === "price" && <p>Le prix doit être positif</p>}
          {error === "title" && (
            <p>Le titre est requis et doit faire plus de 3 caractères</p>
          )}
          {hasBeenSent && <p>Offre ajoutée !</p>}
          Titre de l&apos;annonce :
          <br />
          <input className="text-field" type="text" name="title" />
          <br />
          <br />
          Description :
          <br />
          <input className="text-field" type="text" name="description" />
          <br />
          <br />
          Propriétaire :
          <br />
          <input className="text-field" type="text" name="owner" />
          <br />
          <br />
          Prix :
          <br />
          <input className="text-field" type="number" name="price" />
          <br />
          <br />
          Localisation :
          <br />
          <input className="text-field" type="text" name="location" />
          <br />
          <br />
          Photo :
          <br />
          <input className="text-field" type="text" name="picture" />
          <br />
          <br />
          Catégorie :
          <br />
          <select name="category" className="text-field">
            {categories.map((categ) => (
              <option value={categ.id} key={categ.id}>
                {categ.type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <button className="button">Soumettre</button>
      </form>
    </main>
  );
};

export default NewAd;
