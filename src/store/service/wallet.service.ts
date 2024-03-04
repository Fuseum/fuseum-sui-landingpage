import axiosClient from "./axiosClient";

export const walletService = {
  getHealthCheck: async () => {
    return axiosClient.get(`/healthcheck`);
  },
  postAuthSign: async () => {
    return axiosClient.post(`/auth/sign`);
  },
  postAuthLogin: async ({
    signature,
    public_address,
    nonce,
  }: {
    signature: any;
    public_address: string;
    nonce: number;
  }) => {
    const params = {
      signature: signature,
      public_address: public_address,
      nonce: nonce,
    };
    return axiosClient.post(`/auth/login`, params);
  },

  getMorePost_author_id: async ({ author_id }: { author_id: string }) => {},
  getPostDetail_post_id: async ({ post_id }: { post_id: string }) => {},
  getRelatedPost_post_id: async ({ post_id }: { post_id: string }) => {},
};
