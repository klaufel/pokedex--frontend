export default function Layout(children: {
  searcher?: () => string;
  aside?: () => string;
  content: () => string;
}) {
  const { searcher, aside, content } = children ?? {};

  return `
    <div class="container">
      <header class="header">${searcher ? searcher() : ""}</header>
      <main class="main">
        <aside>${aside ? aside() : ""}</aside>
        <div class="content">${content ? content() : ""}</div>
      </main>
    </div>
  `;
}
