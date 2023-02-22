module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'yarn build-types',
  '*.{js,jsx,ts,tsx,json}': ['prettier --write'],
};
