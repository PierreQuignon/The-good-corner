// import { CategoryProps } from "@/components/Category";
// import axios from "axios";
// import { FormEvent, useEffect, useState } from "react";
// import { useRouter } from "next/router";

// type AdFormData = {
//   title: string;
//   description: string;
//   price: number;
//   category: { id: number };
// };

// const NewAd = () => {
//   const [categories, setCategories] = useState<CategoryProps[]>([]);
//   const [error, setError] = useState<"title" | "price">();
//   const [hasBeenSent, setHasBeenSent] = useState<true | false>();
//   const router = useRouter();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/categories")
//       .then((result) => {
//         setCategories(result.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setError(undefined);
//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const data = Object.fromEntries(
//       formData.entries()
//     ) as unknown as AdFormData;

//     if ("categoryId" in data) {
//       data.category = { id: Number(data.categoryId) };
//       delete data.categoryId;
//     }

//     data.price = Number(data.price);

//     if (data.title.trim().length < 3) {
//       setError("title");
//     } else if (data.price < 0) {
//       setError("price");
//     } else {
//       const result = await axios.post("http://localhost:5000/ads", data);
//       if ("id" in result.data) {
//         form.reset();
//         setHasBeenSent(true);
//         const adSentId = result.data.id;
//         router.push(`/ads/${adSentId}`);
//       }
//     }
//   }

//   return (
//     <main className="main-content">
//       <form onSubmit={onSubmit}>
//         <label>
//           {error === "price" && <p>Le prix doit être positif</p>}
//           {error === "title" && (
//             <p>Le titre est requis et doit faire plus de 3 caractères</p>
//           )}
//           {hasBeenSent && <p>Offre ajoutée !</p>}
//           Titre de l&apos;annonce :
//           <br />
//           <input className="text-field" type="text" name="title" />
//           <br />
//           <br />
//           Description :
//           <br />
//           <input className="text-field" type="text" name="description" />
//           <br />
//           <br />
//           Propriétaire :
//           <br />
//           <input className="text-field" type="text" name="owner" />
//           <br />
//           <br />
//           Prix :
//           <br />
//           <input className="text-field" type="number" name="price" />
//           <br />
//           <br />
//           Localisation :
//           <br />
//           <input className="text-field" type="text" name="location" />
//           <br />
//           <br />
//           Photo :
//           <br />
//           <input className="text-field" type="text" name="picture" />
//           <br />
//           <br />
//           Catégorie :
//           <br />
//           <select name="category" className="text-field">
//             {categories.map((categ) => (
//               <option value={categ.id} key={categ.id}>
//                 {categ.type}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <br />
//         <button className="button">Soumettre</button>
//       </form>
//     </main>
//   );
// };

// export default NewAd;

import { CategoryType } from "@/components/Category";
import { Layout } from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

type AdFormData = {
  title: string;
  description: string;
  picture: string;
  price: number;
  location: string;
  owner: string;
  category: { id: number };
};

export default function NewAd() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setpicture] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const [location, setLocation] = useState("");
  const [owner, setOwner] = useState("");

  const router = useRouter();

  async function fetchCategories() {
    const result = await axios.get<CategoryType[]>(
      "http://localhost:5000/categories"
    );
    setCategories(result.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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
      category: { id: Number(categoryId) },
    };
    console.log(data, "data");

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      const result = await axios.post("http://localhost:5000/categories", data);
      if ("id" in result.data) {
        setTitle("");
        setDescription("");
        setPrice(0);
        setpicture("");
        setCategoryId(null);
        setOwner("");
        setLocation("");

        setHasBeenSent(true);
        // redirect to /ads/result.data.id
        // https://nextjs.org/docs/pages/api-reference/functions/use-router
        setTimeout(() => {
          router.push(`/ads/${result.data.id}`);
        }, 5000);
      }
    }
  }

  return (
    <Layout title="Nouvelle offre">
      <main className="main-content">
        {hasBeenSent ? (
          <p>Annonce créé</p>
        ) : (
          <>
            <p>Poster une nouvelle offre</p>
            {error === "price" && <p>Le prix doit être positif</p>}
            {error === "title" && (
              <p>Le titre est requis et doit faire plus de 3 caractères</p>
            )}
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Titre de l'annonce"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <input
                type="text"
                name="description"
                placeholder="Description de l'annonce"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <br />
              <input
                type="text"
                name="picture"
                placeholder="Lien de l'image"
                value={picture}
                onChange={(e) => setpicture(e.target.value)}
              />
              <br />
              <br />
              <input
                type="number"
                name="price"
                placeholder="0,00€"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <br />
              <br />
              <input
                type="text"
                name="owner"
                placeholder="Nom du vendeur"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
              <br />
              <br />
              <input
                type="text"
                name="location"
                placeholder="Localisation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <br />
              <br />
              <select
                name="category"
                value={categoryId + ""}
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
              <button type="submit">Poster mon annonce</button>
            </form>
          </>
        )}
      </main>
    </Layout>
  );
}
