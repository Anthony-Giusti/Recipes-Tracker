const formatName = (name: string): string => {
  const words = name.split(' ');

  for (let i = 0; i < words.length; i += 1) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    return words.join(' ');
  }
};

export default formatName;
