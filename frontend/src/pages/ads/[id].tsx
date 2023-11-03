import { AdType } from "@/components/AdCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

const queryAd = gql`
  query ad($id: ID!) {
    item: ad(id: $id) {
      id
      price
      title
    }
  }
`;

export default function Ad() {
  const router = useRouter();
  const adId = router.query.id as string;

  const { data } = useQuery<{ item: AdType }>(queryAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

  return (
    <main className="main-content">
      <Link href={`/`}>Retour aux annonces</Link>
      <p>Offre ID: {router.query.id}</p>
      {ad ? (
        <>
          <h2>{ad.title}</h2>
          <p>{ad.price} €</p>
        </>
      ) : adId ? (
        "Chargement/erreur"
      ) : (
        "Il manque l'id dans l'URL"
      )}
    </main>
  );
}
