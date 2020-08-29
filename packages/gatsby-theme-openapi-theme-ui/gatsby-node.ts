import { CreateNodeArgs } from 'gatsby';
import { CustomPluginOptions } from './src/types';
import { defaultPluginOptions } from './src/util/defaultPluginOptions';

export const onCreateNode = ({ node, actions }: CreateNodeArgs): void => {
  const { createNodeField } = actions;
  if (
    node.internal.type === 'SitePlugin' &&
    node.name === 'gatsby-theme-openapi-theme-ui'
  ) {
    console.log('NODE', node);
    const pluginOptions = defaultPluginOptions(
      node.pluginOptions as CustomPluginOptions
    );
    console.log('PLUGIN OPTIOS', pluginOptions);
    createNodeField({
      node,
      name: 'pluginOptionsWithDefaults',
      value: pluginOptions,
    });
  }
};
