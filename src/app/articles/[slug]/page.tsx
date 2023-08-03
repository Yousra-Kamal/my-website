import data from "../data.json";

const getArticle = (slug: String) => {
  return data.filter((a) => a.slug === slug);
};

export default function Page({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)[0];
  return (
    <>
      <div>{article.title}</div>
      <div>{article.description}</div>
    </>
  );
}
