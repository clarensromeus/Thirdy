import React from "react";

const handleClickPopper = (
  event: React.MouseEvent<HTMLElement>,
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
  anchorEl: null | HTMLElement
) => {
  setAnchorEl(anchorEl ? null : event.currentTarget);
};

const onInputClick = (
  event: React.MouseEvent<HTMLInputElement, MouseEvent>
) => {
  const element = event.target as HTMLInputElement;
  element.value = "";
};

export { handleClickPopper, onInputClick };
