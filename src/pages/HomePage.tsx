import React, { useEffect } from "react";
import Content from "../components/Content";
import { useAppSelector } from "../hooks";

type Props = {};

const HomePage: React.FC<Props> = (props: Props) => {
  const selected = useAppSelector((state) => state);

  return (
    <div>
      <Content />
    </div>
  );
};

export default HomePage;
