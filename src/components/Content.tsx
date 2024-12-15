import React from "react";
import { useAppSelector } from "../hooks";

type Props = {};

const Content: React.FC<Props> = (props: Props) => {
  const selected = useAppSelector((state) => state);

  return <div>this is broccoli</div>;
};

export default Content;
