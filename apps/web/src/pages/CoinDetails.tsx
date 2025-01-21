import { useParams } from "react-router";

export const CoinDetails = () => {
  const { coinId } = useParams();

  return <div>Details for {coinId}</div>;
};
