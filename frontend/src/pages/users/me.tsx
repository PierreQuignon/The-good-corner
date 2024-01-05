import { queryMe } from "@/GraphQL/queryMe";
import { Layout } from "@/components/Layout";
import { UserType } from "@/types";

import { useQuery } from "@apollo/client";

export default function Me(): React.ReactNode {
  const { data: meData } = useQuery<{ item: UserType | null }>(queryMe);
  const me = meData?.item;

  return (
    <Layout title="Mon profile">
      <main className="main-content">
        <p>Adresse email de l'utilisateur : {me?.email}</p>
      </main>
    </Layout>
  );
}
