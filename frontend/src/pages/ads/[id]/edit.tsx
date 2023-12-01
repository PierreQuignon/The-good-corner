import { AdType } from "@/components/AdCard";
import { Layout } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { queryAd } from "@/GraphQL/queryAd";
import EditAd, { AdFormData } from "@/components/EditAd";

export default function Edit() {
  const router = useRouter();
  const adId = router.query.id;

  const { data } = useQuery<{ item: AdFormData }>(queryAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

  return (
    <Layout title="Modification de l'offre">
      <main className="main-content">{ad && <EditAd ad={ad} />}</main>
    </Layout>
  );
}
