import { queryAd } from "@/GraphQL/queryAd";
import { AdType } from "@/components/AdCard";
import { Layout } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Ad(): React.ReactNode {
  const router = useRouter();
  const adId = router.query.id;

  const { data } = useQuery<{ item: AdType }>(queryAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

  return (
    <Layout title="Ad">
      <main className="main-content">
        <p>Offre ID: {router.query.id}</p>
        {ad ? (
          <>
            <h2>{ad.title}</h2>
            <p>{ad.price} €</p>
            <Link
              href={`/ads/${ad.id}/edit`}
              className="category-navigation-link"
            >
              Modifier cette annonce
            </Link>
            <br />
            <Link href={`/`} className="category-navigation-link">
              Retour aux annonces
            </Link>
          </>
        ) : adId ? (
          "Chargement/erreur"
        ) : (
          "Il manque l'id dans l'URL"
        )}
      </main>
    </Layout>
  );
}
