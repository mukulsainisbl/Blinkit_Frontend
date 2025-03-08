export const validUrlConvert = (name) => {
    const url = name
      .toString()
      .replaceAll(" ", "-")
      .replaceAll(",", "-")
      .replaceAll("&", "-")
      .replace(/-+/g, "-"); // Replace multiple dashes with a single dash
  
    return url;
  };
  