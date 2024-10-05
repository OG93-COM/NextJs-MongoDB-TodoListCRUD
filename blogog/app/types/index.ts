export type TCategory = {
    id: string,
    catName: string,
}

export type TPost = {
    id: string,
    title: string,
    content: string,
    imgUrl?: string,
    publicId: string,
    catName?: string,
    links: null | [],
    createdAt: string,
    authorEmail:string,
    author: {
        name: string
    },
}

