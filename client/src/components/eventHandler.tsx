const handleClickPopper = (
  event: React.MouseEvent<HTMLElement>,
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
  anchorEl: null | HTMLElement
) => {
  setAnchorEl(anchorEl ? null : event.currentTarget);
};

export { handleClickPopper };
