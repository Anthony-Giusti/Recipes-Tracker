const formatName = (name: string): string => {
  if (name.length > 1) {
    const words = name.split(' ');
    for (let i = 0; i < words.length; i += 1) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  }
  return name.toUpperCase();
};

export default formatName;
