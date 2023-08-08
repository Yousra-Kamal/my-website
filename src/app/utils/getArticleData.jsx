const y = ` 
{
  user(username: "Yousra90") {
    publication {
      posts(page: 0) {
        slug
        title
        dateAdded
        brief
      }
    }
  }
}
`;

export default async function getArticleData() {
  const result = await fetch("https://api.hashnode.com/", {
    body: JSON.stringify({ query: y }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  //console.log("result", await result.json());
  return await result.json();
}
