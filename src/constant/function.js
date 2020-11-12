export const checkNotNull = (params) => {
    if (params !== null && params !== "" && params !== undefined && params !== "undefined") {
      return true;
    } else {
      return false;
    }
  };
