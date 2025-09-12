const handleToNormalWords=(text: string): string =>{
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
}

export default handleToNormalWords

