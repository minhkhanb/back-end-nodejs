/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import { resolve } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

// You can delete this file if you're not using it
export const onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
      alias: {
        '@src': resolve(__dirname, 'src'),
      },
    },
  });
};
export const onCreatePage = async ({ page, actions }: any) => {
  const { createPage } = actions;

  if (page.path.match(/^\/codewars/)) {
    page.matchPath = '/codewars/*';
    // Update the page.
    createPage(page);
  }
};