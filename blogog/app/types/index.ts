export type TCategory = {
    id: string,
    catName: string,
}

export type TPost = {
    id: string,
    title: string,
    content: string,
    imageUrl?: string,
    publicId: string,
    catName?: string,
    links: null | [],
    createdAt: string,
    authorEmail:string,
    author: {
        name: string
    },
}

export interface UploadResult {
    event: string;
    info: {
      secure_url: string;
      public_id: string;
      // Add other relevant fields from the response here if needed
    };
  }