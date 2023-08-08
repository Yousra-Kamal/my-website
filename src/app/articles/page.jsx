import Head from "next/head";
import { Card } from "../Card";
import { SimpleLayout } from "../SimpleLayout";
import { formatDate } from "../lib/formatDate";
import getArticleData from "../utils/getArticleData";

function Article({ article }) {
  // console.log("article", article);
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title
          target={"_blank"}
          href={`https://yousraa.hashnode.dev/${article.slug}`}
        >
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.dateAdded}
          className="md:hidden"
          decorate
        >
          {formatDate(article.dateAdded)}
        </Card.Eyebrow>
        <Card.Description>{article.brief}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.dateAdded}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.dateAdded)}
      </Card.Eyebrow>
    </article>
  );
}

export default async function ArticlesIndex() {
  const results = await getArticleData();

  const posts = results.data.user.publication.posts;
  // console.log("POSTS", posts);
  return (
    <>
      <Head>
        <title>Articles - Yousra Kamal</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((article) => (
              <Article key={article.title} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}

/* export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  };
} */
