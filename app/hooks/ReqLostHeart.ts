import { userProperties } from "../db/db";
import { FetcherClientSide } from "../utils/FetcherClientSide";

export const ReqLostHeart = async () => {
  const properties = await userProperties.toArray();
  const lostHeart = properties?.[0]?.lostHeart;
  if (lostHeart && lostHeart > 0) {
    try {
      const { status } = await FetcherClientSide({
        url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/descrease-heart/`,
        method: "PUT",
        data: {
          failed_number: lostHeart,
        },
      });
      if (status === 204) {
        await userProperties.put({
          ...properties?.[0],
          lostHeart: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
