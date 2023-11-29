import React, { useEffect, useState } from "react";
import { AdCard, AdCardProps, AdType } from "./AdCard";
import { BsTrash3 } from "react-icons/bs";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { queryAllAds } from "@/GraphQL/queryAllAds";
import { mutationDeleteAd } from "@/GraphQL/mutationDeleteAd";
// import { queryAdsByCategory } from "@/GraphQL/adsByCategory";

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
};

export function RecentAds(props: RecentAdsProps): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState(0);
  const [idAdDelete, setidAdDelete] = useState<number | null>(null);

  const { data } = useQuery<{ items: AdType[] }>(queryAllAds, {
    variables: {
      where: {
        ...(props.categoryId ? { categoryIn: [props.categoryId] } : {}),
      },
    },
  });
  const ads = data ? data.items : [];

  const [doDelete] = useMutation(mutationDeleteAd, {
    refetchQueries: [queryAllAds],
  });

  useEffect(() => {
    async function deleteAd() {
      if (idAdDelete !== null) {
        await doDelete({
          variables: {
            deleteAdId: idAdDelete,
          },
        });
        setidAdDelete(null);
      }
    }
    deleteAd();
  }, [idAdDelete, doDelete]);

  return (
    <main className="main-content">
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
