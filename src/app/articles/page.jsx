import Head from "next/head";
import { Card } from "../Card";
import { SimpleLayout } from "../SimpleLayout";
import { formatDate } from "../lib/formatDate";
import getArticleData from "../utils/getArticleData";

async function Article({ article, publicationDomain, blogHandle }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title
          target={"_blank"}
          href={
            (publicationDomain &&
              `https://${publicationDomain}/${article.slug}`) ||
            `https://${blogHandle}.hashnode.dev/${article.slug}`
          }
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

export const revalidate = 3600;
export default async function ArticlesIndex() {
  const data = await getArticleData();

  return (
    <>
      <Head>
        <title>Articles - Yousra Kamal</title>
        <meta
          name="description"
          content="My programming articles on Hashnode."
        />
      </Head>
      <SimpleLayout
        title="Writing on different Coding and Programming topics."
        intro=" My programming articles on Hashnode."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {data.posts.map((a) => (
              <Article
                key={a.title}
                article={a}
                publicationDomain={data.publicationDomain}
                blogHandle={data.blogHandle}
              />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
