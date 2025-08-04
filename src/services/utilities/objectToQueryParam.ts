const objectToQueryParam = (object: any) => {
  if (!object) return "";
  var str = "";
  for (var key in object) {
    if (!object[key]) continue;
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(object[key]);
  }
  return str;
};

export default objectToQueryParam;
