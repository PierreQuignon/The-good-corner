import { mutationSignIn } from "@/GraphQL/mutationSignIn";
import { queryMe } from "@/GraphQL/queryMe";
import { Layout } from "@/components/Layout";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState<string>("p.quignon5@gmail.com");
  const [password, setPassword] = useState<string>("superscedtjfej");
  const [failed, setFailed] = useState<boolean>(false);
  const [doSignIn, { error }] = useMutation(mutationSignIn, {
    refetchQueries: [queryMe],
  });
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setFailed(false);
    try {
      const { data } = await doSignIn({
        variables: {
          email,
          password,
        },
      });
      if (data.item) {
        router.replace("/");
      } else {
        setFailed(true);
      }
    } catch (error) {}
  };

  return (
    <Layout title="Connexion">
      <main className="main-content">
        <br />
        <br />
        <br />
        <br />
        {error && <p>Une erreur est survenue</p>}
        {failed && <p>Identifiant incorrect</p>}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Connexion</button>
        </form>
      </main>
    </Layout>
  );
};

export default Signin;
