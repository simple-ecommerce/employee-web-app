import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useOnClick = () => {
  const navigate = useNavigate();

  const onClick = useCallback(
    ({ key }: { key: string }) => {
      navigate(key);
    },
    [navigate]
  );

  return onClick;
};
