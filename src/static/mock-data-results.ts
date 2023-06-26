export const mockResults = Array(30).fill(0).map(_ => ({
    id: Math.random().toString(),
    image: `https://picsum.photos/seed/${Math.random()}/200`,
    title: 'test title',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, porro? Eum aspernatur, adipisci dolorem voluptate, explicabo ducimus sint voluptatem quis excepturi, atque veniam temporibus itaque consequatur illo! Ex, enim debitis!'
}))
