import React, { useEffect, useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";
import axios from "axios";
import { BsTrash3 } from "react-icons/bs";
import Link from "next/link";

export function RecentAds(): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [idAdDelete, setidAdDelete] = useState<number>();

  async function fetchAds() {
    await axios
      .get("http://localhost:5000/ads")
      .then((response) => {
        setAds(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (idAdDelete !== undefined) {
      axios
        .delete(`http://localhost:5000/ads/${idAdDelete}`)
        .then(() => {
          fetchAds();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [idAdDelete]);

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>Prix total des annonces sélectionnées : {totalPrice} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <React.Fragment key={ad.id}>
            <div>
              <Link href={`/ads/${ad.id}`}>
                <AdCard
                  id={ad.id}
                  title={ad.title}
                  price={ad.price}
                  picture={ad.picture}
                />
              </Link>
              <button onClick={() => setTotalPrice(totalPrice + ad.price)}>
                Ajouter au panier
              </button>
              <button onClick={() => setidAdDelete(ad.id)}>
                <BsTrash3 />
              </button>
            </div>
          </React.Fragment>
        ))}
      </section>
    </main>
  );
}
