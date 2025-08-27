import { userProperties } from "@/app/db/db";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";

export const getLostHeart = async () => {
  const properties = await userProperties.toArray();
  const heart = properties?.[0]?.heart;

  return { heart };
};

export const setLostHeart = async () => {
  try {
    const properties = await userProperties.toArray();
    const heart = properties?.[0]?.heart > 0 ? properties?.[0]?.heart - 1 : 0;
    const { status } = await FetcherClientSide({
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/descrease-heart/`,
      method: "PUT",
      data: {
        failed_number: 1,
      },
    });
    if (status === 204) {
      await userProperties.put({
        ...properties?.[0],
        heart: heart,
      });
    }
  } catch (error) {
    console.log(error);

    const properties = await userProperties.toArray();
    const heart = properties?.[0]?.heart > 0 ? properties?.[0]?.heart - 1 : 0;
    const lostHeart = properties?.[0]?.lostHeart + 1;
    await userProperties.put({
      ...properties?.[0],
      lostHeart: lostHeart,
      heart: heart,
    });
  }
};
