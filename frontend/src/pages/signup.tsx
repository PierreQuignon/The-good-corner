import { mutationSignUp } from "@/GraphQL/mutationSignUp";
import { Layout } from "@/components/Layout";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [doSignup, { error }] = useMutation(mutationSignUp);
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    try {
      const { data } = await doSignup({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (data.item) {
        router.replace("/signin");
      }
    } catch (error) {}
  };

  return (
    <Layout title="Inscription">
      <main className="main-content">
        <br />
        <br />
        <br />
        <br />
        {error && <p>Une erreur est survenue</p>}
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
          <button type="submit">Inscription</button>
        </form>
      </main>
    </Layout>
  );
};

export default Signup;
