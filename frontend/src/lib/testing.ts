const testProps = (id: string) => {
  return { "data-testid": id.toLowerCase(), accessibilityLabel: id.toLowerCase() };
};

export default testProps;
