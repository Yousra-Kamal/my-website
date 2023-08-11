const y = ` 
{
  user(username: "Yousra90") {
    username
    blogHandle
    publicationDomain
    publication {
      posts(page: 0) {
        slug
        title
        isActive
        dateAdded
        brief
      }
    }
  }
}
`;

export default async function getArticleData() {
  const res = await fetch("https://api.hashnode.com/", {
    body: JSON.stringify({ query: y }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const result = await res.json();
  const { data } = result;
  const { user } = data;
  const { blogHandle, publicationDomain } = user;
  const { publication } = user;
  const { posts } = publication;

  return { blogHandle, publicationDomain, posts };
}
