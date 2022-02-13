export type Recommend = {
  sliders: {
    id: string;
    image: string;
    url: string;
  }[];
  albums: {
    id: string;
    image: string;
    title: string;
    username: string;
  }[];
};
