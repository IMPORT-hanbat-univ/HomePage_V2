function getFirstFile(inputString: string): string {
  const regex = /http:\/\/localhost:4000\/image.*\.(jpg|png)/;
  const match = inputString.match(regex);

  if (match) {
    return match[0];
  } else {
    return "";
  }
}
